<template>
  <div class="flex justify-center text-black1">
    <div style="width: 1090px" class="flex mt-16">
      <!-- left side navigation -->
      <div class="flex-shrink-0" style="width: 174px">
        <div class="sticky top-30 txt-mid">
          <div class="mb-8">
            <nuxt-link to="/community/freetopic">
              <span class="cursor-pointer txt-mid-bold text-orange2">
                자유주제
              </span>
            </nuxt-link>
          </div>
          <div class="mb-8">
            <nuxt-link to="/community/study">
              <span class="cursor-pointer">스터디</span>
            </nuxt-link>
          </div>
          <div class="w-full mb-8">
            <nuxt-link to="/community/sideproject">
              <span class="cursor-pointer">사이드 프로젝트</span>
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- gap -->
      <!-- <div class="flex-grow"></div> -->

      <!-- right panel -->
      <div class="flex-grow">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "home",
  data() {
    return {
      value: "",
    };
  },
};
</script>

<style lang="postcss" scoped>
.test {
  @apply border border-orange2;
}
</style>
