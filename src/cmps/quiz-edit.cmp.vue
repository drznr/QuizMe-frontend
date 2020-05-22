<template>
    <section class="quiz-edit">
        <div class="quiz-edit-form-toolbar">
            <font-awesome-icon icon="plus-circle" class="icon" title="Add question" @click="addQuestion('empty')"></font-awesome-icon>
            <font-awesome-icon icon="code" class="icon"  title="Add snippet question" @click="addQuestion('code')"></font-awesome-icon>
            <font-awesome-icon icon="image" class="icon"  title="Add image question" @click="addQuestion('image')"></font-awesome-icon>
            <font-awesome-icon icon="quote-right" class="icon"  title="Add quote question" @click="addQuestion('quote')"></font-awesome-icon>
            <font-awesome-icon 
                :icon="toolbarExpanded ? 'ellipsis-v' : 'ellipsis-h'" 
                class="icon" 
                @click="toolbarExpanded = !toolbarExpanded"
                title="More..."
                v-if="$route.params.id"
                ></font-awesome-icon>
            <transition name="enter-top">
                <font-awesome-icon 
                    icon="trash" 
                    class="icon remove" 
                    v-if="$route.params.id && toolbarExpanded" 
                    title="Delete quiz" 
                    @click="removeQuiz"
                    ></font-awesome-icon>
            </transition>
        </div>
        <form class="quiz-edit-form" @submit.prevent="saveQuiz">
            <div class="quiz-edit-form-group main">
                <input type="text" placeholder="Title" v-model="quiz.title" required />
                <input type="text" placeholder="Description" v-model="quiz.description" />
                <input type="text" placeholder="Space seperated subjects" v-model="quizSubjects" />
            </div>
            <ul>
                <draggable v-model="questionList"  v-bind="dragOptions">
                    <transition-group type="transition">
                        <li v-for="(question, idx) in quiz.questions" :key="'question' + idx">
                            <question-input 
                                :question="question" 
                                :idx="idx" 
                                @update-question="updateQuiz" 
                                @remove-question="removeQuestion"
                                @copy-question="copyQuestion"
                                class="quiz-edit-form-group"
                                ></question-input>
                        </li>
                    </transition-group>
                </draggable>
            </ul>
            <button type="submit">Save</button>
        </form>
        <modal-wrap :isActive="modalActive" @close-modal="modalActive = false">
            <modal-share v-if="user" :endpoint="quizLink"></modal-share>
            <login-modal v-else @close-modal="modalActive = false"></login-modal>
        </modal-wrap>
    </section>
</template>

<script>
import questionInput from '@/cmps/question-input.cmp';
import modalWrap from '@/cmps/reusable/modal-wrap.cmp';
import modalShare from '@/cmps/modal-share.cmp';
import loginModal from '@/cmps/login-modal.cmp';
import draggable from 'vuedraggable';

export default {
    data() {
        return {
            modalActive: false,
            quizLink: '',
            toolbarExpanded: false
        }
    },
    computed: {
        quiz() {  
            return JSON.parse(JSON.stringify(this.$store.getters.quiz));
        },
        user() {
            return this.$store.getters.user;
        },
        dragOptions() {
            return {
                animation: 400,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost'
            }
        },
        quizSubjects: {
            get() {
                return this.quiz.subjects.join(' ');
            },
            set(val) {
                this.quiz.subjects = val.split(' ');
            }
        },
        questionList: {
            get() {
                return this.$store.getters.quiz.questions;
            },
            set(val) {
                this.quiz.questions = JSON.parse(JSON.stringify(val));
                this.updateQuiz();
            }
        }
    },
    async created() {
        const quizId = this.$route.params.id;
        if (quizId) {
            await this.$store.dispatch({ type: 'loadQuiz', id: quizId });
            
            if (!this.user || this.user._id !== this.quiz.by) {
                this.$store.commit({ type: 'resetCurrQuiz' });
                this.$router.push('/quiz/edit');
            }
        }
    },
    methods: {  
        async saveQuiz() {
            if (this.user) {
                const savedQuiz = await this.$store.dispatch({ type: 'saveQuiz', quiz: this.quiz });
                this.$store.commit({ type: 'setQuiz', quiz: savedQuiz });
                this.quizLink = `/quiz/${savedQuiz._id}`;
                if (!this.$route.params.id) this.$router.push(`/quiz/edit/${savedQuiz._id}`);
            }
            this.modalActive = true;
        },
        updateQuiz() {
            this.$store.commit({ type: 'setQuiz', quiz: this.quiz });
        },
        async removeQuiz() {
            await this.$store.dispatch({ type: 'removeQuiz', id: this.quiz._id });
            this.$store.commit({ type: 'resetCurrQuiz' });
            this.$router.push('/quiz/edit');
        },
        addQuestion(type) {
            const question = {
                type,
                txt: '',
                body: '',
                ans: new Array(4),
                rightAns: null
            }
            this.quiz.questions.push(question);
            this.updateQuiz();
        },
        removeQuestion(idx) {
            this.quiz.questions.splice(idx, 1);
            this.updateQuiz();
        },
        copyQuestion(idx) {
            const copyQuestion = JSON.parse(JSON.stringify(this.quiz.questions[idx]));
            this.quiz.questions.splice(idx, 0, copyQuestion);
            this.updateQuiz();
        }
    },
    components: {
        questionInput,
        modalWrap,
        modalShare,
        loginModal,
        draggable
    }
};
</script>