<template>
<div>
    <pre class="language-js" v-highlight>
        {{ body }}
    </pre>
</div>
</template>

<script>
import '../../../node_modules/vue-code-highlight/themes/prism-dark.css';

export default {
    props: {
        body: {
            type: String,
            required:true
        }
    }
};
</script>