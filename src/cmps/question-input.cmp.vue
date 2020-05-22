<template>
    <section class="question-input" v-hammer:swipe.horizontal="onRemove">
        <font-awesome-icon icon="grip-horizontal" class="grip-icon"></font-awesome-icon>
        <input type="text" placeholder="Question" v-model="question.txt" @input="updateQuestion" required />
        <component :is="`body-input-${question.type}`" @input-change="handleChange" :value="question.body"></component>
        <div class="question-input-ans answers-grid">
            <div v-for="(ans, idx) in question.ans" :key="idx">
                <span>{{ idx + 1 }}.</span>
                <input type="text" :placeholder="`Option ${idx + 1}`" v-model="question.ans[idx]" @input="updateQuestion" required />
                <label>
                    <input 
                        type="radio" 
                        :name="`rightAns-${randomId}`" 
                        :value="idx" 
                        v-model.number="question.rightAns" 
                        @change="updateQuestion" 
                        hidden 
                        required 
                    />
                    <span class="switch"></span>
                </label>
            </div>
        </div>
        <footer>
            <button type="button" @click="onCopy">
                <font-awesome-icon :icon="['far', 'copy']" title="Copy question"></font-awesome-icon>
            </button>
            <button type="button" @click="onRemove">
                <font-awesome-icon :icon="['far', 'trash-alt']" title="Remove question"></font-awesome-icon>
            </button>
        </footer> 
    </section>
</template>

<script>
import { utilService } from '@/services/util.service';

import BodyInputEmpty from '@/cmps/dynamic-inputs/question-input-empty.cmp';
import BodyInputQuote from '@/cmps/dynamic-inputs/question-input-quote.cmp';
import BodyInputImage from '@/cmps/dynamic-inputs/question-input-image.cmp';
import BodyInputCode from '@/cmps/dynamic-inputs/question-input-code.cmp';

export default {
    props: {
        question: {
            type: Object,
            required: true
        },
        idx: {
            type: Number,
            required: true
        }
    },
    computed: {
        randomId() {
            return utilService.makeId();
        }
    },
    methods: {
        updateQuestion() {
            this.$emit('update-question');
        },
        handleChange(val) {
            this.question.body = val;
            this.updateQuestion();
        },
        onRemove() {
            this.$emit('remove-question', this.idx);
        },
        onCopy() {
            this.$emit('copy-question', this.idx);
        }
    },
    components: {
        BodyInputEmpty,
        BodyInputQuote,
        BodyInputImage,
        BodyInputCode
    }
};
</script>