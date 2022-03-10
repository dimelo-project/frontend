<template>
  <div class="select-none">
    <HomeLayerHeader />
    <div class="flex justify-center text-black1">
      <div
        style="width: 1090px; padding-top: 81px"
        class="flex justify-between mt-14"
      >
        <!-- left side navigation -->
        <div class="flex-shrink-0" style="width: 174px">
          <div class="sticky top-30">
            <div class="mb-6">
              <span class="text-gray1">마이페이지</span>
            </div>
            <div
              v-for="category in categorys"
              :key="category.id"
              class="mb-7 txt-mid"
            >
              <nuxt-link :to="category.pageLink">
                <span
                  @click="cntCategoryIdx = category.id"
                  :class="{
                    'txt-mid-bold text-orange2':
                      category.id === $store.state.cntCategoryIdx,
                  }"
                  class="cursor-pointer"
                >
                  {{ category.title }}
                </span>
              </nuxt-link>
            </div>
          </div>
        </div>

        <!-- right panel -->
        <div class="flex-shrink-0" style="width: 846px">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      value: "",
      cntCategoryIdx: 0,
      categorys: [
        {
          id: 0,
          title: "프로필 수정",
          pageLink: "/mypage/profileset",
        },
        {
          id: 1,
          title: "작성한 리뷰",
          pageLink: "/mypage/myreview",
        },
        {
          id: 2,
          title: "작성한 게시글",
          pageLink: "/mypage/myarticle",
        },
        {
          id: 3,
          title: "작성한 댓글",
          pageLink: "/mypage/mycomment",
        },
        {
          id: 4,
          title: "관심 강의",
          pageLink: "/mypage/bookmark",
        },
      ],
    };
  },
};
</script>

<style lang="postcss" scoped>
.test {
  @apply border border-orange2;
}
</style>
