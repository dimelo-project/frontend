<template>
  <keep-alive>
    <div class="mt-16 select-none">
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
                v-for="(position, index) in positionsData"
                :key="index"
                :borderRadius="`rounded-4px`"
                :chipText="position.name"
                :bgColor="`bg-yellow1`"
                class="hover:bg-yellow1 hover:border-yellow1 hover:text-black1 border border-gray2 px-2.5 py-2.5 mr-1 text-gray1 transition-colors"
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
              class="hover:bg-gray3 hover:text-black1 hover:border-gray3 border border-gray2 px-2.5 py-2.5 mr-1 mb-3 bg-black1 text-white transition-colors"
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
              class="hover:text-black1 border border-gray2 px-2.5 py-2.5 mr-1 mb-3 text-gray1 transition-colors"
            />
            <!-- ET CETERA button -->
            <ChipGeneral
              :borderRadius="`rounded-4px`"
              :chipText="`기타`"
              class="border border-gray2 px-2.5 py-2.5 mr-1 mb-3 text-gray1 transition-colors"
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

            <NuxtLink to="/community/sideproject/post">
              <ButtonGeneral
                :width="145"
                :height="44"
                class="font-bold txt-base py-2.5 bg-orange1 hover:bg-orange2 rounded-8px text-white"
              >
                <span>프로젝트 모집하기</span>
              </ButtonGeneral></NuxtLink
            >
          </div>

          <!-- cards list -->
          <div>
            <!-- card -->
            <div
              v-if="projectData.length > 0"
              class="flex flex-wrap justify-between"
            >
              <div
                v-for="(project, index) in projectData"
                :key="index"
                style="width: 378px; height: 471px"
                class="mt-12 bg-white hover-boxshadow"
              >
                <NuxtLink :to="`/community/sideproject/${project.project_id}`">
                  <div class="flex flex-col h-full p-6">
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
                    </div>
                    <!-- card title -->
                    <div class="flex items-center flex-grow mt-5">
                      <p
                        v-if="project.project_title.length < 40"
                        class="txt-mid-bold"
                      >
                        {{ project.project_title }}
                      </p>
                      <p v-else class="txt-mid-bold">
                        {{ project.project_title.slice(0, 40) + "..." }}
                      </p>
                    </div>
                    <!-- position chips || noti message box-->
                    <div
                      v-if="project.project_position"
                      class="flex flex-wrap items-center flex-grow mt-8"
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
                      class="flex items-center justify-center flex-grow w-full mt-4 bg-gray3 text-gray1 rounded-4px"
                    >
                      <div class="my-5">
                        <div><span>아직 정해진 포지션이 없어요.</span></div>
                        <div><span>글에서 내용을 확인해보세요!</span></div>
                      </div>
                    </div>

                    <!-- tech logos -->
                    <div class="flex mt-8">
                      <img
                        v-for="skill in project.project_skill.slice(0, 5)"
                        :key="skill"
                        :src="requireTechLogoImg(skill)"
                        alt="스택"
                        class="object-contain mr-5"
                        style="width: 44px; height: 44px"
                        draggable="false"
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
                        <span>댓글 {{ project.num_comment }}</span>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <div v-else class="flex items-center justify-center h-80">
              <span class="txt-mid-bold">검색결과가 없습니다.</span>
            </div>
            <!-- pagination -->
            <div class="flex justify-center">
              <PaginationGeneral
                :pageIdx="pageIdx"
                :pageNum="totalPageNum"
                @click="clickPaginationBtn"
                class="my-16"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- scroll to top button -->
      <transition name="fade">
        <div
          v-if="isUserScrolling"
          class="fixed flex justify-end invisible xl:visible"
          style="left: calc(50% - 545px + 87px); bottom: 100px"
          @click="ScrollToTop"
        >
          <ScrollToTop />
        </div>
      </transition>
    </div>
  </keep-alive>
</template>

<script>
export default {
  layout: "community",
  middleware({ redirect, query }) {
    if (Object.entries(query).length === 0) {
      return redirect("/community/sideproject", {
        perPage: 16,
        page: 1,
      });
    }
  },
  async asyncData({ $axios, query }) {
    const { ongoing, positions, skills, page, perPage } = query;

    // 최종 param data 생성
    let paramData = {};
    if (ongoing) {
      paramData["ongoing"] = ongoing;
    }
    if (positions) {
      paramData["positions"] = positions;
    }
    if (skills) {
      paramData["skills"] = skills;
    }
    paramData["perPage"] = perPage;
    paramData["page"] = page;

    // param에 맞는 project data 요청
    const projectData = await $axios.$get("/api/projects", {
      params: paramData,
    });

    projectData.forEach((elem) => {
      if (elem.project_position) {
        elem.project_position = elem.project_position.split(",");
      }
      if (elem.project_skill) {
        elem.project_skill = elem.project_skill.split(",");
      }
    });
    console.log("projectData", projectData);

    // data값들 반환

    let ativationStatus = [
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
        name: "모집완료",
        paramName: "모집완료",
      },
    ];

    // 현재 선택된 포지션 표시하기
    let positionsData = [
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
    ];
    let positionArr = [];
    if (positions) {
      positionArr = positions.split(",");
      while (positionArr.length > 0) {
        let elem = positionArr.pop();
        for (let i = 0; i < positionsData.length; i++) {
          if (elem === positionsData[i]["posName"]) {
            positionsData[i]["selected"] = true;
            continue;
          }
        }
      }
    }

    // 현재 선택된 기술스택 표시하기
    let techStacks = [
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
        chipName: "Svelte",
        techName: "svelte",
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
    ];
    let skillsArr = [];
    if (skills) {
      skillsArr = skills.split(",");
      while (skillsArr.length > 0) {
        let elem = skillsArr.pop();
        for (let i = 0; i < techStacks.length; i++) {
          if (elem === techStacks[i]["techName"]) {
            techStacks[i]["selected"] = true;
            continue;
          }
        }
      }
    }

    // 현재 모집여부 가져오기
    let cntActivationStatus;
    if (ongoing) {
      cntActivationStatus = ongoing;
    } else {
      cntActivationStatus = "전체";
    }

    // 현재 페이지 가져오기
    let pageIdx = page - 1;

    // 최종 count param data 생성
    let countParamData = {};
    if (ongoing) {
      countParamData["ongoing"] = ongoing;
    }
    if (positions) {
      countParamData["positions"] = positions;
    }
    if (skills) {
      countParamData["skills"] = skills;
    }

    // 전체 페이지 수 가져오기
    let totalPageNum;
    const totalPageNumResponse = await $axios.$get(`/api/projects/count`, {
      params: countParamData,
    });
    if (totalPageNumResponse) {
      totalPageNum = Math.ceil(
        Number(totalPageNumResponse["num_project"]) / perPage
      );
    }

    return {
      projectData,
      ativationStatus,
      positionsData,
      techStacks,
      cntActivationStatus,
      pageIdx,
      totalPageNum,
    };
  },
  data() {
    return {
      isUserScrolling: false,
    };
  },
  watch: {
    async $route(to, from) {
      const { ongoing, positions, skills, page, perPage } = to.query;

      // 최종 param data 생성
      let paramData = {};
      if (ongoing) {
        paramData["ongoing"] = ongoing;
      }
      if (positions) {
        paramData["positions"] = positions;
      }
      if (skills) {
        paramData["skills"] = skills;
      }
      paramData["perPage"] = perPage;
      paramData["page"] = page;

      // param에 맞는 project data 요청
      let response = await this.$axios.$get("/api/projects", {
        params: paramData,
      });

      response.forEach((elem) => {
        if (elem.project_position) {
          elem.project_position = elem.project_position.split(",");
        }
        if (elem.project_skill) {
          elem.project_skill = elem.project_skill.split(",");
        }
      });
      this.projectData = response;

      console.log("projectData", this.projectData);

      //data처리
      if (ongoing) {
        this.cntActivationStatus = ongoing;
      } else {
        this.cntActivationStatus = "전체";
      }

      // position selected false로 모두 초기화
      this.positionsData.forEach((elem) => {
        elem.selected = false;
      });

      // position query에 따른 선택된 position 설정
      if (positions) {
        let positionArr = [];

        positionArr = positions.split(",");
        while (positionArr.length > 0) {
          let elem = positionArr.pop();

          for (let i = 0; i < this.positionsData.length; i++) {
            if (elem === this.positionsData[i]["posName"]) {
              this.positionsData[i]["selected"] = true;
              continue;
            }
          }
        }
      }

      // tech selected false로 모두 초기화
      this.techStacks.forEach((elem) => {
        elem.selected = false;
      });

      // tech query에 따른 선택된 skill 설정
      if (skills) {
        let skillsArr = [];

        skillsArr = skills.split(",");
        while (skillsArr.length > 0) {
          let elem = skillsArr.pop();

          for (let i = 0; i < this.techStacks.length; i++) {
            if (elem === this.techStacks[i]["techName"]) {
              this.techStacks[i]["selected"] = true;
              continue;
            }
          }
        }
      }

      // page query에 따른 pageIdx 설정
      this.pageIdx = page - 1;

      // count param data 생성
      let countParamData = {};
      if (ongoing) {
        countParamData["ongoing"] = ongoing;
      }
      if (positions) {
        countParamData["positions"] = positions;
      }
      if (skills) {
        countParamData["skills"] = skills;
      }
      countParamData["perPage"] = perPage;

      // 페이지 개수 가져오기
      const totalPageNumResponse = await this.$axios.$get(
        `/api/projects/count`,
        {
          params: countParamData,
        }
      );
      if (totalPageNumResponse) {
        this.totalPageNum = Math.ceil(
          Number(totalPageNumResponse["num_project"]) / perPage
        );
      }
    },
  },
  methods: {
    async routerPushWithNewQuery() {
      // postions, skills query data 생성
      let selectedPositions = this.positionsData
        .filter((elem) => elem.selected === true)
        .map((elem) => elem.posName)
        .join(",");
      let selectedSkills = this.techStacks
        .filter((elem) => elem.selected === true)
        .map((elem) => elem.techName)
        .join(",");

      // 최종 query data 생성
      let queryData = {};
      if (this.cntActivationStatus !== "전체") {
        queryData["ongoing"] = this.cntActivationStatus;
      }
      if (selectedPositions !== "") {
        queryData["positions"] = selectedPositions;
      }
      if (selectedSkills !== "") {
        queryData["skills"] = selectedSkills;
      }
      queryData["perPage"] = 16;
      queryData["page"] = this.pageIdx + 1;

      // query payload와 함께 router push
      this.$router.push({
        path: "/community/sideproject",
        query: queryData,
      });
    },
    clickPositionChip(index) {
      this.pageIdx = 0;
      this.positionsData[index]["selected"] =
        !this.positionsData[index]["selected"];
      this.routerPushWithNewQuery();
    },
    clickTechChip(index) {
      this.pageIdx = 0;
      this.techStacks[index]["selected"] = !this.techStacks[index]["selected"];
      this.routerPushWithNewQuery();
    },
    clickResetChip() {
      // this.positions.forEach((elem) => {
      //   elem.selected = false;
      // });
      this.pageIdx = 0;
      this.techStacks.forEach((elem) => {
        elem.selected = false;
      });
      this.routerPushWithNewQuery();
    },
    clickActivationStatus(name) {
      this.pageIdx = 0;
      this.cntActivationStatus = name;
      this.routerPushWithNewQuery();
    },
    clickPaginationBtn(selectedPageIdx) {
      this.pageIdx = selectedPageIdx;
      this.routerPushWithNewQuery();
      this.ScrollToTop();
    },
    requireTechLogoImg(skill) {
      try {
        return require(`~/assets/imgs/logo/tech/${skill}.png`);
      } catch (err) {
        console.error(err.response);
      }
    },
    ScrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    scrollHandler() {
      // console.log(window.scrollY);
      if (window.scrollY > 500) {
        this.isUserScrolling = true;
      } else {
        this.isUserScrolling = false;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandler);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
};
</script>

<style lang="postcss" scoped>
.hover-boxshadow:hover {
  box-shadow: 0px 2px 20px rgba(25, 25, 25, 0.05);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
