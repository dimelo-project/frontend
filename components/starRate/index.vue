<template>
  <div class="flex">
    <SvgReviewStar v-for="i in filledStarNum" :key="`${i}-fill`" />
    <SvgReviewStarHalf v-if="half" />
    <SvgReviewStar
      :fill="false"
      v-for="i in unfilledStarNum"
      :key="`${i}-unfill`"
    />
  </div>
</template>

<script>
export default {
  props: {
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
        return 5;
      } else if (score > 4.2 && score <= 4.7) {
        this.half = true;
        return 4;
      } else if (score > 3.7 && score <= 4.2) {
        return 4;
      } else if (score > 3.2 && score <= 3.7) {
        this.half = true;
        return 3;
      } else if (score > 2.7 && score <= 3.2) {
        return 3;
      } else if (score > 2.2 && score <= 2.7) {
        this.half = true;
        return 2;
      } else if (score > 1.7 && score <= 2.2) {
        return 2;
      } else if (score > 1.2 && score <= 1.7) {
        this.half = true;
        return 1;
      } else if (score > 0.7 && score <= 1.2) {
        return 1;
      } else if (score > 0.0 && score <= 0.7) {
        this.half = true;
        return 0;
      } else {
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
