<template>
    <section class="quiz-filter">
        <div class="quiz-filter-subjects">
            <swiper :subjects="subjects"></swiper>
        </div>
        <div class="quiz-filter-filter">
            <span>
                <input type="text" placeholder="Search" v-debounce="onFilter" v-model="filterBy.title" />
               <label>
                <select @change="onFilter" v-model="filterBy.subject">
                    <option value="">All</option>
                    <option v-for="(subject, idx) in subjects" :key="idx"  :value="subject">{{ subject }}</option>
                </select>
                <font-awesome-icon icon="caret-down" class="arr"></font-awesome-icon>
            </label>
            </span>
            <div class="quiz-filter-filter-sorters">
                <label>
                    <input type="radio" name="sortBy" value="" v-model="filterBy.sortBy" @change="onFilter" hidden />
                    <span></span>
                    <font-awesome-icon icon="random" title="Random" class="icon"></font-awesome-icon>
                </label>
                <label>
                    <input type="radio" name="sortBy" value="title" v-model="filterBy.sortBy" @change="onFilter" hidden />
                    <span></span>
                    <font-awesome-icon icon="font" title="Title" class="icon"></font-awesome-icon>
                </label>
                <label>
                    <input type="radio" name="sortBy" value="at" v-model="filterBy.sortBy" @change="onFilter" hidden />
                    <span></span>
                    <font-awesome-icon :icon="['far', 'clock']" title="Latest" class="icon"></font-awesome-icon>
                </label>
                <label>
                    <input type="checkbox" v-model="filterBy.isDesc" @change="onFilter" hidden />
                    <font-awesome-icon v-if="filterBy.isDesc" icon="sort-alpha-up" title="Asc / Desc"></font-awesome-icon>
                    <font-awesome-icon v-else icon="sort-alpha-down" title="Asc / Desc"></font-awesome-icon>
                </label>
            </div>
        </div>
    </section>
</template>

<script>
import { quizService } from '@/services/quiz.service';
import swiper from './reusable/swiper.cmp';

export default {
    props: {
        subjects: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            filterBy: quizService.getEmptyCriteria()
        }
    },
    methods: {
        onFilter() { 
            this.$emit('onFilter', this.filterBy);
        }
    },
    components: {
        swiper
    }
};
</script>