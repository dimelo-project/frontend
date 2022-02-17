<template>
  <div class="mb-20">
    <div>
      <span class="txt-sub">총 {{ myAllReviewData["num_review"] }}건</span>
    </div>

    <!-- divider -->
    <div class="mt-3 border-t-2 border-gray2"></div>

    <div
      v-if="myAllReviewData.review.length === 0"
      class="mt-10 text-center txt-base"
    >
      <span>작성한 리뷰가 없습니다.</span>
    </div>

    <!-- review data list -->
    <div
      v-for="(review, myReviewIdx) in myAllReviewData.review"
      :key="myReviewIdx"
      class="mt-5"
    >
      <!-- lecture title -->
      <span class="txt-sub text-gray1">
        {{ review["course_title"] }}
      </span>

      <!-- review rate & update, delete button -->
      <div class="flex justify-between mt-4">
        <div class="flex items-center">
          <StarRate :score="review['review_avg']" :size="20" />
          <span class="ml-1 txt-base-bold">{{ review["review_avg"] }}</span>
        </div>

        <div class="txt-sub">
          <span
            class="underline cursor-pointer text-gray1"
            @click="
              openUpdateModal(
                myReviewIdx,
                review['course_id'],
                review['review_id']
              )
            "
          >
            수정
          </span>
          <span
            class="ml-4 underline cursor-pointer text-gray1"
            @click="
              openAlertModal(
                myReviewIdx,
                review['course_id'],
                review['review_id']
              )
            "
            >삭제</span
          >
        </div>
      </div>

      <!-- props & cons -->
      <div class="mt-4">
        <div>
          <span class="text-orange2 txt-sub-bold">장점</span>
          <p>
            {{ review["review_pros"] }}
          </p>
        </div>

        <div class="mt-3">
          <span class="text-orange2 txt-sub-bold">단점</span>
          <p>
            {{ review["review_cons"] }}
          </p>
        </div>
      </div>

      <!-- date -->
      <div class="mt-2 txt-mini text-gray1">
        <span>{{ review["review_createdAt"] }}</span>
      </div>

      <!-- divider -->
      <div class="mt-5 border-t border-gray1"></div>
    </div>

    <!-- Review Modal -->
    <MultiSteps
      :isModalOpened="isReviewModalOpened"
      @modalClose="isReviewModalOpened = false"
      @reviewUpload="updateReviewData"
    />

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
  layout: "mypage",
  async asyncData({ $axios }) {
    const myAllReviewData = await $axios.$get("/api/reviews/me");
    console.log("myAllReviewData", myAllReviewData);

    return { myAllReviewData };
  },
  data() {
    return {
      isReviewModalOpened: false,
      isAlertModalOpened: false,
      selectedReivew: {
        myReviewIdx: null,
        course_id: null,
        review_id: null,
      },
    };
  },
  mounted() {
    this.$store.commit("changeCntCategoryIdx", 1);
  },
  methods: {
    async deleteMyReview() {
      const { myReviewIdx, course_id, review_id } = this.selectedReivew;

      try {
        const response = await this.$axios.delete(
          `/api/reviews/courses/${course_id}/${review_id}`
        );
        // console.log(response);

        if (response) {
          this.myAllReviewData.review.splice(myReviewIdx, 1);
          this.myAllReviewData = Object.assign({}, this.myAllReviewData, {
            num_review: this.myAllReviewData.num_review - 1,
            review: [...this.myAllReviewData.review],
          });
        }
      } catch (err) {
        console.log(err.response);
      }
      this.isAlertModalOpened = false;
    },
    openAlertModal(myReviewIdx, course_id, review_id) {
      this.isAlertModalOpened = true;
      this.selectedReivew = {
        myReviewIdx,
        course_id,
        review_id,
      };
    },
    async openUpdateModal(myReviewIdx, course_id, review_id) {
      this.isReviewModalOpened = true;
      this.selectedReivew = {
        myReviewIdx,
        course_id,
        review_id,
      };

      const response = await this.$axios.$get(
        `/api/reviews/courses/${course_id}/${review_id}`
      );

      const { q1, q2, q3, q4, pros, cons } = response;

      this.$store.commit("changeQ1score", q1);
      this.$store.commit("changeQ2score", q2);
      this.$store.commit("changeQ3score", q3);
      this.$store.commit("changeQ4score", q4);
      this.$store.commit("changeQ5pros", pros);
      this.$store.commit("changeQ5cons", cons);

      // console.log(response);
    },
    async getAllMyReview() {
      this.myAllReviewData = await this.$axios.$get("/api/reviews/me");
    },
    async updateReviewData() {
      const { myReviewIdx, course_id, review_id } = this.selectedReivew;

      const response = await this.$axios.$patch(
        `/api/reviews/courses/${course_id}/${review_id}`,
        {
          q1: this.$store.state.q1score,
          q2: this.$store.state.q2score,
          q3: this.$store.state.q3score,
          q4: this.$store.state.q4score,
          pros: this.$store.state.q5pros,
          cons: this.$store.state.q5cons,
        }
      );
      // console.log(response);

      if (response) {
        this.getAllMyReview();
      }

      this.isReviewModalOpened = false;
    },
  },
};
</script>

<style lang="postcss" scoped></style>
