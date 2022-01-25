<template>
  <div>
    <!-- top content -->
    <div class="flex justify-center">
      <div style="width: 786px">
        <!-- noti msg box -->
        <div class="flex">
          <img
            src="~assets/imgs/emoji/pencil.png"
            style="width: 24px; height: 24px"
          />
          <p class="ml-2">스터디하려는 기술로 필터링 해보세요.</p>
        </div>

        <!-- tech stack logo chips -->
        <div class="flex flex-wrap mt-4">
          <!-- reset button -->
          <ChipGeneral
            :borderRadius="`rounded-4px`"
            :chipText="`초기화`"
            class="border border-gray2 px-3 py-2.5 mr-1 mb-3 bg-black1 text-white"
          />
          <!-- tech buttons -->
          <ChipGeneral
            v-for="(stack, index) in techStacks"
            :key="index"
            :imgName="stack.techName"
            :imgGap="`mr-1`"
            :borderRadius="`rounded-4px`"
            :chipText="stack.chipName"
            class="border border-gray2 px-3 py-2.5 mr-1 mb-3"
          />
          <!-- ET CETERA button -->
          <ChipGeneral
            :borderRadius="`rounded-4px`"
            :chipText="`기타`"
            class="border border-gray2 px-3 py-2.5 mr-1 mb-3"
          />
        </div>
      </div>
    </div>

    <!-- cards list -->
    <div class="flex justify-center mt-12 bg-gray4">
      <div style="width: 786px">
        <!-- filtering button & create study button -->
        <div class="flex items-center justify-between mt-10">
          <div>
            <span class="font-bold text-orange2">전체</span>
            <span class="ml-5">모집중</span>
            <span class="ml-5">모집 완료</span>
          </div>

          <ButtonGeneral
            :width="145"
            :height="44"
            :btnText="`스터디 모집하기`"
            class="font-bold txt-base py-2.5"
          />
        </div>

        <!-- cards list -->
        <div>
          <!-- card -->
          <div class="flex flex-wrap justify-between">
            <div
              v-for="i in 10"
              :key="i"
              style="width: 378px; height: 363px"
              class="p-6 mt-12 bg-white"
            >
              <!-- active status chip & number of people -->
              <div class="flex">
                <ChipGeneral
                  :height="34"
                  :borderRadius="`rounded-8px`"
                  :chipText="`모집중`"
                  class="font-bold bg-green2 text-green3 py-1.5 px-2.5"
                />
                <ChipGeneral
                  :height="34"
                  :borderRadius="`rounded-8px`"
                  :chipText="`4명`"
                  class="bg-gray3 text-gray1 py-1.5 px-3 ml-2"
                />
              </div>
              <!-- card title -->
              <div class="mt-5">
                <p class="txt-mid-bold">
                  같이 스터디하실 분 구해요! 함께 해요! 초보이신 분도 환영 :)
                </p>
              </div>
              <!-- tech logos -->
              <div class="flex mt-12">
                <img
                  v-for="i in 5"
                  :key="`${i}-i`"
                  src="~/assets/imgs/logo/tech/javascript48.png"
                  alt="스택"
                  class="mr-5"
                />
              </div>
              <!-- divider -->
              <div class="mt-16 border border-gray2"></div>
              <!-- nickname & date & number of comments -->
              <div class="flex justify-between mt-4">
                <div class="text-gray6">
                  <span>내이름은 김삼순</span>
                  <span>2022.1.14</span>
                </div>
                <div class="text-gray1">
                  <span>댓글 3</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center">
            <PaginationGeneral class="my-16" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      techStacks: [
        {
          chipName: "자바스크립트",
          techName: "javascript",
        },
        {
          chipName: "타입스크립트",
          techName: "typescript",
        },
        {
          chipName: "리액트",
          techName: "react",
        },
        {
          chipName: "뷰",
          techName: "vue",
        },
        {
          chipName: "자바",
          techName: "java",
        },
        {
          chipName: "스프링",
          techName: "spring",
        },
        {
          chipName: "고",
          techName: "go",
        },
        {
          chipName: "노드JS",
          techName: "nodejs",
        },
        {
          chipName: "C++",
          techName: "c++",
        },
        {
          chipName: "코틀린",
          techName: "kotlin",
        },
        {
          chipName: "장고",
          techName: "django",
        },
        {
          chipName: "플러터",
          techName: "flutter",
        },
        {
          chipName: "스위프트",
          techName: "swift",
        },
        {
          chipName: "next.js",
          techName: "nextjs",
        },
        {
          chipName: "nuxt.js",
          techName: "nuxtjs",
        },
        {
          chipName: "스벨트",
          techName: "svelt",
        },
        {
          chipName: "nest.js",
          techName: "nestjs",
        },
        {
          chipName: "Xd",
          techName: "xd",
        },
        {
          chipName: "제플린",
          techName: "zeplin",
        },
        {
          chipName: "피그마",
          techName: "figma",
        },
      ],
    };
  },
};
</script>
