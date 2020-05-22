<template>
    <section class="quiz-question">
        <div class="quiz-question-card" :class="{answered: question.isAnswered}">
            <h2>{{ question.txt }}</h2>
            <component :is="`body-${question.type}`" :body="question.body" class="quiz-question-card-body"></component>
            <div class="quiz-question-card-ans answers-grid">
                <button 
                    v-for="(ans, idx) in question.ans" 
                    :key="idx" 
                    @click="onAnswer(idx)"
                    :class="{right: question.rightAns === idx}"
                    >{{ ans }}</button>
            </div>
        </div>
    </section>
</template>

<script>
import BodyEmpty from '@/cmps/dynamic-inputs/question-input-empty.cmp';
import BodyQuote from '@/cmps/dynamic-inputs/question-body-quote.cmp';
import BodyCode from '@/cmps/dynamic-inputs/question-body-code.cmp';
import BodyImage from '@/cmps/dynamic-inputs/question-body-image.cmp';

export default {
    props: {
        question: {
            type: Object,
            required: true
        }
    },
    methods: {
        onAnswer(ansIdx) {
            this.$emit('question-answered', this.question.rightAns === ansIdx, this.question);
        }
    },
    components: {
        BodyEmpty,
        BodyQuote,
        BodyCode,
        BodyImage
    }
};
</script>