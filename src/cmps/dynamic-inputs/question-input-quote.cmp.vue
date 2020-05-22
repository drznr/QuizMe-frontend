<template>
<div>
    <font-awesome-icon icon="quote-left" class="quote"></font-awesome-icon>
    <input type="text" placeholder="Quote" @input="handleChange" v-model="quote" required />
    <font-awesome-icon icon="quote-right" class="quote"></font-awesome-icon>
</div>
</template>

<script>
export default {
    name: 'body-input-quote',
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            quote: ''
        }
    },
    created() {
        this.quote = this.value;
    },
    methods: {
        handleChange() {
            this.$emit('input-change', this.quote);
        }
    }
};
</script>