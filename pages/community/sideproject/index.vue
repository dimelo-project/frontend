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
              :chipText="position.name"
              :bgColor="`bg-yellow1`"
              class="hover:bg-yellow1 hover:border-yellow1 hover:text-black1 border border-gray2 px-2.5 py-2.5 mr-1 text-gray1"
              @click="clickPositionChip(index)"
              :class="{
                'bg-yellow1 text-black1 ': position.selected,
                'hover:bg-gray3 hover:border-gray3 ': !position.selected,
              }"
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
            class="hover:bg-gray3 hover:text-black1 hover:border-gray3 border border-gray2 px-2.5 py-2.5 mr-1 mb-3 bg-black1 text-white"
            @click="clickResetChip"
          />
          <!-- tech buttons -->
          <ChipGeneral
            v-for="(stack, index) in techStacks"
            :key="index"
            :imgName="stack.techName"
            :imgGap="`mr-1`"
            :borderRadius="`rounded-4px`"
            :chipText="stack.chipName"
            @click="clickTechChip(index)"
            :class="{
              'bg-yellow1 text-black1 ': stack.selected,
              'hover:bg-gray3 hover:border-gray3 ': !stack.selected,
            }"
            class="hover:text-black1 border border-gray2 px-2.5 py-2.5 mr-1 mb-3 text-gray1"
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
            <span
              v-for="(status, index) in ativationStatus"
              :key="index"
              @click="clickActivationStatus(status.paramName)"
              class="mr-5 cursor-pointer"
              :class="{
                'text-orange2 font-bold': status.name === cntActivationStatus,
              }"
            >
              {{ status.name }}
            </span>
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
              v-for="(project, index) in projectData"
              :key="index"
              style="width: 378px; height: 471px"
              class="mt-12 bg-white"
            >
              <NuxtLink :to="`/community/sideproject/${project.project_id}`">
                <div class="p-6">
                  <!-- active status chip & number of people chip -->
                  <div class="flex">
                    <!-- active status chip  -->
                    <ChipGeneral
                      :height="34"
                      :borderRadius="`rounded-8px`"
                      :chipText="
                        project.project_ongoing === '모집중'
                          ? '모집중'
                          : '모집 완료'
                      "
                      class="font-bold py-1.5 px-2.5"
                      :class="{
                        'text-green3 bg-green2':
                          project.project_ongoing === '모집중',
                        'text-white bg-gray8':
                          project.project_ongoing === '모집 완료',
                      }"
                    />
                    <!-- number of people chip -->
                    <ChipGeneral
                      :borderRadius="`rounded-8px`"
                      :chipText="`${project.project_participant}명`"
                      class="px-3 ml-2 bg-gray3 text-gray1"
                    />
                  </div>
                  <!-- card title -->
                  <div class="mt-5">
                    <p class="txt-mid-bold">
                      {{ project.project_title }}
                    </p>
                  </div>
                  <!-- position chips || noti message box-->
                  <div
                    v-if="project.project_position"
                    class="flex flex-wrap mt-8"
                  >
                    <ChipGeneral
                      v-for="(position, index) in project.project_position"
                      :key="index"
                      :height="40"
                      :borderRadius="`rounded-8px`"
                      :chipText="position"
                      class="px-3 py-2 mb-4 mr-4 bg-gray3"
                    />
                  </div>
                  <div
                    v-else
                    class="flex items-center justify-center w-full mt-8 bg-gray3 text-gray1 rounded-4px"
                  >
                    <div class="my-5">
                      <div><span>아직 정해진 포지션이 없어요.</span></div>
                      <div><span>글에서 내용을 확인해보세요!</span></div>
                    </div>
                  </div>

                  <!-- tech logos -->
                  <div class="flex mt-12">
                    <img
                      v-for="skill in project.project_skill"
                      :key="skill"
                      :src="require(`~/assets/imgs/logo/tech/${skill}.png`)"
                      alt="스택"
                      class="mr-5"
                    />
                  </div>
                  <!-- divider -->
                  <div class="mt-10 border border-gray2"></div>
                  <!-- nickname & date & number of comments -->
                  <div class="flex justify-between mt-4">
                    <div class="text-gray6">
                      <span>{{ project.user_nickname }}</span>
                      <span>{{ project.project_createdAt }}</span>
                    </div>
                    <div class="text-gray1">
                      <span>댓글 {{ project.project_participant }}</span>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
          <!-- pagination -->
          <div class="flex justify-center">
            <PaginationGeneral :pageIdx="pageIdx" class="my-16" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "community",
  async asyncData({ $axios }) {
    const projectData = await $axios.$get("/api/projects", {
      params: {
        ongoing: "모집중",
        positions: null,
        skills: null,
        page: 1,
        perPage: 10,
      },
    });

    projectData.forEach((elem) => {
      if (elem.project_position) {
        elem.project_position = elem.project_position.split(",");
      }
      if (elem.project_skill) {
        elem.project_skill = elem.project_skill.split(",");
      }
    });

    return { projectData };
  },
  data() {
    return {
      pageIdx: 0,
      projectData: [],
      cntActivationStatus: "전체",
      ativationStatus: [
        {
          id: 0,
          name: "전체",
          paramName: "전체",
        },
        {
          id: 1,
          name: "모집중",
          paramName: "모집중",
        },
        {
          id: 2,
          name: "모집 완료",
          paramName: "모집완료",
        },
      ],
      positions: [
        {
          name: "프론트엔드 개발자",
          posName: "프론트엔드",
          selected: false,
        },
        {
          name: "백엔드 개발자",
          posName: "백엔드",
          selected: false,
        },
        {
          name: "기획자",
          posName: "기획자",
          selected: false,
        },
        {
          name: "디자이너",
          posName: "디자이너",
          selected: false,
        },
        {
          name: "기타 포지션",
          posName: "기타",
          selected: false,
        },
      ],
      techStacks: [
        {
          chipName: "JavaScript",
          techName: "javascript",
          selected: false,
        },
        {
          chipName: "TypeScript",
          techName: "typescript",
          selected: false,
        },
        {
          chipName: "React",
          techName: "react",
          selected: false,
        },
        {
          chipName: "Vue.js",
          techName: "vuejs",
          selected: false,
        },
        {
          chipName: "Java",
          techName: "java",
          selected: false,
        },
        {
          chipName: "Spring",
          techName: "spring",
          selected: false,
        },
        {
          chipName: "Php",
          techName: "php",
          selected: false,
        },
        {
          chipName: "Go",
          techName: "go",
          selected: false,
        },
        {
          chipName: "C++",
          techName: "c++",
          selected: false,
        },
        {
          chipName: "Kotlin",
          techName: "kotlin",
          selected: false,
        },
        {
          chipName: "Python",
          techName: "python",
          selected: false,
        },
        {
          chipName: "Django",
          techName: "django",
          selected: false,
        },
        {
          chipName: "Flutter",
          techName: "flutter",
          selected: false,
        },
        {
          chipName: "Swift",
          techName: "swift",
          selected: false,
        },
        {
          chipName: "Node.js",
          techName: "nodejs",
          selected: false,
        },
        {
          chipName: "Next.js",
          techName: "nextjs",
          selected: false,
        },
        {
          chipName: "Nuxt.js",
          techName: "nuxtjs",
          selected: false,
        },
        {
          chipName: "Svelt",
          techName: "svelt",
          selected: false,
        },
        {
          chipName: "Nest.js",
          techName: "nestjs",
          selected: false,
        },
        {
          chipName: "Xd",
          techName: "xd",
          selected: false,
        },
        {
          chipName: "Zeplin",
          techName: "zeplin",
          selected: false,
        },
        {
          chipName: "Figma",
          techName: "figma",
          selected: false,
        },
      ],
    };
  },
  methods: {
    async getFilterdSideProjects() {
      let selectedSkills = this.techStacks
        .filter((elem) => elem.selected === true)
        .map((elem) => elem.techName)
        .join(",");
      let selectedPositions = this.positions
        .filter((elem) => elem.selected === true)
        .map((elem) => elem.posName)
        .join(",");
      if (selectedPositions === "") {
        selectedPositions = null;
      }
      if (selectedSkills === "") {
        selectedSkills = null;
      }

      // console.log(selectedSkills);

      const projectData = await this.$axios.$get("/api/projects", {
        params: {
          ongoing: this.cntActivationStatus,
          positions: selectedPositions,
          skills: selectedSkills,
          page: 1,
          perPage: 10,
        },
      });

      projectData.forEach((elem) => {
        if (elem.project_position) {
          elem.project_position = elem.project_position.split(",");
        }
        if (elem.project_skill) {
          elem.project_skill = elem.project_skill.split(",");
        }
      });

      this.projectData = projectData;
    },
    clickTechChip(index) {
      this.techStacks[index]["selected"] = !this.techStacks[index]["selected"];
      this.getFilterdSideProjects();
    },
    clickResetChip() {
      this.positions.forEach((elem) => {
        elem.selected = false;
      });
      this.techStacks.forEach((elem) => {
        elem.selected = false;
      });
    },
    clickPositionChip(index) {
      this.positions[index]["selected"] = !this.positions[index]["selected"];
      this.getFilterdSideProjects();
    },
    clickActivationStatus(name) {
      this.cntActivationStatus = name;
      console.log(this.cntActivationStatus);
      this.getFilterdSideProjects();
    },
  },
};
</script>
