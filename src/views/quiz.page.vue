<template>
    <section class="quiz-page">
        <header class="container">
            <div class="logo">
            <router-link to="/">QuizMe<span>.</span></router-link>
            </div>
            <div class="timer">
                <stop-watch v-show="isGameOn" :isActive="isGameOn"></stop-watch>
            </div>
            <div v-if="quiz._id" class="best" :class="{hidden: quiz.bestTime === Number.MAX_SAFE_INTEGER}">
                <span>Best time:</span>
                {{ quiz.bestTime | duration }}
            </div>
        </header>
        <main class="container">
           <ul class="quiz-page-players">
               <li v-for="rival in rivals" :key="rival.uid">
                   <player-preview :player="rival" :quizLength="questions.length"></player-preview>
               </li>
           </ul>
           <div class="quiz-page-game" v-if="isGameOn && questions.length && !isModalActive">
               <span>
                    <font-awesome-icon 
                        icon="chevron-left" 
                        class="quiz-page-game-paging left" 
                        title="Previous question"
                        @click="changeQuestion(-1)"
                        ></font-awesome-icon>
                    <quiz-question 
                        :question="currQuestion" 
                        @question-answered="answerQuestion" 
                        :key="key"
                        :class="{left: questionTransitions.left, right: questionTransitions.right}"
                        ></quiz-question>
                    <font-awesome-icon 
                        icon="chevron-right" 
                        class="quiz-page-game-paging right" 
                        title="Next question"
                        @click="changeQuestion(1)"
                        ></font-awesome-icon>
               </span>
                    <div class="quiz-page-game-pagination">
                            <span>
                                <button 
                                    v-for="(question, idx) in questions" 
                                    :key="idx" 
                                    @click="handlePagination(idx)"
                                    :class="{active: currQuestionIdx === idx}"
                                    ></button>
                            </span>
                        {{ currQuestionIdx + 1 }}/{{ questions.length }}
                    </div>
           </div>
        </main>
        <transition name="fade">
            <div class="quiz-page-overlay" v-if="!isGameOn && !startTime">
                <div v-if="!quiz._id" class="quiz-page-overlay-msg">
                    <h3>Ouiz not found</h3>
                    <p>Looks like the url you have typed in is wrong or quiz no longer exists...</p>
                    <img src="@/assets/imgs/sad-robot.png" alt="illustration" class="quiz-page-overlay-msg-img" />
                </div>
                <div v-else class="quiz-page-overlay-msg">
                    <button v-if="!player.isReady" @click="declareReady">Ready?</button>
                    <span v-else class="quiz-page-overlay-msg-loader">
                        <img src="@/assets/imgs/loader-big.svg" alt="loader" />
                        Waiting for opponents...
                    </span>
                </div>
            </div>
        </transition>
        <img src="@/assets/imgs/countdown.gif" v-if="!isGameOn && isStopWatchActive && !isModalActive" alt="count down animation" class="quiz-page-countdown" />
        <modal-wrap :isActive="isModalActive" @close-modal="isModalActive = false">
            <scores-modal :rivals="rivals" :player="player"></scores-modal>
        </modal-wrap>
        <img src="@/assets/imgs/fireworks.gif" alt="fireworks" v-if="isNewRecord" />
        <h2 class="new-record" v-if="isNewRecord">New record!!!</h2>
        <img src="@/assets/imgs/fireworks.gif" alt="fireworks" v-if="isNewRecord" />
    </section>
</template>

<script>
import { userService } from '@/services/user.service';
import { socketService } from '@/services/socket.service';

import playerPreview from '@/cmps/player-preview.cmp';
import stopWatch from '@/cmps/reusable/stop-watch.cmp';
import quizQuestion from '@/cmps/quiz-question.cmp';
import modalWrap from '@/cmps/reusable/modal-wrap.cmp';
import scoresModal from '@/cmps/scores-modal.cmp'

export default {
    data() {
        return {
            isGameOn: false,
            player: userService.getGuestUser(),
            rivals: [],
            currQuestionIdx: 0,
            isStopWatchActive: false,
            startTime: null,
            key: 0,
            isModalActive: false,
            isNewRecord: false,
            questionTransitions: {
                left: false,
                right: false
            }
        }
    },
    computed: {
        quiz() { 
            return JSON.parse(JSON.stringify(this.$store.getters.quiz));
        },
        questions() {
            return this.$store.getters.quiz.questions.map(quest => {
                return { ...quest, isAnswered: false };
            });
        },
        currQuestion() {
            return this.questions[this.currQuestionIdx];
        }
    },
    methods: {
        animateQuestionTransitions(from, to) {
            let className = (to < from) ? 'right' : 'left';
            
            this.questionTransitions[className] = true;
                setTimeout(() => {
                    this.questionTransitions[className] = false;
            }, 400);
        },
        handlePagination(idx) {
            this.animateQuestionTransitions(this.currQuestionIdx, idx);
            this.currQuestionIdx = idx;
        },
        declareReady() {
            this.player.isReady = true;
            socketService.emit('quiz player-ready');
        },
        setRivals(players) {
            this.rivals = players.filter(currPlayer => currPlayer.uid !== this.player.uid);
        },
        toggleRivalReady(uid) {
            const idx = this.rivals.findIndex(rival => rival.uid === uid);
            this.rivals[idx].isReady = true;
        },
        changeQuestion(diff) {
            const LENGTH = this.questions.length;
            let neigQstnIdx = this.currQuestionIdx + diff; 

            if (neigQstnIdx < 0) neigQstnIdx = LENGTH - 1;
            if (neigQstnIdx === LENGTH) neigQstnIdx = 0;

            this.animateQuestionTransitions(0, diff);
            this.currQuestionIdx = neigQstnIdx;
        },
        startGame() {
            this.isStopWatchActive = true;
            setTimeout(() => {
                this.isStopWatchActive = false;
                this.isGameOn = true;  
                this.startTime = Date.now();
            }, 3000);
        },
        answerQuestion(isRight, question) {
            if (question.isAnswered) return;
            question.isAnswered = true;

            this.player.ansCount++;
            if (isRight) this.player.rightCount++;
            
            socketService.emit('quiz question-answered', this.player.ansCount);
            this.key++;
            if (this.player.ansCount === this.questions.length) {
                this.endGame();
            } else {
                setTimeout(() => {
                    this.changeQuestion(1);
                }, 300);
            }
        },
        endGame() {
            const now = Date.now();
            this.isStopWatchActive = false;
            this.isGameOn = false;
            const time = now - this.startTime;
            this.player.score = time;
            socketService.emit('quiz player-done', { time, percent: (this.player.rightCount / this.player.ansCount) * 100 });
            
            this.isModalActive = true;

            if (time < this.quiz.bestTime && this.player.rightCount === this.player.ansCount) {
                this.quiz.bestTime = time;
                this.$store.dispatch({ type: 'saveQuiz', quiz: this.quiz });
                this.isNewRecord = true;
            }
        },
        terminate() {
            socketService.emit('quiz player-disconnected');
            socketService.off('quiz waiting-players', this.setRivals);
            socketService.off('quiz player-added', this.setRivals);
            socketService.off('quiz player-status-changed', this.toggleRivalReady);
            socketService.off('quiz player-leaved', this.setRivals);
            socketService.off('quiz all-ready', this.startGame);
            socketService.off('quiz player-progressed', this.setRivals);
            socketService.off('quiz player-done-score', this.setRivals);
            socketService.terminate();
            window.removeEventListener('beforeunload', this.terminate);
            this.$store.commit({ type: 'resetCurrQuiz' });
        }
    },
    async created() {  
        await this.$store.dispatch({ type: 'loadQuiz', id: this.$route.params.id }); 
        if (!this.quiz._id) return; 
        
        const loggedUser = this.$store.getters.user;
        if (loggedUser) {
            this.player.uid = loggedUser._id;
            this.player.username = loggedUser.username;
            if (loggedUser.avatar) this.player.avatar = loggedUser.avatar;
        }
        
        socketService.setup();
        window.addEventListener('beforeunload', this.terminate);
        socketService.emit('quiz player-connected', { quizId: this.quiz._id, user: this.player });
        socketService.on('quiz waiting-players', this.setRivals);
        socketService.on('quiz player-added', this.setRivals);
        socketService.on('quiz player-status-changed', this.toggleRivalReady);
        socketService.on('quiz player-leaved', this.setRivals);
        socketService.on('quiz all-ready', this.startGame);
        socketService.on('quiz player-progressed', this.setRivals);
        socketService.on('quiz player-done-score', this.setRivals);
    },
    destroyed() {
        this.terminate();
    },
    components: {
        stopWatch,
        playerPreview,
        quizQuestion,
        modalWrap,
        scoresModal
    }
};
</script>