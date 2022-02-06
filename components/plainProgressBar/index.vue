<template>
  <div style="width: 175px; height: 6px" class="relative rounded-8px bg-gray4">
    <div :style="{ width: `${score * 35}px` }">
      <div
        style="height: 6px"
        class="rounded-8px bg-yellow1 animate-fillColor"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="postcss" scoped>
@keyframes fillColor {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
.animate-fillColor {
  animation: fillColor 1s;
  animation-iteration-count: 1;
}
</style>
