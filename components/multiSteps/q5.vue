<template>
  <div>
    <!-- pros -->
    <div class="mt-10">
      <div class="flex justify-between">
        <span class="txt-sub-bold">강의 장점</span>
        <span class="txt-mini text-gray1">0자/1000자</span>
      </div>
      <textarea
        class="w-full p-3 border outline-none txt-sub mt-1.5 resize-none rounded-8px"
        style="height: 160px"
        :placeholder="examplePlaceholder"
        :value="$store.state.q5pros"
        @input="inputPros"
      ></textarea>
    </div>
    <!-- cons -->
    <div class="mt-3">
      <div class="flex justify-between">
        <span class="txt-sub-bold">강의 단점</span>
        <span class="txt-mini text-gray1">0자/1000자</span>
      </div>
      <textarea
        class="w-full p-3 border outline-none txt-sub mt-1.5 resize-none rounded-8px"
        style="height: 160px"
        :placeholder="examplePlaceholder"
        :value="$store.state.q5cons"
        @input="inputCons"
      ></textarea>
    </div>
    <!-- warning noti -->
    <div class="flex mt-4 flex-start">
      <SvgExclamationMark class="flex-shrink-0" :color="`#F3732B`" />
      <p class="ml-2 txt-mini">
        리뷰는 강사 혹은 제3자로부터 대가를 제공받지 않고 실제로 강의를 들은
        경험과 사실에 입각해 작성되어야 하며, 진위 여부를 확인하기 위한 자료를
        요청드릴 경우 협조할 것에 동의해야 합니다.
      </p>
    </div>

    <div class="flex justify-center mt-11">
      <ButtonGeneral
        :width="88"
        class="flex-shrink-0 border py-5px txt-sub-bold border-orange2 text-orange2 rounded-8px"
        @click="$store.commit('previous')"
        @input="$store.commit('changeQ5cons', event.target.value)"
      >
        <SvgLeftArrow class="mr-2" :color="`#F3732B`" />
        <span class="text-orange2">이전</span>
      </ButtonGeneral>
      <ButtonGeneral
        @click="$emit('reviewUpload')"
        class="w-full ml-6 border py-5px txt-sub-bold rounded-8px"
        :class="[
          submitBtnActive
            ? ' border-orange2  text-orange2'
            : 'border-gray2 pointer-events-none text-gray2',
        ]"
        :height="44"
      >
        <span>동의하고 리뷰 게시하기</span>
        <SvgRightArrow
          class="ml-2"
          :color="submitBtnActive ? '#F3732B' : '#E0E1E5'"
        />
      </ButtonGeneral>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      examplePlaceholder: `작성예시: 실무와 연관이 깊고, 실용적이고 실무에서 쓰일법한 지식들을 골라서 강의해주신게 인상적이었습니다. 또한 강의를 함께 듣는 수강생끼리 협업이나 소통을 하도록 분위기를 만들어주셔서 공부할 때, 프로젝트 팀원 구할 때 도움이 많이 된 점이 좋았습니다.
(*단순 좋다, 별로다 보다는 장단점을 상세하게 적은 후기일 수록 많은 도움이 됩니다.)`,
    };
  },
  computed: {
    submitBtnActive() {
      return (
        this.$store.state.q5cons.length > 0 &&
        this.$store.state.q5pros.length > 0
      );
    },
  },
  methods: {
    inputPros(event) {
      this.$store.commit("changeQ5pros", event.target.value);
    },
    inputCons(event) {
      this.$store.commit("changeQ5cons", event.target.value);
    },
  },
};
</script>

<style lang="postcss" scoped></style>
