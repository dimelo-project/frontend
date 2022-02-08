<template>
  <div
    v-if="isModalOpened"
    class="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-gray9"
  >
    <div
      class="bg-white border border-black rounded-8px"
      style="width: 520px; height: 200px"
    >
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
