<template>
  <div>
    <!-- divider -->
    <div class="border-t-2 border-gray2"></div>

    <!-- comment date list -->
    <div v-for="i in 3" :key="i" class="mt-4">
      <div>
        <span>저도 참여하고 싶습니다!! 열심히 하고자 합니다!!ㅎㅎㅎㅎㅎㅇ</span>
      </div>
      <div class="txt-sub text-gray6">
        <span>2021.11.23</span>
      </div>
      <div class="txt-sub text-rgay1">
        <span>원글제목 말머리는빼고</span>
      </div>
      <div class="mt-4 border-t border-gray2"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "mypage",
  mounted() {
    this.$store.commit("changeCntCategoryIdx", 3);
  },
};
</script>

<style lang="postcss" scoped></style>
