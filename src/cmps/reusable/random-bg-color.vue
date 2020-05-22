<template>
    <span class="label" :style="{backgroundColor: bgColor}">
        <slot></slot>
    </span>
</template>

<script>
import { utilService } from '@/services/util.service';

export default {
    computed: {
          bgColor() { 
            return utilService.getRandomColor();
        }
    }
};
</script>