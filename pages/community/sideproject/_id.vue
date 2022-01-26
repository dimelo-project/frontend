<template>
  <div class="flex justify-center mt-14">
    <PageMoveBtn :btnText="`sdf`" @click="handleClick" class="" />
    <div style="width: 788px; margin-bottom: 544px" class="ml-12">
      <!-- content title -->
      <div class="flex items-center">
        <ChipGeneral
          :height="34"
          :borderRadius="`rounded-4px`"
          :chipText="`개발`"
          class="bg-green2 text-green1 py-5px px-2.5 txt-base-bold"
        />
        <h3 class="ml-3 txt-heading3">
          파이썬 입문하려고 하는데 강의 추천해주세요!
        </h3>
      </div>
      <!-- author info & created date -->
      <div class="flex items-center mt-5">
        <!-- profile image -->
        <div class="bg-gray-700 rounded-full w-9 h-9"></div>
        <!-- nickname -->
        <span class="ml-2 txt-base-bold">코딩꿈나무</span>
        <!-- career duration -->
        <span class="ml-1.5">개발자 3년차</span>
        <!-- created date -->
        <div class="ml-6 text-gray6">
          <span>2021.11.23</span>
          <span class="ml-1">03:03</span>
        </div>
      </div>
      <!-- divider -->
      <div class="mt-5 border border-gray2"></div>
      <!-- number of people -->
      <div class="flex items-center mt-7">
        <span class="mr-5 txt-base-bold text-gray1">모집 포지션</span>
        <ChipGeneral
          :height="40"
          :borderRadius="`rounded-4px`"
          :chipText="`백엔드 개발자`"
          class="px-3 py-2 mr-3 bg-gray3"
        />
      </div>
      <!-- selected tech stacks -->
      <div class="flex items-center mt-8">
        <span class="mr-8 txt-base-bold text-gray1">사용 기술</span>
        <ChipGeneral
          v-for="i in 3"
          :key="i"
          :height="40"
          :borderRadius="`rounded-4px`"
          :chipText="`javascript`"
          class="px-3 py-2 mr-3 bg-gray3"
        />
      </div>
      <!-- divider -->
      <div class="mt-5 border border-gray2"></div>
      <!-- content body -->
      <div class="mt-9">
        <p>
          안녕하세요. 문과생이에요. 파이썬 강의 입문하려고 하는데 어떤 것이
          좋은지 몰라서요.. 혹시 괜찮은 강의 추천좀 부탁드려도 될까요?
          비전공자라서 알아듣기 쉬운 강의였으면 좋겠어요!!!
        </p>
      </div>
      <!-- divider -->
      <div class="mt-9"></div>
      <!-- number of comments -->
      <div class="mt-7">
        <span class="txt-mid-bold">댓글 3</span>
      </div>
      <!-- comments list -->
      <div class="mt-7" v-for="i in 3" :key="i">
        <!-- commentor info -->
        <div class="flex items-center">
          <!-- commentor profile image -->
          <div class="bg-gray-300 rounded-full w-9 h-9"></div>
          <!-- commentor nickname -->
          <span class="ml-2 txt-base-bold">코딩은둔고수</span>
          <!-- commentor career duration -->
          <span class="ml-1.5 txt-base">개발자 13년차</span>
        </div>
        <!-- comment body -->
        <div class="mt-2.5">
          <span>
            ABC 선생님의 AB 강의 추천드립니다. 귀에 쏙쏙 들어오더라고요!! 공부
            열심히 하시길 바랄게요 ㅎㅎ
          </span>
        </div>
        <!-- comment created date -->
        <div class="mt-2">
          <span class="text-gray1">2021.11.13</span>
        </div>
      </div>
      <!-- comment Box & submit button -->
      <div class="flex mt-12">
        <CommentBox
          :value="userComment"
          @input="handleInput"
          :placeholder="`답변을 남겨보세요.`"
          class="border border-gray2 rounded-8px py-2.5 px-3 w-full max-h-40"
        />
        <ButtonGeneral
          class="w-18 h-11 txt-base-bold py-2.5 px-5 flex-shrink-0 ml-3.5"
          :btnText="`등록`"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "home",
  data() {
    return {
      rows: 1,
      userComment: "",
    };
  },
  methods: {
    handleInput(value) {
      this.userComment = value;
    },
    handleClick() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="postcss" scoped></style>
