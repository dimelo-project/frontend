<template>
  <div class="select-none">
    <!-- first -->
    <div
      style=""
      class="flex items-center justify-center pt-10 pb-24 bg-yellow1"
    >
      <div
        style="width: 1150px; height: 314px"
        class="flex items-center justify-between"
      >
        <div class="">
          <div>
            <!-- prettier-ignore -->
            <span style="font-size: 36px;font-weight: 700">
              당신의 경험,<br />
              옆사람에게 말해주세요
            </span>
          </div>
          <div class="mt-11">
            <span style="font-size: 28px; font-weight: 400"
              >IT 수강평 공유 & 팀 빌딩 커뮤니티</span
            >
          </div>
          <div class="mt-2">
            <span class="txt-mid-bold">디멜로</span
            ><span class="txt-mid">에게 말해주세요</span>
          </div>
        </div>
        <div class="relative" style="width: 666px; height: 314px">
          <img
            src="~/assets/imgs/banner/main.gif"
            alt="함께공부하기"
            style="width: 666px; height: 314px"
            class="absolute top-0 left-0"
            draggable="false"
          />
        </div>
      </div>
    </div>

    <!-- second -->
    <div
      style="height: 512px"
      class="flex items-center justify-center bg-gray4"
    >
      <div class="grid grid-cols-3 gap-15">
        <NuxtLink to="/lecture">
          <div
            @mouseover="LectureBannerHover = true"
            @mouseleave="LectureBannerHover = false"
            class="flex flex-col items-center justify-center transition duration-300 bg-white cursor-pointer rounded-8px hover:ring-2 hover:ring-yellow1 hover:ring-inset1"
            style="width: 276px; height: 400px"
          >
            <span class="txt-mid-bold">솔직한 강의리뷰</span>
            <div class="relative mt-8" style="width: 200px; height: 200px">
              <img
                src="~/assets/imgs/banner/lecture.png"
                alt="강의리뷰"
                style="width: 200px; height: 200px"
                class="absolute top-0 left-0"
                :class="{ 'opacity-0': LectureBannerHover }"
                draggable="false"
              />
              <img
                src="~/assets/imgs/banner/lecture.gif"
                alt="강의리뷰"
                style="width: 200px; height: 200px"
                class="absolute top-0 left-0"
                :class="{ 'opacity-0': !LectureBannerHover }"
                draggable="false"
              />
            </div>
            <span class="mt-10 text-center text-orange2"
              >개발, 데이터 과학, 디자인<br />
              인강/현장강의 찐리뷰</span
            >
          </div>
        </NuxtLink>

        <NuxtLink to="/community/study">
          <div
            @mouseover="StudyBannerHover = true"
            @mouseleave="StudyBannerHover = false"
            class="flex flex-col items-center justify-center transition duration-300 bg-white cursor-pointer rounded-8px hover:ring-2 hover:ring-yellow1 hover:ring-inset1"
            style="width: 276px; height: 400px"
          >
            <span class="txt-mid-bold">스터디 모집</span>
            <div class="relative mt-8" style="width: 200px; height: 200px">
              <img
                src="~/assets/imgs/banner/study.png"
                alt="강의리뷰"
                style="width: 200px; height: 200px"
                class="absolute top-0 left-0"
                :class="{ 'opacity-0': StudyBannerHover }"
                draggable="false"
              />
              <img
                src="~/assets/imgs/banner/study.gif"
                alt="강의리뷰"
                style="width: 200px; height: 200px"
                class="absolute top-0 left-0"
                :class="{ 'opacity-0': !StudyBannerHover }"
                draggable="false"
              />
            </div>
            <span class="mt-10 text-center text-orange2"
              >당신을 책상에 앉혀줄<br />
              스터디원이 대기중입니다</span
            >
          </div>
        </NuxtLink>

        <NuxtLink to="/community/sideproject">
          <div
            @mouseover="ProjectBannerHover = true"
            @mouseleave="ProjectBannerHover = false"
            class="flex flex-col items-center justify-center transition duration-300 bg-white cursor-pointer rounded-8px hover:ring-2 hover:ring-yellow1 hover:ring-inset1"
            style="width: 276px; height: 400px"
          >
            <span class="txt-mid-bold">사이드 프로젝트</span>
            <div class="relative mt-8" style="width: 200px; height: 200px">
              <img
                src="~/assets/imgs/banner/project.png"
                alt="강의리뷰"
                style="width: 200px; height: 200px"
                class="absolute top-0 left-0"
                :class="{ 'opacity-0': ProjectBannerHover }"
                draggable="false"
              />
              <img
                src="~/assets/imgs/banner/project.gif"
                alt="강의리뷰"
                style="width: 200px; height: 200px"
                class="absolute top-0 left-0"
                :class="{ 'opacity-0': !ProjectBannerHover }"
                draggable="false"
              />
            </div>
            <span class="mt-10 text-center text-orange2"
              >아직도 토이 프로젝트해?<br />
              서비스 배포까지!</span
            >
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- third -->
    <div style="height: 539px" class="flex items-center justify-center">
      <div style="width: 1170px" class="flex justify-between">
        <div class="" style="font-size: 28px; font-weight: 400">
          <span>
            개발·데이터·디자인<br />
            원고료 없이 작성된<br />
            진짜 리뷰들
          </span>
        </div>

        <!-- carousel -->
        <div style="width: 786px; height: 347px" class="">
          <Slider />
        </div>
      </div>
    </div>

    <!-- 4th -->
    <div
      style="height: 539px"
      class="flex items-center justify-center bg-gray4"
    >
      <div style="width: 1170px" class="flex justify-between">
        <div>
          <div style="font-size: 28px; font-weight: 400">
            <span>
              탈주 안 할<br />
              스터디원 모집중
            </span>
          </div>

          <NuxtLink to="/community/study">
            <div class="mt-4">
              <span class="pb-1 border-b-1px border-orange2">
                <span class="txt-base-bold text-orange2">더보기</span>
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- card -->
        <div style="width: 786px" class="flex items-center justify-between">
          <div
            v-for="(study, index) in studyData"
            :key="index"
            style="width: 378px; height: 363px"
            class="transition bg-white rounded-4px hover-boxshadow"
          >
            <NuxtLink :to="`/community/study/${study.study_id}`">
              <div class="flex flex-col h-full p-6">
                <!-- active status chip & number of people -->
                <div class="flex">
                  <ChipGeneral
                    :height="34"
                    :borderRadius="`rounded-8px`"
                    :chipText="
                      study.study_ongoing === '모집중' ? '모집중' : '모집 완료'
                    "
                    class="font-bold py-1.5 px-2.5"
                    :class="{
                      'text-green3 bg-green2': study.study_ongoing === '모집중',
                      'text-white bg-gray8':
                        study.study_ongoing === '모집 완료',
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
                  <p class="txt-mid-bold">
                    {{ study.study_title }}
                  </p>
                </div>
                <!-- tech logos -->
                <div class="flex mt-12">
                  <img
                    v-for="skill in study.study_skill"
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
                    <span class="ml-3">{{ study.study_createdAt }}</span>
                  </div>
                  <div class="text-gray1">
                    <span>댓글 {{ study.num_comment }}</span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="h-2 bg-white"></div>

    <!-- 5th -->
    <div
      style="height: 663px"
      class="flex items-center justify-center bg-gray4"
    >
      <div style="width: 1170px" class="flex justify-between">
        <div>
          <div style="font-size: 28px; font-weight: 400">
            <span>
              당신을 기다리고<br />
              있을지도 모르는<br />
              프로젝트
            </span>
          </div>

          <NuxtLink to="/community/sideproject">
            <div class="mt-4">
              <span class="pb-1 border-b-1px border-orange2">
                <span class="txt-base-bold text-orange2">더보기</span>
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- card -->
        <div style="width: 786px" class="flex justify-between">
          <div
            v-for="(project, index) in projectData"
            :key="index"
            style="width: 378px; height: 471px"
            class="bg-white rounded-4px hover-boxshadow"
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
                  <p class="txt-mid-bold">
                    {{ project.project_title }}
                  </p>
                </div>
                <!-- position chips || noti message box-->
                <div class="flex items-center flex-grow">
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
                </div>

                <!-- tech logos -->
                <div class="flex mt-12">
                  <img
                    v-for="skill in project.project_skill.slice(0, 5)"
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
                    <span>댓글 {{ project.num_comment }}</span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div
      style="height: 160px"
      class="flex items-center justify-center bg-white border-t border-gray2"
    >
      <div style="width: 1194px">
        <div class="flex justify-between">
          <div>
            <span
              @click="$router.push('/terms')"
              class="cursor-pointer txt-sub text-black1"
              >서비스 이용약관</span
            >
            <span
              @click="$router.push('/privacy')"
              class="ml-4 cursor-pointer txt-sub-bold text-black1"
              >개인정보취급방침</span
            >
            <span class="ml-4 cursor-pointer txt-sub-bold text-orange2"
              >강의등록/리뷰작성</span
            >
          </div>
          <div>
            <span class="text-black1"
              ><span class="txt-sub-bold">문의</span> Dimelo@gmail.com</span
            >
          </div>
        </div>
        <div>
          <span class="txt-mini text-black1">Copyright © Dimelo Inc.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async middleware({ store, $axios }) {
    store.commit("changeHeaerBgColor", "rgba(255, 224, 102, 1)");
    // if (!(store && store.state && store.state.user)) {
    //   let userData = {};

    //   try {
    //     userData = await $axios.$get("/api/users/me");

    //     if (userData) {
    //       store.commit("auth/SET", { key: "user", value: userData });
    //       store.commit("auth/SET", { key: "loggedIn", value: true });
    //     }
    //     console.log(userData);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  },
  layout: "home",
  data() {
    return {
      LectureBannerHover: false,
      StudyBannerHover: false,
      ProjectBannerHover: false,
      studyData: [
        {
          study_id: 2,
          study_title:
            "HTTP/HTTPS 같이 공부할 팀원분 구합니다 ~! 소수정예 멤버 구해요 :)",
          study_content:
            "안녕하세요\n" +
            "\n" +
            "HTTP/HTTPS 같이 공부할 팀원을 구하고자 합니다!\n" +
            "\n" +
            '선배분들께 물어봤는데 "HTTP/HTTPS 완벽 가이드" 책 추천을 많이 받아서\n' +
            "\n" +
            "이 책으로 한챕터씩 공부해가면서 번갈아 발표하고 서로 지식 정리, 교환 하면 좋을 거 같습니다!\n" +
            "\n" +
            "너무 잘하실 필요는 없지만 웹 프로젝트 만들어보고 배포경험 정도있으신 분이면 적당할듯합니다.\n" +
            "\n" +
            "(저도 못합니다 ㅎㅎ)\n" +
            "\n" +
            "구체적으로 진행 방식이 아직 정해진건 아니구요 ~\n" +
            "\n" +
            "같이 정하면 될 거 같습니다 :)\n" +
            "\n" +
            "관심있으신 분 연락주세요",
          study_ongoing: "모집중",
          study_participant: 3,
          user_nickname: "코딩하는고양이",
          study_createdAt: "2022.03.19 ",
          num_comment: "2",
          study_skill: ["javascript", "etc"],
        },
        {
          study_id: 10,
          study_title: "C++ 알고리즘 스터디원 모집. 백준 골드이상",
          study_content: "C++ 알고리즘 스터디원 모집. 백준 골드이상",
          study_ongoing: "모집중",
          study_participant: 3,
          user_nickname: "한입남은도너츠",
          study_createdAt: "2022.03.28",
          num_comment: "1",
          study_skill: ["c++"],
        },
      ],
      projectData: [
        {
          project_id: 5,
          project_title: "같이 데이팅 앱 만들사람!",
          project_content: "4분 모셔요 ~!",
          project_ongoing: "모집중",
          user_nickname: "코딩하는고양이",
          project_createdAt: "2022.03.25 ",
          num_comment: "0",
          project_skill: ["react", "vuejs", "django", "zeplin"],
          project_position: ["기획자", "디자이너", "백엔드", "프론트엔드"],
        },
        {
          project_id: 1,
          project_title: "디멜로 프로젝트 하실 프론트, 디자이너 구합니다!",
          project_content:
            "디멜로 프로젝트 하실 프론트1분 디자이너 2분 모십니다 ~~~\n" +
            "\n" +
            "현재 백엔드 저 하나 있는 상황입니다.\n" +
            "\n" +
            "프론트는 vue나 react사용하시면 되고 백엔드는 nest.js 사용예정 입니다!\n" +
            "\n" +
            "프론트 분은 next나 nuxt도 사용하실 줄 알면 더 좋을 것 같습니다 !!\n" +
            "\n" +
            "디자이너 분은 피그마도 괜찮고 xd도 괜찮습니다 ~~\n" +
            "\n" +
            "관심 있는 분들 댓글 남겨 주세요 ㅎㅎ",
          project_ongoing: "모집중",
          user_nickname: "Avery",
          project_createdAt: "2022.03.19 ",
          num_comment: "4",
          project_skill: ["react", "vuejs", "nextjs", "nuxtjs", "xd", "figma"],
          project_position: ["디자이너", "프론트엔드"],
        },
      ],
    };
  },
  methods: {
    scrollHandler() {
      if (window.scrollY >= 0 && window.scrollY <= 150) {
        this.$store.commit("changeHeaerBgColor", "rgba(255, 224, 102, 1)");
      } else if (window.scrollY <= 460) {
        this.$store.commit("changeHeaerBgColor", "rgba(255, 224, 102, 0.7)");
      } else {
        this.$store.commit("changeHeaerBgColor", "rgba(255, 255, 255, 0.7");
      }
    },
  },
  async mounted() {
    window.addEventListener("scroll", this.scrollHandler);

    if (!(this.$auth && this.$auth.user)) {
      let userData = {};

      try {
        userData = await this.$axios.$get("/api/users/me");

        // console.log(userData);
        if (userData) {
          this.$auth.setUser(userData);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  destroyed() {
    this.$store.commit("changeHeaerBgColor", "rgba(255, 255, 255, 1)");
    window.removeEventListener("scroll", this.scrollHandler);
  },
};
</script>

<style lang="postcss" scoped>
.test {
  @apply border border-purple-900;
}
.hover-boxshadow:hover {
  box-shadow: 0px 2px 20px rgba(25, 25, 25, 0.05);
}
</style>
