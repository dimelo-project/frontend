<template>
  <div
    v-if="$store.state.multiStepModal.isModalOpened"
    class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-75 bg-gray9"
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
        class="py-10 bg-white opacity-100 px-13 rounded-8px"
        style="width: 640px"
      >
        <!-- step progress bar -->
        <div class="flex justify-center mt-1">
          <StepProgressBar />
        </div>
        <!-- dynamic component here -->
        <component
          v-bind:is="steps[$store.state.multiStepModal.currentStep].component"
          @reviewUpload="$emit('reviewUpload')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import q1 from "./q1";
import q2 from "./q2";
import q3 from "./q3";
import q4 from "./q4";
import q5 from "./q5";

export default {
  data() {
    return {
      currentStep: 0,
      submitted: false,
      steps: [
        {
          component: q1,
          label: "q1",
        },
        {
          component: q2,
          label: "q2",
        },
        {
          component: q3,
          label: "q3",
        },
        {
          component: q4,
          label: "q4",
        },
        {
          component: q5,
          label: "q5",
        },
      ],
    };
  },
  methods: {
    closeModal() {
      this.$store.commit("multiStepModal/changeQ1score", "");
      this.$store.commit("multiStepModal/changeQ2score", "");
      this.$store.commit("multiStepModal/changeQ3score", "");
      this.$store.commit("multiStepModal/changeQ4score", "");
      this.$store.commit("multiStepModal/changeQ5pros", "");
      this.$store.commit("multiStepModal/changeQ5cons", "");

      this.$store.commit("multiStepModal/changeCurrentStep", 0);
      this.$store.commit("multiStepModal/changeProgressWidth", 33);

      this.$store.commit("multiStepModal/changeIsModalOpened", false);
    },
  },
};
</script>

<style lang="postcss" scoped></style>
