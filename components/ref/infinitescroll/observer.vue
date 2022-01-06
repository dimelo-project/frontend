<template>
  <div class="h-32 border-2 border-red-500" />
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
      console.log(entry);
      console.log(entry.boundingClientRect.bottom, window.innerHeight);

      if (
        entry &&
        entry.boundingClientRect.bottom >= window.innerHeight &&
        entry.isIntersecting
      ) {
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
