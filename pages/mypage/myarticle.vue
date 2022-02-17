<template>
  <div class="select-none mb-30">
    <!-- top menu box -->
    <div class="p-5 rounded-4px bg-gray4">
      <span
        v-for="(category, idx) in categoryData"
        @click="changeCategory(idx)"
        :key="idx"
        class="mr-6 cursor-pointer"
        :class="{ 'txt-base-bold': idx === currentCategoryIdx }"
      >
        {{ category.name }}
      </span>
    </div>

    <!-- total number of my article -->
    <div class="mt-7">
      <span class="txt-sub">총 {{ articleData.length }}건</span>
    </div>

    <!-- divider -->
    <div class="mt-3 border-t-2 border-gray2"></div>

    <!-- my article data list -->
    <div v-if="$route.query.category === 'freetopic'">
      <div v-if="articleData.length === 0" class="mt-10 text-center txt-base">
        <span>작성한 게시글이 없습니다.</span>
      </div>

      <div v-for="(article, idx) in articleData" :key="idx" class="mt-6">
        <!-- tag & title -->
        <div class="flex items-center">
          <div
            class="txt-sub-bold text-green1 bg-green2 rounded-8px py-8px px-10px"
          >
            <span>
              {{ article["talk_category"] }}
            </span>
          </div>

          <div class="ml-1.5 txt-mid-bold">
            <span>{{ article["talk_title"] }}</span>
          </div>
        </div>

        <!-- article body -->
        <div class="mt-3">
          <p>
            {{ article["talk_content"] }}
          </p>
        </div>

        <!-- created date & number of comments -->
        <div class="flex flex-col mt-3">
          <span class="text-gray6">{{ article["talk_createdAt"] }}</span>
          <span class="mt-2 text-gray1">댓글 {{ article["num_comment"] }}</span>
        </div>

        <!-- divider -->
        <div class="mt-6 border-t border-gray2"></div>
      </div>
    </div>
    <div v-else-if="$route.query.category === 'study'">
      <div v-if="articleData.length === 0" class="mt-10 text-center txt-base">
        <span>작성한 게시글이 없습니다.</span>
      </div>

      <div v-for="(article, idx) in articleData" :key="idx" class="mt-6">
        <!-- tag & title -->
        <div class="flex items-center">
          <div
            class="txt-sub-bold text-green1 bg-green2 rounded-8px py-8px px-10px"
          >
            <span>
              {{ article["study_ongoing"] }}
            </span>
          </div>

          <div class="ml-1.5 txt-mid-bold">
            <span>{{ article["study_title"] }}</span>
          </div>
        </div>

        <!-- article body -->
        <div class="mt-3">
          <p>
            {{ article["study_content"] }}
          </p>
        </div>

        <!-- created date & number of comments -->
        <div class="flex flex-col mt-3">
          <span class="text-gray6">{{ article["study_createdAt"] }}</span>
          <span class="mt-2 text-gray1">댓글 {{ article["num_comment"] }}</span>
        </div>

        <!-- divider -->
        <div class="mt-6 border-t border-gray2"></div>
      </div>
    </div>
    <div v-else-if="$route.query.category === 'project'">
      <div v-if="articleData.length === 0" class="mt-10 text-center txt-base">
        <span>작성한 게시글이 없습니다.</span>
      </div>

      <div v-for="(article, idx) in articleData" :key="idx" class="mt-6">
        <!-- tag & title -->
        <div class="flex items-center">
          <div
            class="txt-sub-bold text-green1 bg-green2 rounded-8px py-8px px-10px"
          >
            <span>
              {{ article["project_ongoing"] }}
            </span>
          </div>

          <div class="ml-1.5 txt-mid-bold">
            <span>{{ article["project_title"] }}</span>
          </div>
        </div>

        <!-- article body -->
        <div class="mt-3">
          <p>
            {{ article["project_content"] }}
          </p>
        </div>

        <!-- created date & number of comments -->
        <div class="flex flex-col mt-3">
          <span class="text-gray6">{{ article["project_createdAt"] }}</span>
          <span class="mt-2 text-gray1">댓글 {{ article["num_comment"] }}</span>
        </div>

        <!-- divider -->
        <div class="mt-6 border-t border-gray2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "mypage",
  middleware({ redirect, query }) {
    if (Object.entries(query).length === 0) {
      return redirect("/mypage/myarticle", {
        category: "freetopic",
      });
    }
  },
  async asyncData({ $axios, query }) {
    console.log("query", query);

    const categoryData = [
      {
        id: 0,
        name: "자유주제",
        pName: "talks",
        url: "freetopic",
      },
      {
        id: 1,
        name: "스터디",
        pName: "studies",
        url: "study",
      },
      {
        id: 2,
        name: "사이드 프로젝트",
        pName: "projects",
        url: "project",
      },
    ];

    let apiUrl, currentCategoryIdx;
    categoryData.forEach((elem, idx) => {
      if (elem.url === query.category) {
        currentCategoryIdx = idx;
        apiUrl = elem.pName;
        return;
      }
    });

    const articleData = await $axios.$get(`/api/${apiUrl}/me`);
    console.log("articleData", articleData);

    return { articleData, currentCategoryIdx };
  },
  data() {
    return {
      categoryData: [
        {
          id: 0,
          name: "자유주제",
          pName: "talks",
          url: "freetopic",
        },
        {
          id: 1,
          name: "스터디",
          pName: "studies",
          url: "study",
        },
        {
          id: 2,
          name: "사이드 프로젝트",
          pName: "projects",
          url: "project",
        },
      ],
      currentCategoryIdx: 0,
      articleData: [],
    };
  },
  mounted() {
    this.$store.commit("changeCntCategoryIdx", 2);
  },
  methods: {
    async changeCategory(categroyIdx) {
      this.currentCategoryIdx = categroyIdx;
      console.log("sdf");
      this.$router.push({
        path: "/mypage/myarticle",
        query: {
          category: this.categoryData[this.currentCategoryIdx].url,
        },
      });

      const response = await this.$axios.$get(
        `/api/${this.categoryData[categroyIdx].pName}/me`
      );
      console.log(response);

      this.articleData = response;
    },
  },
};
</script>

<style lang="postcss" scoped></style>
