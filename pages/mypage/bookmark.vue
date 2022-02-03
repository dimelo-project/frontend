<template></template>

<script>
export default {
  layout: "mypage",
  mounted() {
    this.$store.commit("changeCntCategoryIdx", 4);
  },
};
</script>

<style lang="postcss" scoped></style>
