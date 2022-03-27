<template>
  <div class="select-none mb-96">
    <!-- top -- lecture info -->
    <div class="flex justify-center">
      <div class="flex items-center test" style="width: 990px; height: 149px">
        <!-- left content -->
        <div>
          <img
            :src="$getLectureBrandLogo(courseData['course_platform'])"
            alt="강의사이트로고"
            style="width: 69px; height: 69px"
            draggable="false"
          />
        </div>
        <!-- right content -->
        <div class="ml-8">
          <div>
            <span class="txt-mid-bold">
              {{ courseData["course_title"] }}
            </span>
          </div>
          <div class="flex items-end mt-2.5">
            <!-- star rate -->
            <div class="flex items-center">
              <starRate :score="courseData['course_avg']" />
              <span class="ml-1 txt-base-bold">
                {{ courseData["course_avg"] }}
              </span>
              <span class="txt-mini">({{ totalNumOfReview }})</span>
            </div>
            <!-- tutor name -->
            <div>
              <span class="ml-6 txt-sub-bold">강사</span>
            </div>
            <NuxtLink :to="`/tutorinfo/${courseData['instructor_id']}`">
              <span class="ml-1 underline txt-sub-bold">
                {{ courseData["instructor_name"] }}
              </span>
            </NuxtLink>
            <!-- lecture site name -->
            <div>
              <span class="ml-5 txt-sub text-gray1">
                {{ courseData["course_platform"] }}
              </span>
            </div>
            <!-- lecture price -->
            <div>
              <span class="ml-1 txt-usb text-gray1">
                {{ courseData["course_price"].toLocaleString() }}원
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- divider -->
    <div class="border-b border-gray2"></div>
    <!-- wrap -->
    <div class="flex justify-center">
      <div style="width: 990px" class="flex justify-between test">
        <div style="width: 684px" class="flex-shrink-0">
          <!-- review analysis -->
          <div class="mt-12">
            <span class="txt-base-bold">
              총 <span class="text-orange2">{{ totalNumOfReview }}개</span>의
              리뷰가 있습니다.
            </span>

            <div class="border mt-7 border-yellow1 rounded-4px py-7">
              <div class="flex">
                <div class="text-center mx-9">
                  <span class="txt-sub-bold">항목별 평점</span>
                </div>

                <div class="flex-shrink-0">
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
                    <PlainProgressBar
                      class="ml-3"
                      :score="Number(item.score)"
                    />
                    <SvgReviewStar class="ml-2" />
                    <span class="ml-1 txt-sub-bold">{{ item.score }}</span>
                  </div>
                </div>

                <div
                  class="flex flex-col items-center justify-center flex-grow"
                >
                  <SvgReviewStar />
                  <div class="text-gray1">평균</div>
                  <div class="txt-heading3">{{ scoreData["avg"] }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- review contents -->
          <div>
            <!-- review filtering butotn -->
            <div class="flex justify-between mt-13">
              <span class="txt-mid-bold"
                >상세 리뷰<span class="ml-1 txt-mini"
                  >({{ totalNumOfReview }})</span
                ></span
              >
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
                  }"
                >
                  {{ menu.name }}
                </span>
              </div>
            </div>
            <!-- review card data list -->
            <div
              v-for="(review, reviewDataIdx) in reviewData"
              :key="reviewDataIdx"
            >
              <!-- divider -->
              <div class="mt-4 border-b border-gray2"></div>
              <!-- card data -->
              <div class="flex mt-4">
                <!-- user profile & user review rate -->
                <div class="flex flex-col flex-shrink-0">
                  <!-- user profile -->
                  <div class="flex" style="width: 200px">
                    <profileImageAvatar
                      :url="review['user_imageUrl']"
                      :imgSize="48"
                    />

                    <div class="ml-2.5">
                      <div>
                        <span class="txt-sub-bold">{{
                          review["user_nickname"]
                        }}</span>
                      </div>
                      <div class="mt-1">
                        <span class="txt-sub">{{ review["user_job"] }}</span>
                      </div>
                      <div>
                        <span class="txt-sub">{{ review["user_career"] }}</span>
                      </div>
                    </div>
                  </div>
                  <!-- user review rate -->
                  <div class="flex mt-6">
                    <StarRate :size="20" :score="review['review_avg']" />
                    <span class="ml-1 txt-base-bold">{{
                      review["review_avg"]
                    }}</span>
                  </div>
                </div>
                <!-- pros and cons -->
                <div class="ml-10">
                  <div>
                    <span class="text-orange2 txt-sub-bold">장점</span>
                    <p class="txt-sub mt-0.5">
                      {{ review["review_pros"] }}
                    </p>
                  </div>
                  <div class="mt-4">
                    <span class="text-orange2 txt-sub-bold">단점</span>
                    <p class="txt-sub mt-0.5">
                      {{ review["review_cons"] }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- udpate & remove button & date & recommend button -->
              <div class="flex items-center justify-end mt-5">
                <span
                  v-if="
                    $auth && $auth.user && review['user_id'] === $auth.user.id
                  "
                  class="underline cursor-pointer text-gray1 txt-sub"
                  @click="openReviewModal('update', review['review_id'])"
                  >수정</span
                >
                <span
                  v-if="
                    $auth && $auth.user && review['user_id'] === $auth.user.id
                  "
                  @click="
                    openAlertModal(
                      reviewDataIdx,
                      $route.params.id,
                      review['review_id']
                    )
                  "
                  class="ml-4 underline cursor-pointer text-gray1 txt-sub"
                  >삭제</span
                >
                <span class="ml-8 text-gray1 txt-sub">{{
                  review["review_createdAt"]
                }}</span>

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

            <!-- see more button -->
            <ButtonGeneral
              v-if="totalNumOfReview !== reviewData.length"
              @click="seeMoreReviewData"
              :large="true"
              class="w-full py-4 mt-4 border-none text-gray1 rounded-8px bg-gray3 mb-14"
            >
              <span>더보기</span>
            </ButtonGeneral>
          </div>
        </div>

        <!-- right side panel -->
        <div style="width: 200px" class="flex-shrink-0">
          <div class="sticky top-30">
            <!-- lecture info & link -->
            <div
              class="px-3 py-5 mt-12 border border-gray2 bg-gray4 rounded-8px"
              style="width: 200px"
            >
              <div class="flex items-start">
                <svgInfo />
                <div class="flex flex-col ml-2">
                  <span class="txt-sub-bold">{{
                    courseData["course_platform"]
                  }}</span>
                  <span class="txt-sub"
                    >{{ courseData["course_price"].toLocaleString() }}원</span
                  >
                </div>
              </div>
              <a :href="courseData['course_siteUrl']" target="_blank">
                <ButtonGeneral
                  class="py-2.5 px-9 txt-base-bold bg-black1 text-white mt-5 rounded-8px"
                >
                  <span>강의 보러가기</span>
                </ButtonGeneral></a
              >
            </div>
            <!-- create review button -->
            <ButtonGeneral
              :color="`orange1`"
              class="text-white px-9 py-2.5 mt-7 txt-base-bold rounded-4px bg-orange1 hover:bg-orange2"
              @click="openReviewModal('create')"
            >
              <span>리뷰 작성</span>
            </ButtonGeneral>
            <!-- bookmark lecture button -->
            <ButtonGeneral
              :width="200"
              class="py-2.5 mt-2 text-gray1 rounded-4px border border-gray2"
              @click="toggleHeartToLecture"
            >
              <span v-if="courseData['course_liked'] === 'false'">
                관심강의 추가
              </span>
              <span v-else>관심강의 해제</span>
              <SvgHeartOutline
                class="ml-1"
                :fill="
                  courseData['course_liked'] === 'true' ? '#FF6B6B' : `white`
                "
                :color="
                  courseData['course_liked'] === 'true' ? 'none' : '#868E96'
                "
              />
            </ButtonGeneral>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Review Modal -->
    <MultiSteps @reviewUpload="uploadReview" />

    <!-- Alert Modal -->
    <AlertModal :isModalOpened="isAlertModalOpened">
      <div
        class="flex items-center justify-center w-full h-full border-0 select-none"
      >
        <div class="text-center">
          <span class="txt-mid">삭제하시겠습니까?</span>
          <div class="flex mt-11">
            <ButtonGeneral
              @click="isAlertModalOpened = false"
              :width="145"
              :height="44"
              class="border border-orange2 text-orange2 rounded-4px hover:bg-orange2 hover:text-white"
            >
              <span class="txt-base-bold"> 취소 </span>
            </ButtonGeneral>
            <ButtonGeneral
              @click="deleteMyReview()"
              :width="145"
              :height="44"
              class="ml-4 text-white bg-orange1 rounded-4px hover:bg-orange2"
            >
              <span class="txt-base-bold"> 삭제 </span>
            </ButtonGeneral>
          </div>
        </div>
      </div>
    </AlertModal>
  </div>
</template>

<script>
export default {
  layout: "home",
  async asyncData({ $axios, params }) {
    let courseData, scoreData, reviewData, totalNumOfReview;
    try {
      // 해당 강의정보 가져오기
      const courseDataResponse = await $axios.$get(`/api/courses/${params.id}`);
      if (courseDataResponse) {
        courseData = courseDataResponse;
      }
      console.log("courseData", courseData);

      const totalNumOfReviewResponse = await $axios.$get(
        `/api/reviews/courses/${params.id}/count`
      );
      totalNumOfReview = Number(totalNumOfReviewResponse["num_review"]);
      console.log("totalNumOfReview", totalNumOfReview);

      // 해당 강의의 평점 가져오기
      const scoreDataResponse = await $axios.$get(
        `/api/reviews/courses/${params.id}/avg`
      );
      if (scoreDataResponse) {
        scoreData = scoreDataResponse;
      }
      console.log("scoreData", scoreData);

      // 해당 강의의 리뷰들 가져오기
      const reviewDataResponse = await $axios.$get(
        `/api/reviews/courses/${params.id}?perPage=10&page=1&sort=help&order=DESC`
      );
      if (reviewDataResponse) {
        reviewData = reviewDataResponse;
      }
      console.log("reviewData", reviewData);
    } catch (err) {
      console.error(err.response);
    }

    // 점수 데이터 생성
    let questionList = [
      {
        question: "강의소개와 일치",
      },
      {
        question: "전달력",
      },
      {
        question: "가성비",
      },
      {
        question: "업데이트 반영",
      },
    ];
    questionList.forEach((elem, idx) => {
      elem["score"] = scoreData[`q${idx + 1}`];
    });
    console.log("questionList", questionList);

    return {
      courseData,
      scoreData,
      reviewData,
      questionList,
      totalNumOfReview,
    };
  },
  data() {
    return {
      hearted: true,
      isModalOpened: false,
      isAlertModalOpened: false,
      reviewMode: null,
      updateReviewIdx: null,
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
      currentReviewPage: 2,
      selectedReivew: {
        myReviewIdx: null,
        course_id: null,
        review_id: null,
      },
    };
  },
  methods: {
    async getFilteredReviewData(sortWay, orderWay, menuIdx) {
      try {
        const response = await this.$axios.$get(
          `/api/reviews/courses/${this.$route.params.id}`,
          {
            params: {
              sort: sortWay,
              order: orderWay,
              perPage: 10,
              page: 1,
            },
          }
        );
        if (response) {
          this.reviewData = response;

          this.currentReviewPage = 2;
        }
        this.selectedFilteringMenuIdx = menuIdx;
      } catch (err) {
        console.error(err);
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
          const num_helped = Number(this.reviewData[reviewDataIdx]["num_help"]);
          this.reviewData[reviewDataIdx]["num_help"] = String(num_helped + 1);
          this.reviewData[reviewDataIdx]["review_helped"] = "true";
        }
      } catch (err) {
        console.error(err.response);
      }
    },
    async removeHelpedToReview(reviewDataIdx, review_id) {
      if (!this.$store.getters["authentication/isUserLoggedIn"]) {
        this.$store.commit("loginModal/changeIsLoginModalOpened", true);
        return;
      }

      try {
        const response = await this.$axios.$delete(
          `/api/reviews/help/${review_id}`
        );
        if (response) {
          const num_helped = Number(this.reviewData[reviewDataIdx]["num_help"]);
          this.reviewData[reviewDataIdx]["num_help"] = String(num_helped - 1);
          this.reviewData[reviewDataIdx]["review_helped"] = "false";
        }
      } catch (err) {
        console.error(err.response);
      }
    },
    async toggleHeartToLecture() {
      if (!this.$store.getters["authentication/isUserLoggedIn"]) {
        this.$store.commit("loginModal/changeIsLoginModalOpened", true);
        return;
      }

      if (this.courseData["course_liked"] === "false") {
        const response = await this.$axios.$post(
          `/api/courses/likes/${this.$route.params.id}`
        );

        if (response) {
          this.courseData = Object.assign({}, this.courseData, {
            course_liked: "true",
          });
        }
      } else {
        const response = await this.$axios.$delete(
          `/api/courses/likes/${this.$route.params.id}`
        );

        if (response) {
          this.courseData = Object.assign({}, this.courseData, {
            course_liked: "false",
          });
        }
      }
    },
    openAlertModal(myReviewIdx, course_id, review_id) {
      this.isAlertModalOpened = true;
      this.selectedReivew = {
        myReviewIdx,
        course_id,
        review_id,
      };
    },
    async openReviewModal(mode, review_id) {
      if (!this.$store.getters["authentication/isUserLoggedIn"]) {
        this.$store.commit("loginModal/changeIsLoginModalOpened", true);
        return;
      }

      if (!this.$store.getters["authentication/isAlreadyProfileSet"]) {
        this.$store.commit("requireProfileSetModal/changeIsModalOpened", true);
        return;
      }
      this.$store.commit("multiStepModal/initAllData");

      this.$store.commit("multiStepModal/changeIsModalOpened", true);
      this.$store.commit("multiStepModal/changeReviewMode", mode);
      if (
        this.$store.state.multiStepModal.reviewMode === "update" &&
        review_id
      ) {
        this.updateReviewIdx = review_id;

        const getReviewDataResponse = await this.$axios.$get(
          `/api/reviews/courses/${this.$route.params.id}/${this.updateReviewIdx}`
        );

        const { q1, q2, q3, q4, pros, cons } = getReviewDataResponse;

        this.$store.commit("multiStepModal/changeQ1score", q1);
        this.$store.commit("multiStepModal/changeQ2score", q2);
        this.$store.commit("multiStepModal/changeQ3score", q3);
        this.$store.commit("multiStepModal/changeQ4score", q4);
        this.$store.commit("multiStepModal/changeQ5pros", pros);
        this.$store.commit("multiStepModal/changeQ5cons", cons);
      }
    },
    async uploadReview() {
      if (this.$store.state.multiStepModal.reviewMode === "create") {
        try {
          console.log("create!!!");
          const response = await this.$axios.$post(
            `/api/reviews/courses/${this.$route.params.id}`,
            {
              q1: this.$store.state.multiStepModal.q1score,
              q2: this.$store.state.multiStepModal.q2score,
              q3: this.$store.state.multiStepModal.q3score,
              q4: this.$store.state.multiStepModal.q4score,
              pros: this.$store.state.multiStepModal.q5pros,
              cons: this.$store.state.multiStepModal.q5cons,
            }
          );

          if (response) {
            this.getAllMyReview();
            this.totalNumOfReview += 1;
          }
        } catch (err) {
          console.error(err.response);
        }
      } else if (this.$store.state.multiStepModal.reviewMode === "update") {
        try {
          console.log("update!");

          const updateReviewResponse = await this.$axios.$patch(
            `/api/reviews/courses/${this.$route.params.id}/${this.updateReviewIdx}`,
            {
              q1: this.$store.state.multiStepModal.q1score,
              q2: this.$store.state.multiStepModal.q2score,
              q3: this.$store.state.multiStepModal.q3score,
              q4: this.$store.state.multiStepModal.q4score,
              pros: this.$store.state.multiStepModal.q5pros,
              cons: this.$store.state.multiStepModal.q5cons,
            }
          );

          if (updateReviewResponse) {
            this.getAllMyReview();
          }
        } catch (err) {
          console.error(err.response);
        }
      }

      this.$store.commit("multiStepModal/changeIsModalOpened", false);
      this.reviewMode = null;
    },
    async getAllMyReview() {
      this.reviewData = await this.$axios.$get(
        `/api/reviews/courses/${this.$route.params.id}`,
        {
          params: {
            perPage: 10,
            page: 1,
            sort: this.filteringMenu[this.selectedFilteringMenuIdx]["sortWay"],
            order:
              this.filteringMenu[this.selectedFilteringMenuIdx]["orderWay"],
          },
        }
      );
    },
    async seeMoreReviewData() {
      try {
        const response = await this.$axios.$get(
          `/api/reviews/courses/${this.$route.params.id}`,
          {
            params: {
              perPage: 3,
              page: this.currentReviewPage,
              sort: this.filteringMenu[this.selectedFilteringMenuIdx][
                "sortWay"
              ],
              order:
                this.filteringMenu[this.selectedFilteringMenuIdx]["orderWay"],
            },
          }
        );
        this.reviewData = [...this.reviewData, ...response];
        this.currentReviewPage += 1;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteMyReview() {
      const { myReviewIdx, course_id, review_id } = this.selectedReivew;

      try {
        const response = await this.$axios.delete(
          `/api/reviews/courses/${course_id}/${review_id}`
        );
        console.log(response);

        this.reviewData.splice(myReviewIdx, 1);
        this.totalNumOfReview -= 1;
      } catch (err) {
        console.log(err.response);
      }
      this.isAlertModalOpened = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
.test {
  /* @apply border border-orange2; */
}
</style>
