<template>
    <section class="quiz-app">
        <div class="layout-quiz-app container">
        <nav 
            class="quiz-app-nav"  
            >
            <router-link class="quiz-app-nav-link" to="/quiz">
                <font-awesome-icon icon="th-list" title="Quizs List"></font-awesome-icon>
                <span class="link-label">Quizzes list</span>
            </router-link>
            <router-link class="quiz-app-nav-link" to="/quiz/edit">
                <font-awesome-icon icon="plus-square" title="Add Quiz"></font-awesome-icon>
                <span class="link-label">Add quiz</span>
            </router-link>
            <router-link class="quiz-app-nav-link user-link" to="/quiz/dashboard" v-if="user">
                <font-awesome-icon icon="user-astronaut" title="User Dashboard"></font-awesome-icon>
                <span class="link-label">User dashboard</span>
            </router-link>
        </nav>
        <main class="quiz-app-content">
                <transition name="fade">
                    <quiz-filter 
                        v-if="$route.name === 'quiz-list'"
                        @onFilter="doFilter" 
                        :subjects="subjects"
                    ></quiz-filter>
                </transition>
                <transition name="fade" mode="out-in">
                    <router-view :quizzes="quizzes" :isProcessing="isProcessing" />
                </transition>
        </main>
        </div>
    </section>
</template>

<script>
import quizFilter from '@/cmps/quiz-filter.cmp';

export default {
    computed: {
        quizzes() { 
            return this.$store.getters.quizzes;
        },
        quiz() {
            return this.$store.getters.quiz;
        },
        isProcessing() {
            return this.$store.getters.isProcessing;
        },
        subjects() {
            return this.$store.getters.subjects;
        },
        user() {
            return this.$store.getters.user;
        }
    },
    methods: {
        doFilter(filterBy) {
            this.$store.dispatch({ type: 'loadQuizzes', filterBy });
        }
    },
    components: {
        quizFilter
    }
};
</script>
