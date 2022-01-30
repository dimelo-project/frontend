<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      transform="rotate(180 12 12)"
      :stroke="color"
      stroke-width="1.5"
    />
    <path
      d="M12 15L12 14.999"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="12"
      y1="12"
      x2="12"
      y2="8"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
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

<style lang="postcss" scoped></style>
