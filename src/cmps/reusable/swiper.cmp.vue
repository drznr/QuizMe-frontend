<template>
    <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(subject, idx) in subjects" :key="idx">
            <random-bg-color class="label">{{ subject }}</random-bg-color>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
</template>

<script>  
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

import randomBgColor from './random-bg-color';

export default {
    props: {
        subjects: {
            type: Array,
            required: true
        }
    },
    data() {
      return {
        swiperOption: {
          grabCursor: true,
          slidesPerView: 6,
          spaceBetween: 30,
          loop: true,
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
          keyboard: {
            enabled: true,
            onlyInViewport: true
          }
        }
      }
    },
    components: {
      Swiper,
      SwiperSlide,
      randomBgColor
    }
}
</script>
<style lang="scss">
    .swiper {
        text-align: center;
        padding: 20px 30px;
        .swiper-button-prev, .swiper-button-next {
            transform: scale(.2);
            color: rgba(#000000, .7);
        }
    }
</style>