<template>
  <div>
    <!-- step progress bar -->
    <div class="mt-9">
      <span class="txt-base-bold">강의 리뷰 작성</span>
    </div>
    <p class="mt-2 txt-mini text-gray1">
      남겨주신 리뷰는 좋은 강의를 찾고 있는 학생들에게 도움이 되며<br />
      과장과 거짓이 없는 강의 문화와 생산적인 커뮤니티를 형성하는 데에 보탬이
      됩니다.<br />
      무조건적인 비난이나 광고로 의심되는 리뷰는 사전 통보 없이 삭제처리 될 수
      있습니다.
    </p>

    <div class="mt-10">
      <span class="txt-mid-bold">
        Q1. 강의 소개 및 미리보기와 실제 강의가 일치했나요?
      </span>
    </div>

    <div class="flex justify-center mt-10">
      <div>
        <div class="flex items-center justify-between">
          <span class="txt-mini-bold text-gray1">전혀 아니다</span>
          <img
            src="~/assets/imgs/icon/twowayarrow.png"
            alt="기준"
            style="width: 240px; height: 6px"
          />
          <span class="txt-mini-bold text-gray1">매우 그렇다</span>
        </div>

        <div class="flex justify-between mt-7.5" style="width: 376px">
          <div
            v-for="i in 5"
            :key="i"
            class="flex items-center justify-center transition-colors border rounded-full cursor-pointer border-gray2 hover:bg-yellow1 hover:text-white"
            :class="[
              i === $store.state.multiStepModal.q1score
                ? 'bg-orange2 text-white'
                : 'bg-gray4 text-gray1',
            ]"
            style="width: 56px; height: 56px"
            @click="$store.commit('multiStepModal/changeQ1score', i)"
          >
            <span class="txt-mid-bold">{{ i }}</span>
          </div>
        </div>

        <div class="flex justify-center mt-11">
          <ButtonGeneral
            :width="88"
            @click="$store.commit('multiStepModal/next')"
            class="border py-5px rounded-8px txt-sub-bold"
            :class="[
              nextBtnActive
                ? ' border-orange2  text-orange2'
                : 'border-gray2 pointer-events-none text-gray2',
            ]"
          >
            <span>다음</span>
            <SvgRightArrow
              class="ml-2"
              :color="nextBtnActive ? '#F3732B' : '#E0E1E5'"
            />
          </ButtonGeneral>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    nextBtnActive() {
      return this.$store.state.multiStepModal.q1score ? true : false;
    },
  },
};
</script>

<style lang="postcss" scoped></style>
