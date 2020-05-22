<template>
    <div class="quote">
        <font-awesome-icon icon="quote-left" class="icon left"></font-awesome-icon>
        {{ body }}
        <font-awesome-icon icon="quote-right" class="icon right"></font-awesome-icon>
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

<style lang="scss" scoped>
    .quote {
        position: relative;

        .icon {
            position: absolute;
        }
    }
</style>