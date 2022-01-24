<template>
  <button
    v-on="$listeners"
    type="button"
    class="flex items-center"
    :class="[borderRadius]"
  >
    <img
      v-if="imgName"
      :src="require(`~/assets/imgs/logo/tech/${imgName}.png`)"
      :class="[imgGap]"
      style="width: 20px; height: 20px"
    />
    <span>
      {{ chipText }}
    </span>
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
    imgName: {
      type: String,
      default: () => null,
    },
    imgGap: {
      type: String,
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
  // methods: {
  //   imgUrl() {
  //     return require(`~assets/imgs/logo/tech/${this.imgName}.png`);
  //   },
  // },
};
</script>

<style lang="postcss" scoped></style>
