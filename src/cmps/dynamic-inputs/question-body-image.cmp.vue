<template>
    <div>
        <img :src="body" alt="question's subject" class="question-img" />
    </div>
</template>

<script>
export default {
    props: {
        body: {
            type: String,
            required: true
        }
    }
};
</script>