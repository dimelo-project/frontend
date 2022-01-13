<template>
  <button
    v-on="$listeners"
    type="button"
    class="button txt-mid"
    :class="{ 'txt-base': small, 'w-full': large, dark: dark }"
    :style="sizeObject"
  >
    {{ btnText }}
  </button>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    btnText: {
      type: String,
      required: true,
    },
    small: {
      type: Boolean,
      default: () => false,
    },
    large: {
      type: Boolean,
      default: () => false,
    },
    dark: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      sizeObject: {
        width: `${this.width}px`,
        height: `${this.height}px`,
      },
    };
  },
};
</script>

<style lang="postcss" scoped>
.button {
  @apply px-3 py-1 text-center text-white 
  transition duration-200 ease-in rounded-md
  bg-orange1 hover:bg-orange2;
}
.dark {
  @apply text-orange2 bg-white border border-orange2 hover:text-white;
}
</style>
