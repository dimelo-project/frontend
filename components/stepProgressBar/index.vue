<template>
  <div>
    <div class="container">
      <h1>Step Progress Bar</h1>
      <div
        class="relative flex items-center justify-between"
        style="width: 276px"
      >
        <div
          class="absolute left-0 bg-gray3 ml-6px"
          style="height: 2px; width: 264px"
        ></div>
        <div
          class="absolute left-0 z-10 transition-colors bg-yellow1 ml-6px"
          style="height: 2px"
          :style="{ width: `${progressWidth}px` }"
        ></div>
        <div
          v-for="i in 5"
          :key="i"
          style="width: 12px; height: 12px"
          class="z-10 transition-colors rounded-full"
          :class="[i - 1 <= cntStep ? 'bg-yellow1' : 'bg-gray3']"
        ></div>
      </div>
    </div>

    <ButtonGeneral
      @click="clickPrevBtn"
      class="p-2 rounded-4px"
      :color="`orange2`"
    >
      <span>Prev</span>
    </ButtonGeneral>

    <ButtonGeneral
      @click="clickNextBtn"
      class="p-2 rounded-4px"
      :color="`orange2`"
    >
      <span>Next</span>
    </ButtonGeneral>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cntStep: 0,
      progressWidth: 33,
    };
  },
  methods: {
    clickNextBtn() {
      if (this.cntStep === 3) {
        this.progressWidth = this.progressWidth + 33;
        this.cntStep += 1;
      } else if (this.cntStep >= 4) {
        return;
      } else {
        this.progressWidth = this.progressWidth + 66;
        this.cntStep += 1;
      }
    },
    clickPrevBtn() {
      if (this.cntStep === 4) {
        this.progressWidth = this.progressWidth - 33;
        this.cntStep -= 1;
      } else if (this.cntStep === 0) {
        return;
      } else {
        this.progressWidth = this.progressWidth - 66;
        this.cntStep -= 1;
      }
    },
  },
};
</script>

<style lang="postcss" scoped></style>
