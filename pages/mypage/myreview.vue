<template>
  <div>
    <div>
      <span class="txt-sub">총 7건</span>
    </div>

    <!-- divider -->
    <div class="mt-3 border-t-2 border-gray2"></div>

    <!-- review data list -->
    <div v-for="i in 3" :key="i" class="mt-5">
      <!-- lecture title -->
      <span class="txt-sub text-gray1">
        파이썬입문과 크롤링기초 부트캠프 (2021 업데이트) [쉽게! 견고한
        자료까지!]
      </span>

      <!-- review rate & update, delete button -->
      <div class="flex justify-between mt-4">
        <div class="flex items-center">
          <StarRate :score="5" :size="20" />
          <span class="ml-1 txt-base-bold">5.0</span>
        </div>

        <div class="txt-sub">
          <span class="underline text-gray1">수정</span>
          <span class="ml-4 underline text-gray1">삭제</span>
        </div>
      </div>

      <!-- props & cons -->
      <div class="mt-4">
        <div>
          <span class="text-orange2 txt-sub-bold">장점</span>
          <p>
            실무와 연관이 깊고, 실용적이고 실무에서 쓰일법한 지식들을 골라서
            강의해주신게 인상적이었습니다. 안녕하세요 안녕하tㅔ요
          </p>
        </div>

        <div class="mt-3">
          <span class="text-orange2 txt-sub-bold">단점</span>
          <p>
            강의 전체 횟수와 시간이 조금 루즈했던 것 같습니다. 어느정도 공부를
            해본 사람보다는 아예 입문자가 수강하면 괜찮을 것 같습니다. 어느정도
            공부를 해본 사람보다는 아예 어느정도 공부를 해본 사람보
          </p>
        </div>
      </div>

      <!-- date -->
      <div class="mt-2 txt-mini text-gray1">
        <span>2021-00-00</span>
      </div>

      <!-- divider -->
      <div class="mt-5 border-t border-gray1"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "mypage",
  mounted() {
    this.$store.commit("changeCntCategoryIdx", 1);
  },
};
</script>

<style lang="postcss" scoped></style>
