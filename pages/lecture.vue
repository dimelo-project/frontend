<template>
  <div class="flex justify-center select-none text-black1">
    <div style="width: 888px" class="relative test">
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
          class="mr-6 cursor-pointer mb-4px hover:text-orange2 hover:font-bold"
          :class="{
            'text-orange2 font-bold': major.id === currentMajorIndex,
          }"
          @click="selectMajor(major.id)"
        >
          {{ major.name }}
        </div>
      </div>

      <!-- breadcrumb navigation -->
      <div style="margin-top: 70px">
        <p class="txt-sub">
          {{ currentCategoryName }} >
          <span class="font-bold">{{ currentMajorName }}</span>
        </p>
      </div>

      <!-- search & filtering buttons -->
      <div class="flex justify-between mt-4">
        <SearchGeneral
          :value="categorySearchInput"
          @input="handleCategorySearchInput"
          :placeholder="`카테고리 내 검색`"
          :width="276"
        />

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
      <div class="mt-16 mb-8" v-for="i in 17" :key="i">
        <div class="flex">
          <!-- site logo image -->
          <div class="flex items-center">
            <div
              style="width: 69px; height: 69px; font-size: 10px"
              class="flex items-center justify-center text-white rounded-8px bg-black1"
            >
              <span class="mx-8px">사이트 로고 이미지</span>
            </div>
          </div>

          <!-- Rank -->
          <div
            style="margin-left: 24px; margin-right: 24px"
            class="txt-mid-bold text-orange2"
          >
            <span class=""> 1 </span>
          </div>

          <!-- card body -->
          <div class="w-full h-full">
            <!-- first line -->
            <div class="flex justify-between txt-mid-bold">
              <p class="">파이썬 끝내기 1개월</p>
              <div class="flex items-center">
                <SvgReviewStar />
                <SvgReviewStar />
                <SvgReviewStar />
                <SvgReviewStar />
                <SvgReviewStar />

                <span class="ml-8px">5.0</span>
              </div>
            </div>

            <!-- second line -->
            <div class="flex justify-between mt-4 text-black1">
              <div class="flex items-center">
                <span class="mr-1 font-bold">강사</span>
                <span class="mr-4 underline">김지원</span>
                <span class="mr-1 text-gray1">강의사이트명</span>
                <span class="mr-5 text-gray1">00,000원</span>
                <SvgHeartOutline />
              </div>

              <div class="flex items-center">
                <span class="mr-6 font-bold leading-5 underline"
                  >강의 보러가기</span
                >
                <ButtonGeneral
                  :width="160"
                  :height="32"
                  :btnText="`0개의 리뷰 보기`"
                  class="txt-base"
                />
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
          @click="clickPaginationBtn"
        />
      </div>
    </div>

    <!-- right side, popular keyword tabs -->
    <div class="relative" style="width: 174px; margin-left: 108px">
      <div class="sticky" style="top: 185px">
        <div class="flex mb-6">
          <p class="txt-mid-bold">기술 키워드</p>
          <img src="~assets/imgs/dizzy.png" />
        </div>
        <div
          v-for="i in 10"
          :key="i"
          class="py-2 pl-2 mb-2 bg-gray3 rounded-4px"
        >
          <span>인기 기술 키워드</span>
        </div>

        <!-- scroll to top button -->
        <div class="flex justify-end mt-20">
          <ScrollToTop />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "home",
  data() {
    return {
      currentCategoryIndex: 1,
      currentMajorIndex: 0,
      currentFilteringOptionIndex: 0,
      currentPageIndex: 0,
      categorySearchInput: "",
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
          position: "데이터 사이언스",
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
            { id: 2, name: "디자인 도구" },
            { id: 3, name: "사용자 경험 디자인" },
            { id: 4, name: "게임 디자인" },
            { id: 5, name: "3D 및 애니메이션" },
            { id: 6, name: "패션 디자인" },
            { id: 7, name: "건축 디자인" },
            { id: 8, name: "인테리어 디자인" },
            { id: 9, name: "기타" },
          ],
        },
      ],
      filteringOptions: [
        {
          id: 0,
          name: "별점순",
        },
        {
          id: 1,
          name: "리뷰많은순",
        },
      ],
    };
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
  },
  methods: {
    selectCategory(categoryIdx) {
      this.currentCategoryIndex = categoryIdx;
      this.currentMajorIndex = 0;
    },
    selectMajor(majorIdx) {
      this.currentMajorIndex = majorIdx;
    },
    handleCategorySearchInput(value) {
      this.categorySearchInput = value;
    },
    clickFilteringOption(selectedFilteringOptionIdx) {
      this.currentFilteringOptionIndex = selectedFilteringOptionIdx;
    },
    clickPaginationBtn(selectedPageIdx) {
      this.currentPageIndex = selectedPageIdx;
    },
  },
  mounted() {
    console.log(this.$store);
    this.$store.commit("showHeaderSearchInput");
  },
  destroyed() {
    console.log("destroy!");
    this.$store.commit("hideHeaderSearchInput");
  },
};
</script>

<style lang="postcss" scoped>
.test {
  /* @apply border border-orange2; */
}
</style>
