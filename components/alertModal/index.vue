<template>
  <div
    v-if="isModalOpened"
    class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-75 border-0 bg-gray9"
  >
    <div class="bg-white rounded-8px" style="width: 520px; height: 200px">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isModalOpened: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style lang="postcss" scoped></style>
