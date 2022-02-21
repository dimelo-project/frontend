<template>
  <div class="flex">
    <SvgReviewStar v-for="i in filledStarNum" :key="`${i}-fill`" :size="size" />
    <SvgReviewStarHalf v-if="half" :size="size" />
    <SvgReviewStar
      v-for="i in unfilledStarNum"
      :size="size"
      :fill="false"
      :key="`${i}-unfill`"
    />
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: () => 24,
    },
    score: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      half: false,
    };
  },
  computed: {
    filledStarNum() {
      const score = Number(this.score);

      if (score > 4.7 && score <= 5.0) {
        this.half = false;
        return 5;
      } else if (score > 4.2 && score <= 4.7) {
        this.half = true;
        return 4;
      } else if (score > 3.7 && score <= 4.2) {
        this.half = false;
        return 4;
      } else if (score > 3.2 && score <= 3.7) {
        this.half = true;
        return 3;
      } else if (score > 2.7 && score <= 3.2) {
        this.half = false;
        return 3;
      } else if (score > 2.2 && score <= 2.7) {
        this.half = true;
        return 2;
      } else if (score > 1.7 && score <= 2.2) {
        this.half = false;
        return 2;
      } else if (score > 1.2 && score <= 1.7) {
        this.half = true;
        return 1;
      } else if (score > 0.7 && score <= 1.2) {
        this.half = false;
        return 1;
      } else if (score > 0.0 && score <= 0.7) {
        this.half = true;
        return 0;
      } else {
        this.half = false;
        return 0;
      }
    },
    unfilledStarNum() {
      if (this.half) {
        return 4 - this.filledStarNum;
      } else {
        return 5 - this.filledStarNum;
      }
    },
  },
};
</script>
