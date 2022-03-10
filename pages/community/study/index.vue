<template>
  <div class="mt-16 select-none">
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
            class="border border-gray2 px-2.5 py-2.5 mr-1 mb-3 bg-black1 text-white"
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
            class="border border-gray2 px-2.5 py-2.5 mr-1 mb-3"
            :class="{
              'bg-yellow1 text-black1 ': stack.selected,
              'hover:bg-gray3 hover:border-gray3 ': !stack.selected,
            }"
          />
          <!-- ET CETERA button -->
          <ChipGeneral
            :borderRadius="`rounded-4px`"
            :chipText="`기타`"
            class="border border-gray2 px-2.5 py-2.5 mr-1 mb-3"
          />
        </div>
      </div>
    </div>

    <!-- contents box -->
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

          <NuxtLink to="/community/study/post">
            <ButtonGeneral
              :width="145"
              :height="44"
              class="font-bold text-white bg-orange1 hover:bg-orange2 txt-base py-2.5 rounded-8px"
            >
              <span>스터디 모집하기</span>
            </ButtonGeneral>
          </NuxtLink>
        </div>

        <!-- cards list -->
        <div>
          <div
            v-if="studyData.length > 0"
            class="flex flex-wrap justify-between"
          >
            <!-- card -->
            <div
              v-for="(study, index) in studyData"
              :key="index"
              style="width: 378px; height: 363px"
              class="mt-12 bg-white hover-boxshadow rounded-4px"
            >
              <NuxtLink :to="`/community/study/${study.study_id}`">
                <div class="flex flex-col h-full p-6">
                  <!-- active status chip & number of people -->
                  <div class="flex">
                    <ChipGeneral
                      :height="34"
                      :borderRadius="`rounded-8px`"
                      :chipText="
                        study.study_ongoing === '모집중'
                          ? '모집중'
                          : '모집 완료'
                      "
                      class="font-bold py-1.5 px-2.5"
                      :class="{
                        'text-green3 bg-green2':
                          study.study_ongoing === '모집중',
                        'text-white bg-gray8':
                          study.study_ongoing === '모집완료',
                      }"
                    />
                    <ChipGeneral
                      :height="34"
                      :borderRadius="`rounded-8px`"
                      :chipText="`${study.study_participant}명`"
                      class="bg-gray3 text-gray1 py-1.5 px-3 ml-2"
                    />
                  </div>
                  <!-- card title -->
                  <div class="flex items-center flex-grow mt-5">
                    <p
                      v-if="study['study_title'].length > 35"
                      class="txt-mid-bold"
                    >
                      {{ study.study_title.slice(0, 35) + "..." }}
                    </p>
                    <p v-else class="txt-mid-bold">
                      {{ study.study_title }}
                    </p>
                  </div>
                  <!-- tech logos -->
                  <div class="flex mt-12">
                    <img
                      v-for="skill in study.study_skill.slice(0, 5)"
                      :key="skill"
                      :src="require(`~/assets/imgs/logo/tech/${skill}.png`)"
                      alt="스택"
                      class="mr-5"
                    />
                  </div>
                  <!-- divider -->
                  <div class="mt-16 border border-gray2"></div>
                  <!-- nickname & date & number of comments -->
                  <div class="flex justify-between mt-4">
                    <div class="text-gray6">
                      <span>{{ study.user_nickname }}</span>
                      <span>{{ study.project_createdAt }}</span>
                    </div>
                    <div class="text-gray1">
                      <span>댓글 {{ study.num_comment }}</span>
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
</template>

<script>
export default {
  layout: "community",
  middleware({ redirect, query }) {
    if (Object.entries(query).length === 0) {
      return redirect("/community/study", {
        perPage: 16,
        page: 1,
      });
    }
  },
  async asyncData({ $axios, query }) {
    const { ongoing, skills, page } = query;

    // 최종 param data 생성
    let paramData = {};
    if (ongoing) {
      paramData["ongoing"] = ongoing;
    }
    if (skills) {
      paramData["skills"] = skills;
    }
    paramData["perPage"] = 16;
    paramData["page"] = page;

    // param에 맞는 study data 요청
    const studyData = await $axios.$get("/api/studies", {
      params: paramData,
    });

    studyData.forEach((elem) => {
      if (elem.study_skill) {
        elem.study_skill = elem.study_skill.split(",");
      }
    });
    // console.log("studyData", studyData);

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

    let cntActivationStatus;
    if (ongoing) {
      cntActivationStatus = ongoing;
    } else {
      cntActivationStatus = "전체";
    }

    let pageIdx = page - 1;

    let totalPageNum;
    const totalPageNumResponse = await $axios.$get(`/api/studies/count`);
    if (totalPageNumResponse) {
      totalPageNum = Math.ceil(Number(totalPageNumResponse["num_study"]) / 16);
    }

    return {
      studyData,
      ativationStatus,
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
      const { ongoing, skills } = to.query;

      // 최종 param data 생성
      let paramData = {};
      if (ongoing) {
        paramData["ongoing"] = ongoing;
      }
      if (skills) {
        paramData["skills"] = skills;
      }
      paramData["perPage"] = 16;
      paramData["page"] = 1;

      // param에 맞는 study data 요청
      let response = await this.$axios.$get("/api/studies", {
        params: paramData,
      });

      response.forEach((elem) => {
        if (elem.study_skill) {
          elem.study_skill = elem.study_skill.split(",");
        }
      });
      this.studyData = response;

      //data처리
      if (ongoing) {
        this.cntActivationStatus = ongoing;
      } else {
        this.cntActivationStatus = "전체";
      }

      if (!skills) {
        this.techStacks.forEach((elem) => {
          elem.selected = false;
        });
      }
    },
  },
  methods: {
    async routerPushWithNewQuery() {
      // skills query data 생성
      let selectedSkills = this.techStacks
        .filter((elem) => elem.selected === true)
        .map((elem) => elem.techName)
        .join(",");

      // 최종 query data 생성
      let queryData = {};
      if (this.cntActivationStatus !== "전체") {
        queryData["ongoing"] = this.cntActivationStatus;
      }
      if (selectedSkills !== "") {
        queryData["skills"] = selectedSkills;
      }
      queryData["perPage"] = 16;
      queryData["page"] = this.pageIdx + 1;

      // query payload와 함께 router push
      this.$router.push({
        path: "/community/study",
        query: queryData,
      });
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
    ScrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    scrollHandler() {
      console.log(window.scrollY);
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
