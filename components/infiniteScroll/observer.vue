<template>
  <div class="h-4" />
</template>

<script>
export default {
  props: ["options"],
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    const options = this.options || {};

    this.observer = new IntersectionObserver(([entry]) => {
      // console.log(entry.boundingClientRect.bottom, window.innerHeight);

      if (entry && entry.isIntersecting) {
        this.$emit("intersect");
      }
    }, options);

    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>
