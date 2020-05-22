<template>
    <span class="upload-btn">
        <span v-if="!isProcessing">Upload</span>
        <img v-else src="@/assets/imgs/loader-small.svg" alt="loader" />
    </span>
</template>

<script>
export default {
    props: {
        isProcessing: {
            type: Boolean,
            required: true
        }
    }
};
</script>

<style lang="scss">
    .upload-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 76.5px;
        height: 27px;
        text-transform: capitalize;
        border: 1px solid;
        border-radius: 100px;
        cursor: pointer;

        span {
            margin: 0;
        }
        [alt=loader] {
            width: 20px;
        }
    }
</style>