<template>
    <section class="home-page container">
        <main class="layout-home-page">
            <div class="home-page-content">
                <h1>
                    Compete with others, or make your own!
                    <span>QuizMe allows you to transform your knowledge into a real-time web quiz and share it with your friends...</span>
                </h1>
                <router-link to="/quiz" class="home-page-content-link">Browse quizzes</router-link>
                <router-link to="/quiz/edit" class="home-page-content-link">Make your own</router-link>
            </div>
            <div class="home-page-illustration">
                <img src="@/assets/imgs/home-illustration.jpg" alt="illustration" />
            </div>
        </main>
        <about></about>
    </section>
</template>

<script>
import about from '@/cmps/about.cmp';

export default {
    components: {
        about
    }
};
</script>