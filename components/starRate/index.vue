<template>
  <div class="flex">
    <SvgReviewStar v-for="i in filledStarNum" :key="i" />
    <SvgReviewStar :fill="false" v-for="i in unfilledStarNum" :key="i" />
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
  computed: {
    filledStarNum() {
      const score = Number(this.score);

      if (score > 4.5 && score <= 5.0) {
        return 5;
      } else if (score > 3.5 && score <= 4.5) {
        return 4;
      } else if (score > 2.5 && score <= 3.5) {
        return 3;
      } else if (score > 1.5 && score <= 2.5) {
        return 2;
      } else {
        return 1;
      }
    },
    unfilledStarNum() {
      return 5 - this.filledStarNum;
    },
  },
  mounted() {
    console.log(this.score);
  },
};
</script>
