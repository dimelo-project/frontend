<template>
  <nav class="bg-white border-b-2">
    <div class="relative flex items-center mx-auto nav-content-wrapper-size">
      <!-- content--left -->
      <div class="absolute left-0 test">
        <div class="flex items-center mr-6">
          <!-- logo -->
          <span class="p-2 border-2 border-black">Logo Image</span>

          <!-- menus -->
          <div class="txt-mid">
            <nuxt-link
              to="/"
              class="block ml-4 hover:font-bold lg:inline-block lg:mt-0"
            >
              강의리뷰
            </nuxt-link>
            <nuxt-link
              to="/"
              class="block ml-4 hover:font-bold lg:inline-block lg:mt-0"
            >
              커뮤니티
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- content--middle -->
      <div
        class="absolute block pb-1 -translate-x-1/2 border-black test left-1/2 lg:flex lg:items-center lg:justify-between"
        style="width: 420px; border-bottom: 1px solid"
      >
        <input
          type="text"
          name="serch"
          placeholder="강의, 강사명으로 검색해 보세요."
          class="w-full placeholder-black bg-transparent border-none outline-none"
        />
        <svgSearchOutline />
      </div>

      <!-- contents--right -->
      <div class="absolute right-0">
        <div class="flex test" v-if="loggedIn">
          <div>
            <svgHeartOutline />
          </div>
          <div class="ml-6">
            <svgNotificationOutline />
          </div>
          <!-- profile--image -->
          <div class="w-6 h-6 ml-6 bg-gray-500 rounded-full"></div>
        </div>

        <div v-else>
          <ButtonGeneral btnText="로그인" :small="true" :dark="true" />
          <ButtonGeneral btnText="회원가입" :small="true" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      // loggedIn: true,
      loggedIn: false,
    };
  },
};
</script>

<style lang="postcss" scoped>
.nav-content-wrapper-size {
  max-width: 1194px;
  height: 80px;
}
.test {
  /* @apply border-2 border-orange1; */
}
</style>
