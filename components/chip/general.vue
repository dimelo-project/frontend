<template>
  <button v-on="$listeners" type="button" :class="[borderRadius]">
    {{ chipText }}
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
    borderRadius: {
      type: String,
    },
    chipText: {
      type: String,
      required: true,
    },
    rightGap: {
      type: Number,
      default: () => 0,
    },
    bottomGap: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      sizeObject: {
        width: `${this.width}px`,
        height: `${this.height}px`,
      },
      gapObject: {
        "margin-right": `${this.rightGap}px`,
        "margin-bottom": `${this.bottomGap}px`,
      },
    };
  },
};
</script>

<style lang="postcss" scoped></style>
