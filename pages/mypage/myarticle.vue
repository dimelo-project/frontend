<template>
  <div>
    <!-- top menu box -->
    <div class="p-5 rounded-4px bg-gray4">
      <span class="txt-base-bold">자유주제</span>
      <span class="ml-6">스터디</span>
      <span class="ml-6">사이드 프로젝트</span>
    </div>

    <!-- total number of my article -->
    <div class="mt-7">
      <span class="txt-sub">총 7건</span>
    </div>

    <!-- divider -->
    <div class="mt-3 border-t-2" border-gray2></div>

    <!-- my article data list -->
    <div v-for="i in 5" :key="i" class="mt-6">
      <!-- tag & title -->
      <div class="flex items-center">
        <div
          class="txt-sub-bold text-green1 bg-green2 rounded-8px py-8px px-10px"
        >
          <span>개발</span>
        </div>

        <div class="ml-1.5 txt-mid-bold">
          <span>파이썬 입문 강의 추천해주세요!</span>
        </div>
      </div>

      <!-- article body -->
      <div class="mt-3">
        <p>
          안녕하세요. 문과생이에요. 파이썬 강의 입문하려고 하는데 어떤 것이
          좋은지 몰라서요.. 혹시 괜찮 강의 추천좀 부탁드려
        </p>
      </div>

      <!-- created date & number of comments -->
      <div class="flex flex-col mt-3">
        <span class="text-gray6">2021.11.23</span>
        <span class="mt-2 text-gray1">댓글 3</span>
      </div>

      <!-- divider -->
      <div class="mt-6 border-t border-gray2"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "mypage",
  mounted() {
    this.$store.commit("changeCntCategoryIdx", 2);
  },
};
</script>

<style lang="postcss" scoped></style>
