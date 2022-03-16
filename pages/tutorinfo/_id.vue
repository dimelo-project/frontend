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
                  v-if="
                    $auth &&
                    $auth.user &&
                    lecture['course_liked'] &&
                    lecture['course_liked'] === 'true'
                  "
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
            <span class="text-orange2">
              {{ totalNumOfTutorReview["num_review"] }}개
            </span>
          </span>
          <div class="txt-sub">
            <span
              v-for="(menu, menuIdx) in filteringMenu"
              :key="menuIdx"
              @click="
                getFilteredReviewData(menu.sortWay, menu.orderWay, menuIdx)
              "
              class="ml-2 cursor-pointer"
              :class="{
                'txt-sub-bold text-orange2':
                  menuIdx === selectedFilteringMenuIdx,
                'pointer-events-none': loading,
              }"
            >
              {{ menu.name }}
            </span>
          </div>
        </div>

        <!-- divider -->
        <div class="mt-4 border-t border-gray2"></div>

        <div
          v-for="(review, reviewDataIdx) in tutorReviewData"
          :key="reviewDataIdx"
        >
          <!-- review card data -->
          <div class="flex justify-between mt-8">
            <!-- left side -->
            <div class="flex-shrink-0">
              <div class="flex">
                <!-- user profile image -->
                <div
                  v-if="review['user_imageUrl']"
                  style="width: 48px; height: 48px"
                >
                  <img
                    :src="review['user_imageUrl']"
                    alt=""
                    class="rounded-full"
                    style="width: 48px; height: 48px"
                  />
                </div>
                <div
                  v-else
                  class="rounded-full bg-gray1"
                  style="width: 48px; height: 48px"
                ></div>

                <div class="ml-2.5 flex flex-col">
                  <span class="txt-sub-bold">
                    {{ review["user_nickname"] }}
                  </span>
                  <span class="mt-1 txt-sub">{{ review["user_job"] }}</span>
                  <span class="txt-sub">{{ review["user_career"] }}</span>
                </div>
              </div>

              <div class="flex mt-5">
                <StarRate :size="20" :score="review['review_avg']" />
                <span class="ml-1 txt-base-bold">
                  {{ review["review_avg"] }}
                </span>
              </div>
            </div>
            <!-- right side -->
            <div style="width: 480px">
              <!-- title -->
              <span class="underline txt-sub text-gray1">
                {{ review["course_title"] }}
              </span>

              <!-- pros -->
              <div class="mt-4">
                <span class="txt-sub-bold text-orange2">장점</span>
                <p class="txt-sub">
                  {{ review["review_pros"] }}
                </p>
              </div>

              <!-- cons -->
              <div class="mt-4">
                <span class="txt-sub-bold text-orange2">단점</span>
                <p class="txt-sub">
                  {{ review["review_cons"] }}
                </p>
              </div>

              <!-- update, delete button & date & recommend button -->
              <div class="flex items-center justify-end mt-4">
                <span
                  v-if="
                    $auth && $auth.user && review['user_id'] === $auth.user.id
                  "
                  class="underline cursor-pointer txt-sub text-gray1"
                >
                  수정
                </span>
                <span
                  v-if="
                    $auth && $auth.user && review['user_id'] === $auth.user.id
                  "
                  class="ml-4 underline cursor-pointer txt-sub text-gray1"
                >
                  삭제
                </span>
                <span class="ml-8 txt-mini text-gray1">
                  {{ review["review_createdAt"] }}
                </span>
                <ButtonGeneral
                  v-if="review['review_helped'] === 'true'"
                  @click="
                    removeHelpedToReview(reviewDataIdx, review['review_id'])
                  "
                  :width="139"
                  :height="32"
                  class="ml-3 border border-orange2 rounded-4px"
                >
                  <span class="txt-mini">이 리뷰가 도움됨</span>
                  <span class="ml-1 txt-mini-bold text-orange2">
                    {{ review["num_help"] }}
                  </span>
                  <SvgCheck class="ml-1" :color="`#F3732B`" />
                </ButtonGeneral>
                <ButtonGeneral
                  v-else
                  @click="
                    giveHelpedToReview(reviewDataIdx, review['review_id'])
                  "
                  :width="139"
                  :height="32"
                  class="ml-3 border border-gray2 rounded-4px"
                >
                  <span class="txt-mini">이 리뷰가 도움됨</span>
                  <span class="ml-1 txt-mini-bold">
                    {{ review["num_help"] }}
                  </span>
                  <SvgCheck class="ml-1" :color="`#E0E1E5`" />
                </ButtonGeneral>
              </div>
            </div>
          </div>

          <!-- divider -->
          <div class="mt-4 border-t border-gray2"></div>
        </div>

        <div v-if="loading" class="flex items-center justify-center h-32">
          <SvgSpinner />
        </div>

        <InfiniteScrollObserver
          v-if="
            !loading &&
            tutorReviewData.length !==
              Number(totalNumOfTutorReview['num_review'])
          "
          @intersect="intersected"
          :options="{ threshold: 0.0 }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "home",
  async asyncData({ $axios, params }) {
    // console.log("params.id", params.id);

    const tutorInfoData = await $axios.$get(
      `/api/reviews/instructors/${params.id}/avg`
    );
    // console.log("tutorInfoData", tutorInfoData);

    const totalNumOfTutorReview = await $axios.$get(
      `/api/reviews/instructors/${params.id}/count`
    );
    // console.log("totalNumOfTutorReview", totalNumOfTutorReview);

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
    // console.log("questionList", questionList);

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
    // console.log("tutorLectureData", tutorLectureData);

    const totalNumOfTutorLecture = await $axios.$get(
      `/api/courses/instructors/${params.id}/count`
    );
    // console.log("totalNumOfTutorLecture", totalNumOfTutorLecture);

    const tutorReviewData = await $axios.$get(
      `/api/reviews/instructors/${params.id}`,
      {
        params: {
          sort: "help",
          order: "DESC",
          perPage: 3,
          page: 1,
        },
      }
    );
    // console.log("tutorReviewData", tutorReviewData);

    return {
      tutorInfoData,
      totalNumOfTutorReview,
      questionList,
      tutorLectureData,
      totalNumOfTutorLecture,
      tutorReviewData,
    };
  },
  data() {
    return {
      loading: false,
      currentLecturePage: 1,
      currentReviewPage: 2,
      filteringMenu: [
        {
          id: 0,
          name: "추천순",
          sortWay: "help",
          orderWay: "DESC",
        },
        {
          id: 1,
          name: "최신순",
          sortWay: "date",
          orderWay: "DESC",
        },
        {
          id: 2,
          name: "별점높은순",
          sortWay: "avg",
          orderWay: "DESC",
        },
        {
          id: 3,
          name: "별점낮은순",
          sortWay: "avg",
          orderWay: "ASC",
        },
      ],
      selectedFilteringMenuIdx: 0,
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
      try {
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
      } catch (err) {
        console.log(err);
      }
    },
    async giveHeartToLecture(lectureIdx, course_id) {
      if (!this.$store.getters["authentication/isUserLoggedIn"]) {
        this.$store.commit("loginModal/changeIsLoginModalOpened", true);
        return;
      }

      try {
        // console.log("give heart idx", lectureIdx);
        const response = await this.$axios.$post(
          `/api/courses/likes/${course_id}`
        );
        if (response) {
          this.tutorLectureData[lectureIdx]["course_liked"] = "true";
        }
      } catch (err) {
        console.log(err);
      }
    },
    async removeHeartToLecture(lectureIdx, course_id) {
      try {
        // console.log("remove heart idx", lectureIdx);
        const response = await this.$axios.$delete(
          `/api/courses/likes/${course_id}`
        );
        if (response) {
          this.tutorLectureData[lectureIdx]["course_liked"] = "false";
        }
      } catch (err) {
        console.log(err);
      }
    },
    async giveHelpedToReview(reviewDataIdx, review_id) {
      if (!this.$store.getters["authentication/isUserLoggedIn"]) {
        this.$store.commit("loginModal/changeIsLoginModalOpened", true);
        return;
      }

      try {
        const response = await this.$axios.$post(
          `/api/reviews/help/${review_id}`
        );
        if (response) {
          const num_helped = Number(
            this.tutorReviewData[reviewDataIdx]["num_help"]
          );
          this.tutorReviewData[reviewDataIdx]["num_help"] = String(
            num_helped + 1
          );
          this.tutorReviewData[reviewDataIdx]["review_helped"] = "true";
        }
      } catch (err) {
        console.log(err);
      }
    },
    async removeHelpedToReview(reviewDataIdx, review_id) {
      try {
        const response = await this.$axios.$delete(
          `/api/reviews/help/${review_id}`
        );
        if (response) {
          const num_helped = Number(
            this.tutorReviewData[reviewDataIdx]["num_help"]
          );
          this.tutorReviewData[reviewDataIdx]["num_help"] = String(
            num_helped - 1
          );
          this.tutorReviewData[reviewDataIdx]["review_helped"] = "false";
        }
      } catch (err) {
        console.log(err);
      }
    },
    async intersected() {
      try {
        this.loading = true;
        const response = await this.$axios.$get(
          `/api/reviews/instructors/${this.$route.params.id}`,
          {
            params: {
              sort: this.filteringMenu[this.selectedFilteringMenuIdx][
                "sortWay"
              ],
              order:
                this.filteringMenu[this.selectedFilteringMenuIdx]["orderWay"],
              perPage: 3,
              page: this.currentReviewPage,
            },
          }
        );

        setTimeout(() => {
          if (response) {
            this.currentReviewPage += 1;
            this.tutorReviewData = [...this.tutorReviewData, ...response];
          }
          this.loading = false;
        }, 1500);
      } catch (err) {
        console.log(err);
      }
    },
    async getFilteredReviewData(sortWay, orderWay, menuIdx) {
      try {
        const response = await this.$axios.$get(
          `/api/reviews/instructors/${this.$route.params.id}`,
          {
            params: {
              sort: sortWay,
              order: orderWay,
              perPage: 3,
              page: 1,
            },
          }
        );
        if (response) {
          this.tutorReviewData = response;

          this.currentReviewPage = 2;
        }
        this.selectedFilteringMenuIdx = menuIdx;
      } catch (err) {
        console.log(err);
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
