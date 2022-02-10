<template>
  <div
    v-if="isModalOpened"
    class="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-gray9"
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
        <div v-if="!submitted">
          <!-- step progress bar -->
          <div class="flex justify-center mt-1">
            <StepProgressBar />
          </div>
          <!-- dynamic component here -->
          <component
            v-bind:is="steps[$store.state.currentStep].component"
            @reviewUpload="$emit('reviewUpload')"
          />
        </div>
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
  props: {
    isModalOpened: {
      type: Boolean,
      default: () => false,
    },
  },
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
    submit() {
      this.submitted = true;
    },
    closeModal() {
      this.$store.commit("changeQ1score", "");
      this.$store.commit("changeQ2score", "");
      this.$store.commit("changeQ3score", "");
      this.$store.commit("changeQ4score", "");
      this.$store.commit("changeQ5pros", "");
      this.$store.commit("changeQ5cons", "");

      this.$emit("modalClose");
    },
  },
};
</script>

<style lang="postcss" scoped></style>
