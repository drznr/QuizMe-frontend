<template>
    <section class="scores-modal">
        <ul>
            <li class="scores-modal-user">
                <img :src="player.avatar" alt="Player avatar" class="avatar" />
                <span class="username">{{ username }}</span>
                <span class="percentage" :class="{good: ansPercent >= 50}">{{ ansPercent }}%</span>
                <span>
                    <font-awesome-icon :icon="['far', 'clock']" class="icon"></font-awesome-icon>
                    {{ this.player.score / 1000 }}
                </span>
            </li>
            <li v-for="rival in rivals" :key="rival.uid">
                <img :src="rival.avatar" alt="Player avatar" class="avatar" />
                <span class="username">{{ rival.username }}</span>
                <span class="percentage" v-if="rival.isDone" :class="{good: rival.stats.percent >= 50}">{{ rival.stats.percent.toFixed(2) }}%</span>
                <span v-if="rival.isDone">
                    <font-awesome-icon :icon="['far', 'clock']" class="icon"></font-awesome-icon>
                    {{ rival.stats.time / 1000 }}
                </span>
                <span v-else>In progress</span>
            </li>
        </ul>
        <div class="scores-modal-actions">
            <button @click="onPlayAgain">Try again</button>
            <router-link to="/quiz">Back to list</router-link>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        player: {
            type: Object,
            required: true
        },
        rivals: {
            type: Array,
            required: true
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        username() {
            return (this.user) ? this.player.username : 'Me';
        },
        ansPercent() {
            const percent = (this.player.rightCount / this.player.ansCount) * 100;
            return +percent.toFixed(2);
        }
    },
    methods: {
        onPlayAgain() {
            this.$router.go(0);
        }
    }
};
</script>