<template>
    <p class="long-txt" @click="toggleTxt" :class="{clipped: !isShown}">
        {{ txtToDisplay }}
    </p>
</template>

<script>
export default {
    props: {
        txt: {
            type: String,
            required: true
        },
        maxChars: {
            type: Number,
            default: 50
        }
    },
    data() {
        return {
            isLong: false,
            isShown: false
        }
    },
    computed: {
         txtToDisplay() {
            if (!this.isLong) return this.txt;
            return (this.isShown) ? this.txt : this.txt.substring(0, this.maxChars) + '...';
        }
    },
    methods: {
        toggleTxt() {
            if (!this.isLong) return;
            this.isShown = !this.isShown;
        }
    },
    created() {
        this.isLong = (this.txt.length > this.maxChars);
        this.isShown = !this.isLong;
    }
};
</script>

<style lang="scss">
    .long-txt {
        cursor: initial;

        &.clipped {
            cursor: pointer;
        }
    }
</style>