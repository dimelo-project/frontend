<template>
  <div class="h-32 border-2 border-red-500" />
</template>

<script>
export default {
  props: ["options"],
  data() {
    return {
      observer: null,
      detectCnt: 1,
    };
  },
  mounted() {
    const options = this.options || {};

    this.observer = new IntersectionObserver(([entry]) => {
      console.log(this.detectCnt, entry);
      console.log(entry.boundingClientRect.bottom, window.innerHeight);

      if (
        entry &&
        entry.boundingClientRect.bottom + 4 >= window.innerHeight &&
        entry.isIntersecting
      ) {
        this.$emit("intersect");
      }

      this.detectCnt++;
    }, options);

    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>
