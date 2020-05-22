<template>
    <section class="quiz-list">
        <img src="@/assets/imgs/loader-big.svg" alt="loader" v-if="isProcessing" />
        <ul v-else>
            <li v-for="quiz in quizzes" :key="quiz._id">
                <quiz-preview :quiz="quiz"></quiz-preview>
            </li>
        </ul>
    </section>
</template>

<script>
import quizPreview from '@/cmps/quiz-preview.cmp';

export default {
    props: {
        quizzes: {
            type: Array,
            required: true
        },
        isProcessing: Boolean
    },
    components: {
        quizPreview
    }
};
</script>