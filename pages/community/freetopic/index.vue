<template>
  <div class="flex justify-center select-none">
    <div style="width: 786px">
      <!-- category menu & post button -->
      <div class="flex items-center justify-between mt-16">
        <div class="">
          <span
            v-for="(menu, idx) in categoryMenu"
            @click="clickCategoryMenu(idx)"
            :key="idx"
            class="mr-5 cursor-pointer"
            :class="{ 'font-bold text-orange2': idx === currentMenuIdx }"
          >
            {{ menu.name }}
          </span>
        </div>

        <div>
          <NuxtLink to="/community/freetopic/post">
            <ButtonGeneral
              :width="88"
              :height="44"
              class="font-bold text-white rounded-8px txt-base bg-orange1 hover:bg-orange2"
            >
              <span>글쓰기</span>
            </ButtonGeneral></NuxtLink
          >
        </div>
      </div>

      <!-- Search Box -->
      <SearchGeneral
        class="flex items-center w-full p-4 mt-10 bg-white border rounded-8px"
        :class="[
          freetopicSearchInput.length > 0 ? ' border-orange2' : ' border-gray2',
        ]"
        style="height: 56px"
      >
        <div @click="searchByUserInput">
          <SvgSearchOutline class="cursor-pointer" :width="24" :height="24" />
        </div>
        <InputGeneral
          :value="freetopicSearchInput"
          @input="handleSearchInput"
          :placeholder="`검색으로 원하는 내용을 빠르게 찾아보세요!`"
          :type="`text`"
          :height="22"
          class="ml-4 bg-transparent border-none placeholder-gray6"
        />
      </SearchGeneral>

      <!-- cards list -->
      <div
        v-for="(topic, index) in freeTopicData"
        :key="index"
        class="mt-10 transition-colors"
      >
        <div class="hover:bg-gray4 rounded-4px outline-magic">
          <nuxt-link :to="`/community/freetopic/${topic['talk_id']}`">
            <div class="flex items-start">
              <ChipGeneral
                v-if="currentMenuIdx === 0"
                :width="46"
                :height="37"
                :borderRadius="`rounded-8px`"
                :chipText="topic['talk_category']"
                class="flex-shrink-0 font-bold pointer-events-none py-8px px-10px txt-sub text-green3 bg-green2"
              />
              <p
                class="txt-mid-bold"
                :class="{ 'ml-6px': currentMenuIdx === 0 }"
              >
                {{ topic["talk_title"] }}
              </p>
            </div>

            <!-- prettier-ignore -->
            <div class="mt-3 break-words whitespace-pre-line ellipse-line">{{ topic["talk_content"] }}</div>

            <div class="mt-3 text-gray6">
              <span> {{ topic["user_nickname"] }}</span>
              <span class="ml-5">{{ topic["talk_createdAt"] }}</span>
            </div>

            <div class="mt-2 text-gray1">
              <span>댓글 {{ topic["num_comment"] }}</span>
            </div>
          </nuxt-link>
        </div>
      </div>

      <!-- pagination -->
      <div class="flex justify-center">
        <PaginationGeneral
          class="my-16"
          :pageIdx="pageIdx"
          :pageNum="totalPageNum"
          @click="clickPaginationBtn"
        />
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
      return redirect("/community/freetopic", {
        perPage: 16,
        page: 1,
      });
    }
  },
  async asyncData({ $axios, query }) {
    console.log(query);
    const { category, perPage, page } = query;

    const categoryMenu = [
      {
        id: 0,
        name: "전체",
      },
      {
        id: 1,
        name: "개발",
      },
      {
        id: 2,
        name: "데이터",
      },
      {
        id: 3,
        name: "디자인",
      },
      {
        id: 4,
        name: "기타",
      },
    ];

    // get topic data
    let freeTopicData = [];
    let currentMenuIdx = 0;

    if (category) {
      freeTopicData = await $axios.$get(
        `api/talks?category=${encodeURI(
          category
        )}&perPage=${perPage}&page=${page}`
      );

      categoryMenu.forEach((elem, idx) => {
        if (elem.name === category) {
          currentMenuIdx = idx;
          return;
        }
      });
    } else {
      freeTopicData = await $axios.$get(
        `api/talks?perPage=${perPage}&page=${page}`
      );
    }
    console.log("freeTopicData", freeTopicData);

    // get total num of page
    let pageCountResponse, totalPageNum;

    if (category) {
      pageCountResponse = await $axios.get(
        `/api/talks/count?category=${encodeURI(category)}`
      );
    } else {
      pageCountResponse = await $axios.get(`/api/talks/count`);
    }
    totalPageNum = Math.ceil(Number(pageCountResponse.data["num_talk"]) / 16);

    let pageIdx = Number(page) - 1;

    return { freeTopicData, currentMenuIdx, totalPageNum, pageIdx };
  },
  data() {
    return {
      categoryMenu: [
        {
          id: 0,
          name: "전체",
        },
        {
          id: 1,
          name: "개발",
        },
        {
          id: 2,
          name: "데이터",
        },
        {
          id: 3,
          name: "디자인",
        },
        {
          id: 4,
          name: "기타",
        },
      ],
      currentMenuIdx: 0,
      freetopicSearchInput: "",
      // pagination
      pageIdx: 0,
      isUserScrolling: false,
    };
  },
  watch: {
    async $route(to, from) {
      const { category, perPage, page, keyword } = to.query;

      this.getFreeTopicData();
      this.getTotalPageNum();
      this.pageIdx = Number(page) - 1;
    },
  },
  methods: {
    handleSearchInput(value) {
      this.freetopicSearchInput = value;
    },
    searchByUserInput() {
      console.log("search!");
      if (this.freetopicSearchInput === "") {
        return;
      }
      this.pageIdx = 0;
      if (this.currentMenuIdx === 0) {
        this.$router.push({
          path: "/community/freetopic",
          query: {
            perPage: 16,
            page: this.pageIdx + 1,
            keyword: this.freetopicSearchInput,
          },
        });
      } else {
        this.$router.push({
          path: "/community/freetopic",
          query: {
            category: this.categoryMenu[this.currentMenuIdx].name,
            perPage: 16,
            page: this.pageIdx + 1,
            keyword: this.freetopicSearchInput,
          },
        });
      }
    },
    clickCategoryMenu(idx) {
      this.currentMenuIdx = idx;
      this.freetopicSearchInput = "";
      this.pageIdx = 0;
      this.routerPushNewQuery();
    },
    clickPaginationBtn(selectedPageIdx) {
      this.pageIdx = selectedPageIdx;
      this.ScrollToTop();
      this.routerPushNewQuery();
    },
    routerPushNewQuery() {
      if (this.currentMenuIdx === 0) {
        if (this.freetopicSearchInput) {
          this.$router.push({
            path: "/community/freetopic",
            query: {
              perPage: 16,
              page: this.pageIdx + 1,
              keyword: this.freetopicSearchInput,
            },
          });
        } else {
          this.$router.push({
            path: "/community/freetopic",
            query: {
              perPage: 16,
              page: this.pageIdx + 1,
            },
          });
        }
      } else {
        if (this.freetopicSearchInput) {
          this.$router.push({
            path: "/community/freetopic",
            query: {
              category: this.categoryMenu[this.currentMenuIdx].name,
              perPage: 16,
              page: this.pageIdx + 1,
              keyword: this.freetopicSearchInput,
            },
          });
        } else {
          this.$router.push({
            path: "/community/freetopic",
            query: {
              category: this.categoryMenu[this.currentMenuIdx].name,
              perPage: 16,
              page: this.pageIdx + 1,
            },
          });
        }
      }
    },
    async getFreeTopicData() {
      const { category, perPage, page, keyword } = this.$route.query;

      if (!keyword) {
        // keyword 없는경우
        if (this.currentMenuIdx === 0) {
          this.freeTopicData = await this.$axios.$get(
            `api/talks?perPage=${perPage}&page=${page}`
          );
        } else {
          this.freeTopicData = await this.$axios.$get(
            `api/talks?category=${
              this.categoryMenu[this.currentMenuIdx].name
            }&perPage=${perPage}&page=${page}`
          );
        }
      } else {
        // keyword 있는경우
        if (this.currentMenuIdx === 0) {
          this.freeTopicData = await this.$axios.$post(
            `/api/talks/search`,
            {
              keyword: keyword,
            },
            {
              params: {
                perPage,
                page,
              },
            }
          );
        } else {
          this.freeTopicData = await this.$axios.$post(
            `/api/talks/search`,
            {
              keyword: keyword,
            },
            {
              params: {
                category,
                perPage,
                page,
              },
            }
          );
        }
      }
    },
    async getTotalPageNum() {
      const { category, perPage, page, keyword } = this.$route.query;

      let response;
      if (keyword) {
        // 검색어가 있는경우
        if (category) {
          response = await this.$axios.$post(
            `/api/talks/search/count`,
            {
              keyword,
            },
            {
              params: {
                category,
              },
            }
          );
        } else {
          response = await this.$axios.$post(`/api/talks/search/count`, {
            keyword,
          });
        }
      } else {
        // 검색어 없는경우
        if (category) {
          response = await this.$axios.$get(`/api/talks/count`, {
            params: {
              category,
            },
          });
        } else {
          response = await this.$axios.$get(`/api/talks/count`);
        }
      }

      this.totalPageNum = Math.ceil(Number(response["num_talk"]) / 16);
      console.log("totalPageNum", this.totalPageNum);
    },
    ScrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    scrollHandler() {
      // console.log(window.scrollY);
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
.outline-magic:hover {
  background-color: #f1f3f5;
  outline: 8px solid #f1f3f5;
}
.ellipse-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
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
