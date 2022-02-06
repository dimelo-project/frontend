<template>
  <div class="flex justify-center select-none bg-gray4">
    <div>
      <!-- tutor name & rate -->
      <div
        style="width: 828px"
        class="flex justify-between pt-10 pb-12 mt-10 bg-white px-18 clex test rounded-8px"
      >
        <!-- left side box -->
        <div class="" style="width: 240px">
          <div>
            <span class="txt-sub">강사</span>
          </div>
          <div class="mt-1">
            <span class="txt-heading3">{{
              tutorInfoData["instructor_name"]
            }}</span>
          </div>
          <div class="flex items-center mt-6">
            <StarRate class="mr-1" :score="tutorInfoData['avg']" />
            <span class="txt-mid-bold">
              {{ tutorInfoData["avg"] }}
              <span class="txt-mini">
                ({{ totalNumOfTutorReview["num_review"] }})
              </span>
            </span>
          </div>
        </div>
        <!-- right side box -->
        <div class="flex items-center" style="width: 365px">
          <div>
            <div
              v-for="(item, idx) in questionList"
              :key="idx"
              class="flex items-center"
              :class="{ 'mb-2': idx !== 3 }"
            >
              <img
                src="~/assets/imgs/icon/ellipse.png"
                style="width: 6px; height: 6px"
                draggable="false"
              />
              <span class="ml-2 txt-sub" style="width: 96px">
                {{ item.question }}
              </span>
              <PlainProgressBar class="ml-3" :score="Number(item.score)" />
              <SvgReviewStar class="ml-2" />
              <span class="ml-1 txt-sub-bold">{{ item.score }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- tutor's lectures -->
      <div class="mt-3 bg-white rounded-8px py-14 px-18 test">
        <span class="txt-mid-bold">
          등록된 강의
          <span class="text-orange2">
            {{ totalNumOfTutorLecture["num_course"] }}개
          </span>
        </span>
        <!-- lecture card data -->
        <div
          v-for="(lecture, lectureIdx) in tutorLectureData"
          :key="lectureIdx"
          class="flex mt-10"
          style="width: 684px"
        >
          <!-- site logo -->
          <div class="bg-gray1 rounded-8px" style="width: 69px; height: 69px">
            <img
              class="max-w-none"
              :src="cardImageLogo(lecture['course_platform'])"
              alt="강의사이트"
            />
          </div>

          <div class="flex-grow">
            <!-- first line -->
            <div class="flex justify-between flex-grow mt-1 ml-6">
              <span class="txt-base-bold" style="width: 375px">{{
                lecture["course_title"]
              }}</span>
              <div class="flex items-center">
                <StarRate :score="lecture['course_avg']" />
                <span class="ml-1 txt-base-bold"
                  >{{ lecture["course_avg"] }}
                </span>
                <span class="txt-mini">({{ lecture["num_review"] }})</span>
              </div>
            </div>
            <!-- second line -->
            <div
              class="flex justify-between items-center flex-grow ml-6 mt-1.5"
            >
              <div>
                <!-- <span class="underline txt-sub-bold text-orange2">김지원</span> -->
                <span class="text-gray1 txt-sub">
                  {{ lecture["course_platform"] }}
                </span>
                <span class="ml-0.5 text-gray1 txt-sub">{{
                  `${Number(lecture["course_price"]).toLocaleString()}원`
                }}</span>
                <span class="ml-1 underline text-gray1 txt-sub">
                  <a :href="lecture['course_siteUrl']" target="_blank">
                    보러가기
                  </a>
                </span>
              </div>

              <div class="flex items-center">
                <div
                  v-if="lecture['course_liked'] === 'true'"
                  @click="
                    removeHeartToLecture(lectureIdx, lecture['course_id'])
                  "
                >
                  <SvgHeartOutline
                    :color="`#ff6b6b`"
                    :fill="`#ff6b6b`"
                    class="cursor-pointer"
                  />
                </div>
                <div
                  v-else
                  @click="giveHeartToLecture(lectureIdx, lecture['course_id'])"
                >
                  <SvgHeartOutline :color="`#868296`" class="cursor-pointer" />
                </div>
                <ButtonGeneral
                  class="ml-3 text-white bg-orange2 rounded-4px"
                  style="width: 172px; height: 32px"
                >
                  <NuxtLink :to="`/review/${lecture['course_id']}`">
                    <span>{{ lecture["num_review"] }}개의 리뷰 보기</span>
                  </NuxtLink>
                </ButtonGeneral>
              </div>
            </div>
          </div>
        </div>

        <!-- see more button -->
        <ButtonGeneral
          v-if="
            tutorLectureData.length !==
            Number(totalNumOfTutorLecture['num_course'])
          "
          @click="seeMoreTutorLecture"
          class="w-full mt-8 rounded-4px bg-gray3 text-gray1"
          style="width: 684px; height: 56px"
        >
          <span>더보기</span>
        </ButtonGeneral>
      </div>

      <!-- tutor's reviews -->
      <div
        class="pb-8 mt-3 bg-white rounded-8px pt-14 px-18 test mb-14"
        style="width: 828px"
      >
        <!-- number of reviews & filtering buttons -->
        <div class="flex items-center justify-between">
          <span class="txt-mid-bold">
            받은 리뷰
            <span class="text-orange2">6개</span></span
          >
          <div class="txt-sub">
            <span class="cursor-pointer txt-sub-bold text-orange2">추천순</span>
            <span class="ml-2 cursor-pointer text-gray1">추천순</span>
            <span class="ml-2 cursor-pointer text-gray1">추천순</span>
            <span class="ml-2 cursor-pointer text-gray1">추천순</span>
          </div>
        </div>

        <!-- divider -->
        <div class="mt-4 border-t border-gray2"></div>

        <div v-for="i in 4" :key="i">
          <!-- review card data -->
          <div class="flex justify-between mt-8">
            <!-- left side -->
            <div class="flex-shrink-0">
              <div class="flex">
                <div
                  class="rounded-full bg-gray1"
                  style="width: 48px; height: 48px"
                ></div>

                <div class="ml-2.5 flex flex-col">
                  <span class="txt-sub-bold">닉네임</span>
                  <span class="mt-1 txt-sub">UX 디자이너</span>
                  <span class="txt-sub">2~3년차</span>
                </div>
              </div>

              <div class="flex mt-5">
                <StarRate :size="20" :score="`5.0`" />
                <span class="ml-1 txt-base-bold">5.0</span>
              </div>
            </div>
            <!-- right side -->
            <div style="width: 480px">
              <!-- title -->
              <span class="underline txt-sub text-gray1">
                파이썬입문과 크롤링기초 부트캠프 (2021 업데이트) [쉽게! 견고한
                자료까지!]
              </span>

              <!-- pros -->
              <div class="mt-4">
                <span class="txt-sub-bold text-orange2">장점</span>
                <p class="txt-sub">
                  실무와 연관이 깊고, 실용적이고 실무에서 쓰일법한 지식들을
                  골라서 강의해주신게 인상적이었습니다. 또한 강의를 함께 듣는
                  수강생끼리 협업이나 소통을 하도록 분위기를 만들어주셔서 공부할
                  때 도움을 많이 받았습니다
                </p>
              </div>

              <!-- cons -->
              <div class="mt-4">
                <span class="txt-sub-bold text-orange2">단점</span>
                <p class="txt-sub">
                  강의 전체 횟수와 시간이 조금 루즈했던 것 같습니다. 어느정도
                  공부를 해본 사람보다는 아예 입문자가 수강하면 괜찮을 것
                  같습니다. 그리고 자료를 공유해주셨는데 그 자료가 좀 오래된
                  버전이었다는 사실을 뒤늦게 알았습니다. 아마 강사님도 모르셨던
                  것 같았습니다.
                </p>
              </div>

              <!-- update, delete button & date & recommend button -->
              <div class="flex items-center justify-end mt-4">
                <span class="underline cursor-pointer txt-sub text-gray1">
                  수정
                </span>
                <span class="ml-4 underline cursor-pointer txt-sub text-gray1">
                  삭제
                </span>
                <span class="ml-8 txt-mini text-gray1">2022-01-26</span>
                <ButtonGeneral
                  :width="139"
                  :height="32"
                  class="ml-3 border border-gray2 rounded-4px"
                >
                  <span class="txt-mini">이 리뷰가 도움됨</span>
                  <span class="ml-1 txt-mini-bold">5</span>
                  <img
                    src="~/assets/imgs/icon/check.png"
                    alt="추천"
                    style="width: 14px; height: 10px"
                    draggable="false"
                    class="ml-2"
                  />
                </ButtonGeneral>
              </div>
            </div>
          </div>

          <!-- divider -->
          <div class="mt-4 border-t border-gray2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "home",
  async asyncData({ $axios, params }) {
    console.log("params.id", params.id);

    const tutorInfoData = await $axios.$get(
      `/api/reviews/instructors/${params.id}/avg`
    );
    console.log("tutorInfoData", tutorInfoData);

    const totalNumOfTutorReview = await $axios.$get(
      `/api/reviews/instructors/${params.id}/count`
    );
    console.log("totalNumOfTutorReview", totalNumOfTutorReview);

    let questionList = [
      {
        question: "강의소개와 일치",
      },
      {
        question: "전달력",
      },
      {
        question: "업데이트 반영",
      },
      {
        question: "가성비",
      },
    ];
    questionList.forEach((elem, idx) => {
      elem["score"] = tutorInfoData[`q${idx + 1}`];
    });
    console.log("questionList", questionList);

    const tutorLectureData = await $axios.$get(
      `/api/courses/instructors/${params.id}`,
      {
        params: {
          perPage: 3,
          page: 1,
          sort: "num_review",
        },
      }
    );
    console.log("tutorLectureData", tutorLectureData);

    const totalNumOfTutorLecture = await $axios.$get(
      `/api/courses/instructors/${params.id}/count`
    );
    console.log("totalNumOfTutorLecture", totalNumOfTutorLecture);

    return {
      tutorInfoData,
      totalNumOfTutorReview,
      questionList,
      tutorLectureData,
      totalNumOfTutorLecture,
    };
  },
  data() {
    return {
      currentLecturePage: 1,
    };
  },
  methods: {
    cardImageLogo(siteName) {
      let imgName = "";

      if (siteName === "탈잉") {
        imgName = "taling";
      } else if (siteName === "인프런") {
        imgName = "inflearn";
      } else if (siteName === "유데미") {
        imgName = "udemy";
      } else if (siteName === "클래스101") {
        imgName = "class101";
      } else if (siteName === "리메인") {
        imgName = "remain";
      } else if (siteName === "패스트캠퍼스") {
        imgName = "fastcampus";
      } else if (siteName === "프로그래머스") {
        imgName = "programmers";
      } else if (siteName === "코드잇") {
        imgName = "codeit";
      } else {
        imgName = "etc";
      }

      return require(`assets/imgs/logo/lecturesite/${imgName}.png`);
    },
    async seeMoreTutorLecture() {
      this.currentLecturePage += 1;
      const response = await this.$axios.$get(
        `/api/courses/instructors/${this.$route.params.id}`,
        {
          params: {
            perPage: 3,
            page: this.currentLecturePage,
            sort: "num_review",
          },
        }
      );
      this.tutorLectureData = [...this.tutorLectureData, ...response];
    },
    async giveHeartToLecture(lectureIdx, course_id) {
      console.log("give heart idx", lectureIdx);
      const response = this.$axios.$post(`/api/courses/likes/${course_id}`);
      if (response) {
        this.tutorLectureData[lectureIdx]["course_liked"] = "true";
      }
      console.log("hi");
    },
    async removeHeartToLecture(lectureIdx, course_id) {
      console.log("remove heart idx", lectureIdx);
      const response = this.$axios.$delete(`/api/courses/likes/${course_id}`);
      if (response) {
        this.tutorLectureData[lectureIdx]["course_liked"] = "false";
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.test {
  /* @apply border-2 border-orange2; */
}
</style>
