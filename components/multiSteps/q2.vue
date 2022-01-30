<template>
  <div>
    <!-- step progress bar -->
    <div class="mt-10">
      <span class="txt-mid-bold">
        Q2. 강사님의 전달력이 명확하고 강의 몰입도가 높았나요?
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
            class="flex items-center justify-center transition-colors border rounded-full cursor-pointer text-gray1 bg-gray4 border-gray2 hover:bg-yellow1 hover:text-white"
            :class="{ 'bg-orange2 text-white': i === $store.state.q2score }"
            style="width: 56px; height: 56px"
            @click="$store.commit('changeQ2score', i)"
          >
            <span class="txt-mid-bold">{{ i }}</span>
          </div>
        </div>

        <div class="flex justify-center mt-11">
          <ButtonGeneral
            :width="88"
            class="border py-5px border-orange2 text-orange2 txt-sub-bold rounded-8px"
            @click="$store.commit('previous')"
          >
            <SvgLeftArrow class="mr-2" :color="`#F3732B`" />
            <span>이전</span>
          </ButtonGeneral>
          <ButtonGeneral
            :width="88"
            class="ml-6 border py-5px txt-sub-bold rounded-8px"
            :class="[
              nextBtnActive
                ? ' border-orange2  text-orange2'
                : 'border-gray2 pointer-events-none text-gray2',
            ]"
            @click="$store.commit('next')"
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
      return this.$store.state.q2score ? true : false;
    },
  },
};
</script>

<style lang="postcss" scoped></style>
