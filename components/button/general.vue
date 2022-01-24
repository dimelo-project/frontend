<template>
  <button
    v-on="$listeners"
    type="button"
    class="button"
    :class="{ 'w-full': large, dark: dark }"
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
  @apply text-center text-white 
  transition duration-200 ease-in rounded-md
  border border-orange1 hover:border-orange2  bg-orange1 hover:bg-orange2;
}
.dark {
  @apply text-orange2 bg-white border  hover:text-white;
}
</style>
