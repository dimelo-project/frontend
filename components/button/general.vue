<template>
  <button
    v-on="$listeners"
    type="button"
    class="button txt-mid"
    :class="{ 'txt-base': small }"
    :style="sizeObject"
  >
    {{ btnText }}
  </button>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: () => "380",
    },
    height: {
      type: String,
      default: () => "56",
    },
    btnText: {
      type: String,
      required: true,
    },
    small: {
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
  bg-orange1 hover:bg-orange2;
}
</style>
