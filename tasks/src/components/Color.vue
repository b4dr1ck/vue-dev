<script>
export default {
  name: "Color",
  props: ["availableColor", "activeColor"],
  data() {
    return {};
  },
  computed: {
    isActive() {
      if (this.availableColor === this.activeColor) {
        return "border: 1px solid white";
      }
      return "";
    },
  },
};
</script>

<template>
  <div :class="`bg-${availableColor} flex-grow-1`" :style="`height: 25px; min-width: 25px; ${isActive}`"></div>
</template>

<style></style>
