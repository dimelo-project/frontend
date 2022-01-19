<template>
  <button
    v-on="$listeners"
    type="button"
    class="chip txt-mid"
    :style="[sizeObject, gapObject]"
  >
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

<style lang="postcss" scoped>
.chip {
  @apply px-4 py-3
    border rounded-lg border-gray2
  hover:bg-gray3;
}
</style>
