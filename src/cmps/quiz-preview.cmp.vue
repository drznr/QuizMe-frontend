<template>
    <div class="quiz-preview">
        <h3>
            <router-link :to="`/quiz/${quiz._id}`">
                {{ quiz.title }}
                <font-awesome-icon icon="hand-point-right" class="icon"></font-awesome-icon>
            </router-link>
        </h3>
        <long-txt :txt="quiz.description" :maxChars="40" class="quiz-preview-description"></long-txt>
        <span class="quiz-preview-length">
            <span :style="{color: rndColor}">{{ quiz.questions.length }}</span>
            Questions    
        </span>
        <div class="quiz-preview-info">
            <ul>
                <li v-for="(subject, idx) in quiz.subjects" :key="idx" :style="{backgroundColor: rndColor}" class="label">{{ subject }}</li>
            </ul>
            <span class="quiz-preview-info-at">{{ quiz.at | moment("from", "now") }}</span>
        </div>
    </div>
</template>

<script>  
import { utilService } from '@/services/util.service';
import longTxt from './reusable/long-txt.cmp';

export default {
    props: {
        quiz: {
            type: Object,
            required: true
        }
    },
    computed: {
        rndColor() {
            return utilService.getRandomColor();
        }
    },
    components: {
        longTxt
    }
};
</script>