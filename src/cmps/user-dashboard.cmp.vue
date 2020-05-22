<template>
    <section class="user-dashboard">
        <nav class="user-dashboard-nav">
            <router-link to="/quiz/dashboard">My Quizzes</router-link>
            <router-link to="/quiz/dashboard/edit">Profile</router-link>
        </nav>
        <main>
            <transition name="fade" mode="out-in">
                <router-view :quizzes="quizzes"></router-view>
            </transition>
        </main>
    </section>
</template>

<script>
import { quizService } from '@/services/quiz.service';

export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (!vm.user) vm.$router.push('/quiz');
        });
    },
    data() {
        return {
            quizzes: []
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    async created() {
        const filterBy = { by: this.user._id };
        const userQuizzes = await quizService.query(filterBy);
        this.quizzes = userQuizzes;
    }
};
</script>