<template>
  <div>
    <!-- top content -->
    <div class="flex justify-center">
      <div style="width: 786px">
        <!-- select position box -->
        <div>
          <div class="flex">
            <img
              src="~/assets/imgs/emoji/person1.png"
              alt="포지션선택"
              style="width: 24px; height: 24px"
            />
            <p class="ml-2">찾고 있는 포지션으로 필터링 해보세요.</p>
          </div>
          <div class="flex mt-4">
            <ChipGeneral
              v-for="(position, index) in positions"
              :key="index"
              :borderRadius="`rounded-4px`"
              :chipText="position"
              class="border border-gray2 px-2.5 py-2.5 mr-1 text-gray1"
            />
          </div>
        </div>

        <!-- select tech box -->
        <div class="flex mt-10">
          <img
            src="~assets/imgs/emoji/pincher.png"
            style="width: 24px; height: 24px"
          />
          <p class="ml-2">사용하는 기술로 필터링 해보세요.</p>
        </div>

        <!-- tech stack logo chips -->
        <div class="flex flex-wrap mt-4">
          <!-- reset button -->
          <ChipGeneral
            :borderRadius="`rounded-4px`"
            :chipText="`초기화`"
            class="border border-gray2 px-2.5 py-2.5 mr-1 mb-3 bg-black1 text-white"
          />
          <!-- tech buttons -->
          <ChipGeneral
            v-for="(stack, index) in techStacks"
            :key="index"
            :imgName="stack.techName"
            :imgGap="`mr-1`"
            :borderRadius="`rounded-4px`"
            :chipText="stack.chipName"
            class="border border-gray2 px-2.5 py-2.5 mr-1 mb-3 text-gray1"
          />
          <!-- ET CETERA button -->
          <ChipGeneral
            :borderRadius="`rounded-4px`"
            :chipText="`기타`"
            class="border border-gray2 px-2.5 py-2.5 mr-1 mb-3 text-gray1"
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
            :btnText="`프로젝트 모집하기`"
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
              style="width: 378px; height: 471px"
              class="mt-12 bg-white"
            >
              <NuxtLink :to="`/community/sideproject/${i}`">
                <div class="p-6">
                  <!-- active status chip  -->
                  <div class="flex">
                    <ChipGeneral
                      :height="34"
                      :borderRadius="`rounded-8px`"
                      :chipText="`모집중`"
                      class="font-bold bg-green2 text-green3 py-1.5 px-2.5"
                    />
                  </div>
                  <!-- card title -->
                  <div class="mt-5">
                    <p class="txt-mid-bold">
                      같이 프로젝트 하실 분 구해요! 함께 해요! 서비스 런칭
                      하실분 구합니다 ~~
                    </p>
                  </div>
                  <!-- position chips -->
                  <div class="flex flex-wrap mt-8">
                    <ChipGeneral
                      v-for="(position, index) in positions"
                      :key="index"
                      :height="40"
                      :borderRadius="`rounded-8px`"
                      :chipText="position"
                      class="px-3 py-2 mb-4 mr-4 bg-gray3"
                    />
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
                  <div class="mt-10 border border-gray2"></div>
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
              </NuxtLink>
            </div>
          </div>
          <!-- pagination -->
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
  layout: "community",
  data() {
    return {
      positions: ["프론트엔드 개발자", "백엔드 개발자", "기획자", "디자이너"],
      techStacks: [
        {
          chipName: "JavaScript",
          techName: "javascript",
        },
        {
          chipName: "TypeScript",
          techName: "typescript",
        },
        {
          chipName: "React",
          techName: "react",
        },
        {
          chipName: "Vue.js",
          techName: "vue",
        },
        {
          chipName: "Java",
          techName: "java",
        },
        {
          chipName: "Spring",
          techName: "spring",
        },
        {
          chipName: "Php",
          techName: "php",
        },
        {
          chipName: "Go",
          techName: "go",
        },
        {
          chipName: "C++",
          techName: "c++",
        },
        {
          chipName: "Kotlin",
          techName: "kotlin",
        },
        {
          chipName: "Python",
          techName: "python",
        },
        {
          chipName: "Django",
          techName: "django",
        },
        {
          chipName: "Flutter",
          techName: "flutter",
        },
        {
          chipName: "Swift",
          techName: "swift",
        },
        {
          chipName: "Node.js",
          techName: "nodejs",
        },
        {
          chipName: "Next.js",
          techName: "nextjs",
        },
        {
          chipName: "Nuxt.js",
          techName: "nuxtjs",
        },
        {
          chipName: "Svelt",
          techName: "svelt",
        },
        {
          chipName: "Nest.js",
          techName: "nestjs",
        },
        {
          chipName: "Xd",
          techName: "xd",
        },
        {
          chipName: "Zeplin",
          techName: "zeplin",
        },
        {
          chipName: "Figma",
          techName: "figma",
        },
      ],
    };
  },
};
</script>
