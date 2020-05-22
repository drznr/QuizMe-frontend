<template>
    <section class="user-quiz">
        <ul>
            <li v-for="quiz in quizzes" :key="quiz._id">
                <div class="user-quiz-preview">
                    <span class="user-quiz-preview-stats">
                        <h2>{{ quiz.title }}</h2>
                        <span>{{ quiz.at | moment("from", "now") }}</span>
                        <span>{{ quiz.questions.length }} questions</span>
                    </span>
                    <span class="user-quiz-preview-actions">
                        <router-link :to="`/quiz/${quiz._id}`" target="_blank">
                            <font-awesome-icon icon="external-link-alt" title="Take Quiz"></font-awesome-icon>
                        </router-link>
                        <router-link :to="`/quiz/edit/${quiz._id}`">
                            <font-awesome-icon icon="edit" title="Edit Quiz"></font-awesome-icon>
                        </router-link>
                    </span>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        quizzes: {
            type: Array,
            required: true
        }
    }
};
</script>