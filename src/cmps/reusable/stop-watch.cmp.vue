<template>
    <div class="stop-watch">{{ ms | duration }}</div>
</template>

<script>
export default {
    props: {
        isActive: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            ms: 0,
            interval: null
        }
    },
    watch: {
        isActive() {
            if (this.isActive) this.start();
            else this.stop();
        }
    },
    methods: {
        start() {
            this.interval = setInterval(() => {
                this.ms += 100;
            }, 100);
        },
        stop() {
            clearInterval(this.interval);
            this.ms = 0;
        }
    }
};
</script>