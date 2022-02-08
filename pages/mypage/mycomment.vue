<template>
  <div>
    <!-- divider -->
    <div class="border-t-2 border-gray2"></div>

    <!-- comment date list -->
    <div v-for="(comment, idx) in myCommentData" :key="idx" class="mt-4">
      <div>
        <span>{{ comment["comment_commentText"] }}</span>
      </div>
      <div class="txt-sub text-gray6">
        <span>{{ comment["comment_updatedAt"] }}</span>
      </div>
      <div class="txt-sub text-rgay1">
        <span>{{ comment["title"] }}</span>
      </div>
      <div class="mt-4 border-t border-gray2"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "mypage",
  async asyncData({ $axios }) {
    const myCommentData = await $axios.$get("/api/users/me/comments");
    console.log("myCommentData", myCommentData);

    return { myCommentData };
  },
  mounted() {
    this.$store.commit("changeCntCategoryIdx", 3);
  },
};
</script>

<style lang="postcss" scoped></style>
