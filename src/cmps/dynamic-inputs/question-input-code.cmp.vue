<template>
    <div>
        <pre 
            class="language-js" 
            v-highlight 
            ref="snippet"
            :contenteditable="true" 
            @input="handleChange" 
            @blur="checkForPlaceholder" 
            @focus="placeholder = ''"
            >
            {{ placeholder }}
        </pre>
    </div>
</template>

<script>
import '../../../node_modules/vue-code-highlight/themes/prism-dark.css';

export default {
    name: 'body-input-code',
    props: {
        value: {
            type: String,
            required: true
      }
    },
    data() {
        return {
            placeholder: '// Your Code Here...'
        }
    },
    mounted() {
        if (this.value) this.$refs.snippet.innerText = this.value;
    },
    methods: {
        handleChange({ target }) {
            this.$emit('input-change', target.innerText);
        },
        checkForPlaceholder({ target }) {
            if (!target.innerText) this.placeholder = '// Your Code Here...';
        }
    }
};
</script>