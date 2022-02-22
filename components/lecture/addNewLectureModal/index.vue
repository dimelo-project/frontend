<template>
  <!-- 강의 등록 모달 -->
  <div
    v-if="isModalOpened"
    class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-75 border-0 bg-gray9"
  >
    <div class="relative">
      <!-- close button -->
      <div
        class="absolute top-0 right-0 translate-x-full cursor-pointer"
        @click="closeModal"
      >
        <SvgCloseWindow :color="`white`" class="ml-4" />
      </div>

      <!-- contents -->
      <div
        class="py-10 bg-white rounded-8px px-13"
        style="width: 640px; height: 376px"
      >
        <div>
          <span class="txt-mid-bold"
            >등록을 원하는 강의의 URL을 적어주세요.</span
          >
        </div>

        <div class="mt-5">
          <span class="txt-mini">
            <span class="txt-mini-bold"
              >강의 판매 페이지의 정확한 URL을 적어주세요.</span
            >
            새로운 강의와 리뷰 등록에는 약 7일이 소요되며, <br />
            URL에 오류가 있거나 기타 문제가 발생할 경우 등록이 불가할 수
            있습니다.
          </span>
        </div>

        <InputGeneral
          ref="lectureurlinput"
          :height="44"
          :type="`text`"
          :placeholder="`강의 URL입력`"
          :value="$store.state.lecture.newLectureUrl"
          @input="handleNewLectureUrlInput"
          class="px-3 mt-10 border rounded-4px txt-sub"
          :class="[
            $store.state.lecture.newLectureUrl.length > 0
              ? 'border-orange2'
              : 'border-gray2',
          ]"
        />

        <div class="flex justify-center">
          <ButtonGeneral
            @click="clickAddReviewBtn"
            :width="200"
            :height="44"
            class="border mt-15 rounded-8px text-base-bold"
            :class="[
              canSubmit
                ? 'text-white bg-orange1 hover:bg-orange2'
                : 'border-gray2 text-gray2 pointer-events-none',
            ]"
          >
            <span>강의 리뷰 작성하기</span>
          </ButtonGeneral>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isModalOpened: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    canSubmit() {
      if (this.$store.state.lecture.newLectureUrl.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    handleNewLectureUrlInput(value) {
      this.$store.commit("lecture/changeNewLectureUrl", value);
    },
    closeModal() {
      this.$emit("modalclosed");
      this.$store.commit("lecture/changeNewLectureUrl", "");
    },
    clickAddReviewBtn() {
      this.$store.commit("lecture/changeIsAddLectureModalOpened", false);
      this.$store.commit("lecture/changeIsCreateReviewModalOpened", true);
    },
  },
};
</script>
