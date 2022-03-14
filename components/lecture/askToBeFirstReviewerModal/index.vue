<template>
  <div
    v-if="$store.state.lecture.isAskToBeFirstReviewerModalOpened"
    class="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-opacity-75 border-0"
    style="background-color: rgba(11, 19, 30, 0.37)"
  >
    <div
      class="flex items-center justify-center bg-white border-0 select-none rounded-8px"
      style="width: 520px; height: 200px"
    >
      <div class="text-center">
        <div>
          <span class="txt-mid">첫 리뷰를 작성하시겠습니까??</span>
          <div class="flex mt-11">
            <ButtonGeneral
              @click="clickCancelButton"
              :width="145"
              :height="44"
              class="border border-orange2 text-orange2 rounded-4px hover:bg-orange2 hover:text-white"
            >
              <span class="txt-base-bold"> 취소 </span>
            </ButtonGeneral>
            <ButtonGeneral
              @click="clickConfirmButton"
              :width="145"
              :height="44"
              class="ml-4 text-white bg-orange1 rounded-4px hover:bg-orange2"
            >
              <span class="txt-base-bold"> 확인 </span>
            </ButtonGeneral>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    clickCancelButton() {
      this.$store.commit(
        "lecture/changeIsAskToBeFirstReviewerModalOpened",
        false
      );
      this.$store.commit("lecture/changeSelectedCourseIdx", "");
    },
    clickConfirmButton() {
      this.$store.commit(
        "lecture/changeIsAskToBeFirstReviewerModalOpened",
        false
      );
      this.$router.push(
        `/review/${this.$store.state.lecture.selectedCourseIdx}`
      );
      this.$store.commit("lecture/changeSelectedCourseIdx", "");
    },
  },
};
</script>
