<template>
  <div id="app" :class="{edit: $route.name === 'quiz-edit'}">
    <main-navbar v-if="$route.name !== 'quiz-page'"></main-navbar>
    <transition name="slither" mode="out-in">
      <router-view />
    </transition>
    <main-footer v-if="$route.name !== 'quiz-page'"></main-footer>
    <portal-tooltip></portal-tooltip>
  </div>
</template>

<script>
import mainNavbar from '@/cmps/main-navbar.cmp';
import mainFooter from '@/cmps/main-footer.cmp';
import portalTooltip from '@/cmps/portal-tooltip.cmp'

export default {
  async created() {
    await this.$store.dispatch({ type: 'loadQuizzes' });
    this.$store.commit({ type: 'setSubjects' });
  },
  components: {
    mainNavbar,
    mainFooter,
    portalTooltip
  }
}
</script>

<style lang="scss">
  .slither-enter-active, .slither-leave-active {
    transition: all .6s ease-in-out;
  }
  
  .slither-enter, .slither-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
  
  .slither-enter-to, .slither-leave {
    transform: translateX(0);
    opacity: 1;
  }
</style>