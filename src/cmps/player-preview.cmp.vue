<template>
    <div class="player-preview" :class="{ready: player.isReady}">
        <span class="player-preview-details">
            <span class="player-preview-bulb" :style="{backgroundColor: playerColor}"></span>
            <img :src="player.avatar" alt="player avatar" class="player-preview-avatar" />
            <h4>{{ this.player.username }}</h4>
        </span>
        <k-progress :percent="progressPercent" :color="[`${playerColor}33`, playerColor]" class="player-preview-progress"></k-progress>
        <span v-if="progressPercent === 100">🏅</span>
    </div>
</template>

<script>
import { utilService } from '@/services/util.service';

import KProgress from 'k-progress';

export default {
    props: {
        player: {
            type: Object,
            required: true
        },
        quizLength: {
            type: Number,
            required: true
        }
    },
    computed: {
        playerColor() {
            return utilService.getRandomColor();
        }, 
        progressPercent() { 
            const percent = (this.player.ansCount / this.quizLength) * 100;
            return +percent.toFixed(2);
        }
    },
    components: {
        KProgress
    }
};
</script>