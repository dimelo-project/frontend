<template>
  <div class="mb-96">
    <span class="txt-sub">총 {{ myLectureData.length }}건</span>
    <div class="mt-3 border-t-2 border-gray2"></div>

    <div v-if="myLectureData.length === 0" class="mt-10 text-center txt-base">
      <span>관심 강의가 없습니다.</span>
    </div>

    <!-- lecture cards -->
    <div
      class="mt-16 mb-8"
      v-for="(lecture, index) in myLectureData"
      :key="index"
    >
      <div class="flex">
        <!-- site logo image -->
        <div class="mr-6" style="width: 69px; height: 69px">
          <img
            class="max-w-none"
            :src="$getLectureBrandLogo(lecture['course_platform'])"
            alt="강의사이트"
          />
        </div>

        <!-- card body -->
        <div class="w-full h-full">
          <!-- first line -->
          <div class="flex justify-between">
            <!-- course title -->
            <div style="width: 440px">
              <p class="txt-base-bold">{{ lecture["course_title"] }}</p>
            </div>
            <!-- review star & score -->
            <div class="flex items-center">
              <StarRate :score="lecture['course_avg']" />

              <span class="ml-1 txt-base-bold">{{
                lecture["course_avg"]
              }}</span>
              <span class="txt-mini">({{ lecture["num_review"] }})</span>
            </div>
          </div>

          <!-- second line -->
          <div class="flex justify-between mt-4 text-black1">
            <div class="flex items-center">
              <span
                class="mr-4 underline cursor-pointer txt-sub-bold text-orange2"
                @click="$router.push(`/tutorinfo/${lecture['instructor_id']}`)"
              >
                {{ lecture["instructor_name"] }}
              </span>
              <span class="mr-1 text-gray1 txt-sub">{{
                lecture["course_platform"]
              }}</span>
              <span class="text-gray1 txt-sub">{{
                `${Number(lecture["course_price"]).toLocaleString()}원`
              }}</span>
              <a :href="lecture['course_siteUrl']" target="_blank">
                <span class="ml-1 underline cursor-pointer txt-sub text-gray1">
                  보러가기
                </span>
              </a>
            </div>

            <div class="flex items-center">
              <div @click="clickHeartIcon(index, lecture['course_id'])">
                <SvgHeartOutline
                  :fill="`#FF6B6B`"
                  :color="`#FF6B6B`"
                  class="cursor-pointer"
                />
              </div>

              <div v-if="Number(lecture['num_review']) === 0">
                <ButtonGeneral
                  :width="172"
                  :height="32"
                  class="ml-3 border pointer-events-none text-gray6 txt-base rounded-4px border-gray2"
                >
                  <span>아직 리뷰가 없습니다</span>
                </ButtonGeneral>
              </div>
              <div v-else>
                <NuxtLink :to="`/review/${lecture['course_id']}`">
                  <ButtonGeneral
                    :width="172"
                    :height="32"
                    class="ml-3 text-white transition-colors txt-base rounded-4px bg-orange1 hover:bg-orange2"
                  >
                    <span>{{ lecture["num_review"] }}개의 리뷰 보기</span>
                  </ButtonGeneral>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- divider -->
      <div class="mt-8 border-b border-gray5"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "mypage",
  async asyncData({ $axios }) {
    const myLectureData = await $axios.$get("/api/courses/likes/me");
    // console.log("myLectureData", myLectureData);

    return { myLectureData };
  },
  mounted() {
    this.$store.commit("changeCntCategoryIdx", 4);
  },
  methods: {
    async clickHeartIcon(dataIdx, course_id) {
      try {
        const response = await this.$axios.$delete(
          `/api/courses/likes/${course_id}`
        );

        // console.log(response);
        if (response) {
          this.myLectureData.splice(dataIdx, 1);
        }
      } catch (err) {
        console.error(err.response);
      }
    },
  },
};
</script>

<style lang="postcss" scoped></style>
