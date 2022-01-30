<template>
  <svg
    width="14"
    height="12"
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1L13 6M8 11L13 6M13 6H1"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: () => "black",
    },
  },
};
</script>

<style lang="postcss" scoped>
path {
  @apply transition duration-200 ease-in;
}
</style>
