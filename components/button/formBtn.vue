<template>
  <button
    v-on="$listeners"
    type="button"
    class="form-button"
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
.form-button {
  @apply px-4 py-2 text-center text-white 
  transition duration-200 ease-in rounded-md
  bg-orange1 hover:bg-orange2;
}
</style>
