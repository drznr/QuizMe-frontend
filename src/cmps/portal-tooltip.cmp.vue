<template>
  <portal-target class="tooltip" name="clipboard-msg" slim :transition="fade"></portal-target>
</template>

<script>
export default {
  computed: {
    fade() {
      return {
        functional: true,
        render(h, context) {
          return h(
            "transition",
            { props: { name: "fade", mode: "out-in" } },
            context.children
          );
        }
      };
    }
  }
};
</script>

<style lang="scss">
.tooltip {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
}
</style>