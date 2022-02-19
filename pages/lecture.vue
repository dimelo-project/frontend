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
          :value="categorySearchInput"
          @input="handleCategorySearchInput"
          :placeholder="`카테고리 내 검색`"
          class="flex items-center rounded-4px txt-sub bg-gray4 py-1.5 px-2 border-gray2 border"
          style="width: 276px; height: 32px"
        >
          <InputGeneral
            v-model="categorySearchInput"
            :placeholder="`카테고리 내 검색`"
            :type="`text`"
            :height="22"
            class="bg-transparent border-none"
          />
          <div @click="searchByCategoryInput">
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
              :src="cardImageLogo(lecture['course_platform'])"
              alt="강의사이트"
            />
          </div>

          <!-- Rank -->
          <div
            style="margin-left: 24px; margin-right: 24px"
            :class="{ 'text-orange2': index <= 2 && currentPageIndex === 0 }"
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
                <SvgHeartOutline class="cursor-pointer" />

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
                  <NuxtLink :to="`review/${lecture['course_id']}`">
                    <ButtonGeneral
                      :width="172"
                      :height="32"
                      class="ml-3 text-white txt-base rounded-4px bg-orange1"
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

      <!-- pagination buttons -->
      <div class="flex justify-center my-16">
        <PaginationGeneral
          :pageIdx="currentPageIndex"
          :pageNum="currentPageNum"
          @click="clickPaginationBtn"
        />
      </div>
    </div>

    <!-- right side, popular keyword tabs -->
    <div class="relative" style="width: 174px; margin-left: 108px">
      <div class="sticky" style="top: 185px">
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
          class="py-2 pl-5 mb-2 cursor-pointer bg-gray3 rounded-4px"
        >
          <span class="txt-sub">{{ tech.skill_skill }}</span>
        </div>
      </div>
    </div>

    <!-- scroll to top button -->
    <div
      class="fixed flex justify-end invisible xl:visible"
      style="left: calc(50% - 534px - 100px); bottom: 100px"
      @click="ScrollToTop"
    >
      <ScrollToTop />
    </div>
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
      searchAllKeyword,
      searchCategoryKeyword,
    } = query;

    let currentCategoryIndex;

    ["개발", "데이터 과학", "디자인"].forEach((elem, idx) => {
      if (elem === categoryBig) {
        currentCategoryIndex = idx;
        return;
      }
    });

    let lectureData, popularTechData, countResponse, currentPageNum;

    if (searchCategoryKeyword) {
      // category search + category filtering
      lectureData = await $axios.$post(
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
    } else if (searchAllKeyword) {
      // all search + category filtering
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

      countResponse = await $axios.$get("/api/courses/count", {
        params: {
          categoryBig,
          category,
          skill,
        },
      });
    }

    currentPageNum = Math.ceil(Number(countResponse["num_course"]) / 17);

    console.log(lectureData);

    return {
      lectureData,
      popularTechData,
      currentPageNum,
      currentCategoryIndex,
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
        searchAllKeyword,
        searchCategoryKeyword,
      } = to.query;

      ["개발", "데이터 과학", "디자인"].forEach((elem, idx) => {
        if (elem === categoryBig) {
          this.currentCategoryIndex = idx;
          return;
        }
      });

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

      let countResponse;

      try {
        if (searchCategoryKeyword) {
          // category search + category filtering
          this.lectureData = await this.$axios.$post(
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

          this.popularTechData = await this.$axios.$get(
            "/api/courses/category/skills",
            {
              params: {
                categoryBig,
                category,
              },
            }
          );

          countResponse = await this.$axios.$post(
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
        } else if (searchAllKeyword) {
          // all search + category filtering
        } else {
          // only category filtering
          this.lectureData = await this.$axios.$get("/api/courses", {
            params: {
              categoryBig,
              category,
              perPage,
              page,
              sort,
              skill,
            },
          });

          this.popularTechData = await this.$axios.$get(
            "/api/courses/category/skills",
            {
              params: {
                categoryBig,
                category,
              },
            }
          );

          countResponse = await this.$axios.$get("/api/courses/count", {
            params: {
              categoryBig,
              category,
              skill,
            },
          });
        }
      } catch (err) {
        console.log(err.response);
      }

      this.currentPageNum = Math.ceil(Number(countResponse["num_course"]) / 17);
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
      this.getLectureData();
    },
    selectMajor(majorIdx) {
      this.currentMajorIndex = majorIdx;
      this.currentPopularKeyword = null;
      this.currentPageIndex = 0;
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
    searchByCategoryInput() {
      this.$router.push({
        path: "/lecture",
        query: {
          categoryBig: this.currentCategoryName,
          category: this.currentMajorName,
          perPage: 17,
          page: this.currentPageIndex + 1,
          sort: this.currentFilteringOptionName,
          skill: this.currentPopularKeyword,
          searchCategoryKeyword: this.categorySearchInput,
        },
      });
    },
    async getLectureData() {
      this.$router.push({
        path: "/lecture",
        query: {
          categoryBig: this.currentCategoryName,
          category: this.currentMajorName,
          perPage: 17,
          page: this.currentPageIndex + 1,
          sort: this.currentFilteringOptionName,
          skill: this.currentPopularKeyword,
          searchCategoryKeyword: this.categorySearchInput,
        },
      });
    },
    ScrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.$store.commit("showHeaderSearchInput");
  },
  destroyed() {
    this.$store.commit("hideHeaderSearchInput");
  },
};
</script>

<style lang="postcss" scoped>
.test {
  /* @apply border border-orange2; */
}
</style>
