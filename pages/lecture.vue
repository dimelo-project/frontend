<template>
  <div class="flex justify-center select-none text-black1">
    <div style="width: 786px" class="relative test">
      <!-- category -->
      <div class="flex text-left mt-14">
        <p
          v-for="category in categories"
          :key="category.id"
          class="mr-10 cursor-pointer txt-mid-bold text-gray1 hover:text-black1"
          :class="{
            'border-black1 border-b-2px text-black1':
              category.id === currentCategoryIndex,
          }"
          @click="selectCategory(category.id)"
        >
          {{ category.position }}
        </p>
      </div>

      <!-- major -->
      <div class="flex flex-wrap mt-7">
        <div
          v-for="major in currentMajors"
          :key="major.id"
          class="mb-3 mr-6 cursor-pointer hover:text-orange2 hover:font-bold"
          :class="{
            'text-orange2 font-bold': major.id === currentMajorIndex,
          }"
          @click="selectMajor(major.id)"
        >
          {{ major.name }}
        </div>
      </div>

      <!-- breadcrumb navigation -->
      <div style="margin-top: 64px">
        <p class="txt-sub">
          {{ currentCategoryName }} >
          <span :class="{ 'txt-sub-bold': !currentPopularKeyword }">
            {{ currentMajorName }}
          </span>
          <span class="txt-sub-bold" v-if="currentPopularKeyword">
            > {{ currentPopularKeyword }}
          </span>
        </p>
      </div>

      <!-- search & filtering buttons -->
      <div class="flex items-center justify-between mt-4">
        <SearchGeneral
          class="flex items-center rounded-4px txt-sub bg-gray4 py-1.5 px-2 border-gray2 border"
          style="width: 276px; height: 32px"
        >
          <InputGeneral
            v-model="categorySearchInput"
            @keyup.enter="routerPushWithCategorySearch"
            :placeholder="`카테고리 내 검색`"
            :type="`text`"
            :height="22"
            class="bg-transparent border-none"
          />
          <div @click="routerPushWithCategorySearch">
            <SvgSearchOutline
              class="ml-1 cursor-pointer"
              :width="20"
              :height="20"
            />
          </div>
        </SearchGeneral>

        <div>
          <span
            v-for="filteringOption in filteringOptions"
            :key="filteringOption.id"
            class="cursor-pointer ml-8px"
            :class="{
              'text-orange2 font-bold':
                filteringOption.id === currentFilteringOptionIndex,
            }"
            @click="clickFilteringOption(filteringOption.id)"
            >{{ filteringOption.name }}</span
          >
        </div>
      </div>

      <div
        v-if="lectureData.length === 0"
        class="flex flex-col items-center mt-16 mb-96"
      >
        <span class="txt-mid">검색 결과가 없습니다.</span>
        <span class="mt-2 txt-sub-bold text-orange2"
          >카테고리를 이동하거나 기술 키워드로 검색해 보세요.</span
        >
        <span class="mt-6 text-center"
          >리뷰를 쓰고 싶은데 강의가 없나요?<br />
          필요한 강의를 알려주시면 등록할게요!</span
        >

        <ButtonGeneral
          @click="goToWriteNewLectureReview"
          :width="240"
          :height="44"
          class="mt-8 text-white rounded-4px bg-orange1 hover:bg-orange2"
        >
          <span class="txt-base-bold">강의 등록 신청하고 리뷰 작성</span>
        </ButtonGeneral>
      </div>

      <div v-else>
        <!-- lecture cards -->
        <div
          class="mt-16 mb-8"
          v-for="(lecture, index) in lectureData"
          :key="index"
        >
          <div class="flex">
            <!-- site logo image -->
            <div class="" style="width: 69px; height: 69px">
              <img
                class="max-w-none"
                :src="$getLectureBrandLogo(lecture['course_platform'])"
                alt="강의사이트"
              />
            </div>

            <!-- Rank -->
            <div
              style="margin-left: 24px; margin-right: 24px"
              :class="[
                index <= 2 && currentPageIndex === 0
                  ? 'text-orange2'
                  : 'text-gray1',
              ]"
              class="txt-mid"
            >
              <span class=""> {{ 17 * currentPageIndex + index + 1 }} </span>
            </div>

            <!-- card body -->
            <div class="w-full h-full">
              <!-- first line -->
              <div class="flex justify-between">
                <!-- course title -->
                <div style="width: 440px">
                  <NuxtLink :to="`/review/${lecture['course_id']}`">
                    <span
                      class="cursor-pointer txt-base-bold hover:underline"
                      >{{ lecture["course_title"] }}</span
                    >
                  </NuxtLink>
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
                    @click="
                      $router.push(`/tutorinfo/${lecture['instructor_id']}`)
                    "
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
                    <span
                      class="ml-1 underline cursor-pointer txt-sub text-gray1"
                    >
                      보러가기
                    </span>
                  </a>
                </div>

                <div class="flex items-center">
                  <div
                    v-if="
                      $auth &&
                      $auth.user &&
                      lecture['course_liked'] &&
                      lecture['course_liked'] === 'true'
                    "
                    @click="removeHeartToLecture(index, lecture['course_id'])"
                  >
                    <SvgHeartOutline
                      :color="`#ff6b6b`"
                      :fill="`#ff6b6b`"
                      class="cursor-pointer"
                    />
                  </div>
                  <div
                    v-if="
                      $auth &&
                      $auth.user &&
                      lecture['course_liked'] &&
                      lecture['course_liked'] === 'false'
                    "
                    @click="giveHeartToLecture(index, lecture['course_id'])"
                  >
                    <SvgHeartOutline
                      :color="`#868296`"
                      class="cursor-pointer"
                    />
                  </div>

                  <div v-if="Number(lecture['num_review']) === 0">
                    <ButtonGeneral
                      @click="
                        $store.commit(
                          'lecture/changeIsAskToBeFirstReviewerModalOpened',
                          true
                        );
                        $store.commit(
                          'lecture/changeSelectedCourseIdx',
                          lecture['course_id']
                        );
                      "
                      :width="172"
                      :height="32"
                      class="ml-3 border text-gray6 txt-base rounded-4px border-gray2"
                    >
                      <span>아직 리뷰가 없습니다</span>
                    </ButtonGeneral>
                  </div>
                  <div v-else>
                    <NuxtLink :to="`review/${lecture['course_id']}`">
                      <ButtonGeneral
                        :width="172"
                        :height="32"
                        class="ml-3 text-white txt-base rounded-4px bg-orange1 hover:bg-orange2"
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

      <!-- pagination buttons -->
      <div v-if="lectureData.length > 0" class="flex justify-center my-16">
        <PaginationGeneral
          :pageIdx="currentPageIndex"
          :pageNum="currentPageNum"
          @click="clickPaginationBtn"
        />
      </div>
    </div>

    <!-- right side, popular keyword tabs -->
    <div class="relative" style="width: 174px; margin-left: 108px">
      <div
        class="2xl:sticky 2xl:top-44 lg:absolute lg:top-16"
        style="top: 185px"
      >
        <div class="flex mb-6">
          <p class="txt-mid-bold">기술 키워드</p>
          <img
            src="~assets/imgs/dizzy.png"
            style="width: 24px; height: 24px"
            class="ml-1"
          />
        </div>
        <div
          v-for="(tech, index) in popularTechData"
          :key="index"
          @click="clickPopularTech(tech.skill_skill)"
          :class="[
            tech.skill_skill === currentPopularKeyword
              ? 'bg-yellow1'
              : 'bg-gray3',
          ]"
          class="py-2 pl-5 mb-2 cursor-pointer rounded-4px hover:bg-yellow1"
          style="width: 160px"
        >
          <span class="txt-sub">{{ tech.skill_skill }}</span>
        </div>
      </div>
    </div>

    <!-- scroll to top button -->
    <transition name="fade">
      <div
        v-if="isUserScrolling"
        class="fixed flex justify-end invisible xl:visible"
        style="left: calc(50% - 534px - 100px); bottom: 100px"
        @click="ScrollToTop"
      >
        <ScrollToTop />
      </div>
    </transition>

    <!-- 새로운 강의 추가해서 리뷰 생성할때 열리는 모달 -->
    <LectureAddNewLectureModal
      :isModalOpened="$store.state.lecture.isAddLectureModalOpened"
      @modalclosed="
        $store.commit('lecture/changeIsAddLectureModalOpened', false)
      "
    />

    <!-- "아직 리뷰가 없습니다" 버튼 클릭시 열리는 모달 -->
    <LectureAskToBeFirstReviewerModal />

    <!-- 리뷰 작성 모달 -->
    <MultiSteps
      :isModalOpened="$store.state.lecture.isCreateReviewModalOpened"
      @modalClose="closeCreateReviewModal"
      @reviewUpload="uploadReviewForNewLecture"
    />
  </div>
</template>

<script>
export default {
  layout: "home",
  middleware({ redirect, query }) {
    if (Object.entries(query).length === 0) {
      return redirect("/lecture", {
        categoryBig: "개발",
        category: "웹 개발",
        perPage: 17,
        page: 1,
        sort: "avg",
      });
    }
  },
  async asyncData({ $axios, query }) {
    const {
      categoryBig,
      category,
      perPage,
      page,
      sort,
      skill,
      searchCategoryKeyword,
    } = query;

    let currentCategoryIndex, categorySearchInput, currentPopularKeyword;

    ["개발", "데이터 과학", "디자인"].forEach((elem, idx) => {
      if (elem === categoryBig) {
        currentCategoryIndex = idx;
        return;
      }
    });
    // console.log("currentCategoryIndex", currentCategoryIndex);

    if (searchCategoryKeyword) {
      categorySearchInput = searchCategoryKeyword;
    } else {
      categorySearchInput = "";
    }

    if (skill) {
      currentPopularKeyword = skill;
    }

    let lectureData,
      lectureDataResponse,
      popularTechData,
      countResponse,
      currentPageNum;

    if (searchCategoryKeyword) {
      // category search + category filtering

      try {
        lectureDataResponse = await $axios.$post(
          "/api/courses/category/search",
          {
            keyword: searchCategoryKeyword,
          },
          {
            params: {
              categoryBig,
              category,
              perPage,
              page,
              sort,
              skill,
            },
          }
        );

        if (lectureDataResponse) {
          lectureData = lectureDataResponse;
        }
      } catch (err) {
        if (err.response.data.statusCode === 404) {
          lectureData = [];
        } else {
          console.log(err.response.data);
        }
      }

      popularTechData = await $axios.$get("/api/courses/category/skills", {
        params: {
          categoryBig,
          category,
        },
      });

      countResponse = await $axios.$post(
        "/api/courses/category/search/count",
        {
          keyword: searchCategoryKeyword,
        },
        {
          params: {
            categoryBig,
            category,
            skill,
          },
        }
      );
    } else {
      // only category filtering
      lectureData = await $axios.$get("/api/courses", {
        params: {
          categoryBig,
          category,
          perPage,
          page,
          sort,
          skill,
        },
      });

      popularTechData = await $axios.$get("/api/courses/category/skills", {
        params: {
          categoryBig,
          category,
        },
      });

      let countResponseParam = {};

      countResponseParam["categoryBig"] = categoryBig;
      countResponseParam["category"] = category;
      if (skill) {
        countResponseParam["skill"] = skill;
      }
      console.log("countResponseParam", countResponseParam);
      countResponse = await $axios.$get("/api/courses/count", {
        params: countResponseParam,
      });
    }

    currentPageNum = Math.ceil(Number(countResponse["num_course"]) / 17);

    console.log(lectureData);

    return {
      lectureData,
      popularTechData,
      currentPageNum,
      currentCategoryIndex,
      categorySearchInput,
      currentPopularKeyword,
    };
  },
  data() {
    return {
      currentCategoryIndex: 0,
      currentMajorIndex: 0,
      currentFilteringOptionIndex: 0,
      currentPopularKeyword: null,
      currentPageIndex: 0,
      currentPageNum: 0,
      categorySearchInput: "",
      lectureData: [],
      categories: [
        {
          id: 0,
          position: "개발",
          majors: [
            { id: 0, name: "웹 개발" },
            { id: 1, name: "프론트엔드" },
            { id: 2, name: "백엔드" },
            { id: 3, name: "풀스택" },
            { id: 4, name: "모바일 앱 개발" },
            { id: 5, name: "프로그래밍 언어" },
            { id: 6, name: "알고리즘·자료구조" },
            { id: 7, name: "데이터베이스" },
            { id: 8, name: "개발도구" },
            { id: 9, name: "데브옵스·인프라" },
            { id: 10, name: "게임 개발" },
            { id: 11, name: "임베디드·IoT" },
            { id: 12, name: "데스크톱 앱 개발" },
            { id: 13, name: "기타" },
          ],
        },
        {
          id: 1,
          position: "데이터 과학",
          majors: [
            { id: 0, name: "데이터 분석" },
            { id: 1, name: "인공지능" },
            { id: 2, name: "데이터 시각화" },
            { id: 3, name: "데이터 수집·처리" },
            { id: 4, name: "기타" },
          ],
        },
        {
          id: 2,
          position: "디자인",
          majors: [
            { id: 0, name: "웹 디자인" },
            { id: 1, name: "그래픽 디자인 및 일러스트레이션" },
            { id: 2, name: "브랜드 디자인" },
            { id: 3, name: "영상 디자인" },
            { id: 4, name: "디자인 도구" },
            { id: 5, name: "사용자 경험 디자인" },
            { id: 6, name: "게임 디자인" },
            { id: 7, name: "3D 및 애니메이션" },
            { id: 8, name: "건축 디자인" },
            { id: 9, name: "기타" },
          ],
        },
      ],
      filteringOptions: [
        {
          id: 0,
          pName: "avg",
          name: "별점순",
        },
        {
          id: 1,
          pName: "num_review",
          name: "리뷰많은순",
        },
      ],
      popularTechData: [],
      isUserScrolling: false,
    };
  },
  watch: {
    async $route(to, from) {
      console.log("route change!", to);
      const {
        categoryBig,
        category,
        perPage,
        page,
        sort,
        skill,
        searchCategoryKeyword,
      } = to.query;

      ["개발", "데이터 과학", "디자인"].forEach((elem, idx) => {
        if (elem === categoryBig) {
          this.currentCategoryIndex = idx;
          return;
        }
      });

      if (searchCategoryKeyword) {
        this.categorySearchInput = searchCategoryKeyword;
      } else {
        this.categorySearchInput = "";
      }

      this.categories[this.currentCategoryIndex]["majors"].forEach(
        (elem, idx) => {
          if (elem.name === category) {
            this.currentMajorIndex = idx;
            return;
          }
        }
      );

      if (!skill) {
        this.currentPopularKeyword = null;
      }

      if (searchCategoryKeyword) {
        // 카테고리에서 검색하는 경우
        this.getLectureDataWithCategorySearch(to.query);
        this.getPopularTechDataWithCategorySearch(to.query);
        this.getNumOfCountDataWithCategorySearch(to.query); // 전체에서 검색하는 경우
      } else {
        // 단순 카테고리 필터링
        this.getLectureDataGeneral(to.query);
        this.getPopularTechDataGeneral(to.query);
        this.getNumOfCountDataGeneral(to.query);
      }
    },
  },
  computed: {
    currentMajors() {
      return this.categories[this.currentCategoryIndex]["majors"];
    },
    currentCategoryName() {
      return this.categories[this.currentCategoryIndex]["position"];
    },
    currentMajorName() {
      return this.categories[this.currentCategoryIndex]["majors"][
        this.currentMajorIndex
      ]["name"];
    },
    currentFilteringOptionName() {
      return this.filteringOptions[this.currentFilteringOptionIndex]["pName"];
    },
  },
  methods: {
    selectCategory(categoryIdx) {
      this.currentCategoryIndex = categoryIdx;
      this.currentMajorIndex = 0;
      this.currentPopularKeyword = null;
      this.categorySearchInput = "";
      this.getLectureData();
    },
    selectMajor(majorIdx) {
      this.currentMajorIndex = majorIdx;
      this.currentPopularKeyword = null;
      this.currentPageIndex = 0;
      this.categorySearchInput = "";
      this.getLectureData();
    },
    handleCategorySearchInput(value) {
      this.categorySearchInput = value;
    },
    clickFilteringOption(selectedFilteringOptionIdx) {
      this.currentFilteringOptionIndex = selectedFilteringOptionIdx;
      this.getLectureData();
    },
    clickPopularTech(keyword) {
      this.currentPopularKeyword = keyword;
      this.currentPageIndex = 0;
      this.getLectureData();
    },
    clickPaginationBtn(selectedPageIdx) {
      this.currentPageIndex = selectedPageIdx;
      this.getLectureData();
      this.ScrollToTop();
    },
    routerPushWithCategorySearch() {
      this.currentPageIndex = 0;

      if (this.categorySearchInput) {
        this.$router.push({
          path: "/lecture",
          query: {
            categoryBig: this.currentCategoryName,
            category: this.currentMajorName,
            perPage: 17,
            page: 1,
            sort: this.currentFilteringOptionName,
            skill: this.currentPopularKeyword,
            searchCategoryKeyword: this.categorySearchInput,
          },
        });
      }
    },
    async getLectureDataWithCategorySearch(query) {
      const {
        categoryBig,
        category,
        perPage,
        page,
        sort,
        skill,
        searchCategoryKeyword,
      } = query;

      try {
        const lectureDataResponse = await this.$axios.$post(
          "/api/courses/category/search",
          {
            keyword: searchCategoryKeyword,
          },
          {
            params: {
              categoryBig,
              category,
              perPage,
              page,
              sort,
              skill,
            },
          }
        );

        if (lectureDataResponse) {
          this.lectureData = lectureDataResponse;
        }
      } catch (err) {
        if (err.response.data.statusCode === 404) {
          this.lectureData = [];
        }
        console.error(err);
      }
    },
    async getPopularTechDataWithCategorySearch(query) {
      const {
        categoryBig,
        category,
        perPage,
        page,
        sort,
        skill,
        searchCategoryKeyword,
      } = query;

      try {
        const popularTechDataResponse = await this.$axios.$get(
          "/api/courses/category/skills",
          {
            params: {
              categoryBig,
              category,
              perPage,
              page,
              sort,
              skill,
              searchCategoryKeyword,
            },
          }
        );

        if (popularTechDataResponse) {
          this.popularTechData = popularTechDataResponse;
        }
      } catch (err) {
        console.error(err.response);
      }
    },
    async getNumOfCountDataWithCategorySearch(query) {
      const { categoryBig, category, skill, searchCategoryKeyword } = query;

      try {
        const countResponse = await this.$axios.$post(
          "/api/courses/category/search/count",
          {
            keyword: searchCategoryKeyword,
          },
          {
            params: {
              categoryBig,
              category,
              skill,
            },
          }
        );

        if (countResponse) {
          this.currentPageNum = Math.ceil(
            Number(countResponse["num_course"]) / 17
          );
        }
      } catch (err) {
        console.error(err.response);
      }
    },
    async getLectureDataGeneral(query) {
      const { categoryBig, category, perPage, page, sort, skill } = query;

      try {
        const lectureDataResponse = await this.$axios.$get("/api/courses", {
          params: {
            categoryBig,
            category,
            perPage,
            page,
            sort,
            skill,
          },
        });

        if (lectureDataResponse) {
          this.lectureData = lectureDataResponse;
        }
      } catch (err) {
        console.error(err.response);
      }
    },
    async getPopularTechDataGeneral(query) {
      const { categoryBig, category, perPage, page, sort, skill } = query;

      try {
        const popularTechDataResponse = await this.$axios.$get(
          "/api/courses/category/skills",
          {
            params: {
              categoryBig,
              category,
              perPage,
              page,
              sort,
              skill,
            },
          }
        );

        if (popularTechDataResponse) {
          this.popularTechData = popularTechDataResponse;
        }
      } catch (err) {
        console.error(err.response);
      }
    },
    async getNumOfCountDataGeneral(query) {
      const { categoryBig, category, skill } = query;

      try {
        const countResponse = await this.$axios.$get("/api/courses/count", {
          params: {
            categoryBig,
            category,
            skill,
          },
        });

        if (countResponse) {
          this.currentPageNum = Math.ceil(
            Number(countResponse["num_course"]) / 17
          );
        }
      } catch (err) {
        console.error(err.response);
      }
    },
    getLectureData() {
      let queryData = {};

      queryData["categoryBig"] = this.currentCategoryName;
      queryData["category"] = this.currentMajorName;
      queryData["perPage"] = 17;
      queryData["page"] = this.currentPageIndex + 1;
      if (this.currentFilteringOptionName) {
        queryData["sort"] = this.currentFilteringOptionName;
      }
      if (this.currentPopularKeyword) {
        queryData["skill"] = this.currentPopularKeyword;
      }
      if (this.categorySearchInput) {
        queryData["searchCategoryKeyword"] = this.categorySearchInput;
      }

      this.$router.push({
        path: "/lecture",
        query: queryData,
      });
    },
    ScrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    async giveHeartToLecture(lectureIdx, course_id) {
      try {
        // console.log("give heart idx", lectureIdx);
        const response = await this.$axios.$post(
          `/api/courses/likes/${course_id}`
        );
        if (response) {
          this.lectureData[lectureIdx]["course_liked"] = "true";
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
          this.lectureData[lectureIdx]["course_liked"] = "false";
        }
      } catch (err) {
        console.log(err);
      }
    },
    closeCreateReviewModal() {
      this.$store.commit("lecture/changeIsCreateReviewModalOpened", false);
      this.$store.commit("lecture/changeNewLectureUrl", "");
    },
    async uploadReviewForNewLecture() {
      try {
        const response = await this.$axios.$post("/api/reviews", {
          q1: this.$store.state.q1score,
          q2: this.$store.state.q2score,
          q3: this.$store.state.q3score,
          q4: this.$store.state.q4score,
          pros: this.$store.state.q5pros,
          cons: this.$store.state.q5cons,
          siteUrl: this.$store.state.lecture.newLectureUrl,
        });
      } catch (err) {
        console.log(err);
      }
      this.$store.commit("lecture/changeIsCreateReviewModalOpened", false);
      this.$store.commit("lecture/changeNewLectureUrl", "");
    },
    scrollHandler() {
      // console.log(window.scrollY);
      if (window.scrollY > 500) {
        this.isUserScrolling = true;
      } else {
        this.isUserScrolling = false;
      }
    },
    goToWriteNewLectureReview() {
      if (!this.$store.getters["authentication/isUserLoggedIn"]) {
        this.$store.commit("loginModal/changeIsLoginModalOpened", true);
        return;
      }

      if (!this.$store.getters["authentication/isAlreadyProfileSet"]) {
        this.$store.commit("requireProfileSetModal/changeIsModalOpened", true);
        return;
      }

      this.$store.commit("lecture/changeIsAddLectureModalOpened", true);
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
.test {
  /* @apply border border-orange2; */
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
