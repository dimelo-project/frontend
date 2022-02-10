<template>
  <div class="select-none">
    <HomeLayerHeader />
    <div class="flex justify-center text-black1">
      <div style="width: 1090px" class="flex">
        <!-- left side navigation -->
        <div class="flex-shrink-0" style="width: 174px">
          <div class="sticky top-30 txt-mid">
            <div v-for="category in categorys" :key="category.id" class="mt-8">
              <nuxt-link :to="category.pageLink">
                <span
                  @click="cntCategoryIdx = category.id"
                  class="cursor-pointer"
                >
                  {{ category.title }}
                </span>
              </nuxt-link>
            </div>
          </div>
        </div>

        <!-- right panel -->
        <div class="flex-grow" style="margin-top: 82px">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      cntCategoryIdx: 0,
      categorys: [
        {
          id: 0,
          title: "자유주제",
          pageLink: {
            path: "/community/freetopic",
            query: {
              perPage: 16,
              page: 1,
            },
          },
        },
        {
          id: 1,
          title: "스터디",
          pageLink: {
            path: "/community/study",
            query: {
              perPage: 16,
              page: 1,
            },
          },
        },
        {
          id: 2,
          title: "사이드 프로젝트",
          pageLink: {
            path: "/community/sideproject",
            query: {
              perPage: 16,
              page: 1,
            },
          },
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
a.nuxt-link-active {
  font-weight: bold;
  color: #f3732b;
}
</style>
