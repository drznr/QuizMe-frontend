<template>
    <div class="img-input">
        <label>
            <input type="file" @change="uploadImage" :required="isRequired" />
            <upload-btn :isProcessing="isProcessing"></upload-btn>
        </label>
        <img :src="imgSrc || require('@/assets/imgs/image-placeholder.png')" alt="question's image" class="ratio-square" />
    </div>
</template>

<script>
import uploadBtn from '../reusable/upload-btn.cmp';
import { uploadService } from '@/services/upload.service'; 

export default {
    name: 'body-input-image',
    props: {
        value: {
            type: String,
            required: true
        },
        isRequired: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            imgSrc: ''
        }
    },
    created() {
        this.imgSrc = this.value || '';
    },
    computed: {
        isProcessing() {
            return this.$store.getters.isProcessing;
        }
    },
    methods: {
        async uploadImage(ev) {
            this.$store.commit({ type: 'setIsProcessing', isProcessing: true });
            const res = await uploadService.uploadImg(ev);
            this.imgSrc = res.secure_url;
            this.$store.commit({ type: 'setIsProcessing', isProcessing: false });
            this.$emit('input-change', this.imgSrc);
        }
    },
    components: {
        uploadBtn
    }
};
</script>

<style lang="scss">
    [type=file] {
        position: absolute;
        z-index: -1;
        height: 0;
        width: 0;
    }
</style>