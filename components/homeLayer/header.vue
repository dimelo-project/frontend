<template>
  <nav
    class="fixed top-0 z-50 w-full transition duration-500 border-b bg-opacity-80 header-backdrop-filter"
    :class="[
      Number($store.state.headerBgColor.split(',')[1]) == '255'
        ? 'border-gray7'
        : 'border-yellow1',
    ]"
    :style="{ backgroundColor: $store.state.headerBgColor }"
  >
    <div class="relative flex items-center mx-auto nav-content-wrapper-size">
      <!-- content--left -->
      <div class="absolute left-0 h-full">
        <div class="flex items-center h-full mr-6">
          <!-- logo -->
          <NuxtLink to="/">
            <img
              src="~/assets/imgs/banner/logo.png"
              alt="dimelo"
              style="height: 18px"
            />
          </NuxtLink>

          <!-- menus -->
          <div
            class="relative inline-block h-full ml-8 text-left"
            @mouseleave="isReviewMenuOpened = false"
          >
            <div class="flex items-center h-full">
              <div class="txt-mid">
                <NuxtLink
                  :to="{
                    path: '/lecture',
                    query: {
                      categoryBig: '개발',
                      category: '웹 개발',
                      perPage: 17,
                      page: 1,
                      sort: 'avg',
                    },
                  }"
                >
                  <button
                    :class="{
                      'font-bold': isReviewMenuOpened,
                      'font-bold': $route.path === '/lecture',
                    }"
                    type="button"
                    @mouseover="isReviewMenuOpened = true"
                  >
                    강의리뷰
                  </button>
                </NuxtLink>
              </div>

              <div
                v-if="isReviewMenuOpened"
                class="absolute pt-3 bg-transparent -left-1/4"
                style="top: 80px"
              >
                <div class="w-40 p-6 bg-white border rounded-md border-gray11">
                  <div class="py-1">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <div>
                      <NuxtLink
                        :to="{
                          path: '/lecture',
                          query: {
                            categoryBig: '개발',
                            category: '웹 개발',
                            perPage: 17,
                            page: 1,
                            sort: 'avg',
                          },
                        }"
                      >
                        <p
                          class="whitespace-nowrap hover:font-bold hover:underline"
                        >
                          개발
                        </p>
                      </NuxtLink>
                    </div>
                    <div class="mt-4">
                      <NuxtLink
                        :to="{
                          path: '/lecture',
                          query: {
                            categoryBig: '데이터 과학',
                            category: '데이터 분석',
                            perPage: 17,
                            page: 1,
                            sort: 'avg',
                          },
                        }"
                      >
                        <p
                          class="whitespace-nowrap hover:font-bold hover:underline"
                        >
                          데이터 사이언스
                        </p>
                      </NuxtLink>
                    </div>
                    <div class="mt-4">
                      <NuxtLink
                        :to="{
                          path: '/lecture',
                          query: {
                            categoryBig: '디자인',
                            category: '웹 디자인',
                            perPage: 17,
                            page: 1,
                            sort: 'avg',
                          },
                        }"
                      >
                        <p
                          class="whitespace-nowrap hover:font-bold hover:underline"
                        >
                          디자인
                        </p>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="relative inline-block h-full ml-8 text-left"
            @mouseleave="isCommunityMenuOpened = false"
          >
            <div class="flex items-center h-full">
              <div class="txt-mid">
                <NuxtLink to="/community/freetopic">
                  <button
                    :class="{
                      'font-bold': isCommunityMenuOpened,
                      'font-bold': $route.path.includes('/community'),
                    }"
                    type="button"
                    @mouseover="isCommunityMenuOpened = true"
                  >
                    커뮤니티
                  </button>
                </NuxtLink>
              </div>

              <div
                v-if="isCommunityMenuOpened"
                class="absolute w-56 pt-3 bg-transparent -left-1/4"
                style="top: 80px"
              >
                <div
                  class="w-full p-6 bg-white border rounded-md border-gray11"
                  style="width: 155px"
                >
                  <div class="py-1">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <div>
                      <NuxtLink to="/community/freetopic">
                        <p
                          class="whitespace-nowrap hover:font-bold hover:underline"
                        >
                          자유주제
                        </p>
                      </NuxtLink>
                    </div>
                    <div class="mt-4">
                      <NuxtLink to="/community/study">
                        <p
                          class="whitespace-nowrap hover:font-bold hover:underline"
                        >
                          스터디
                        </p>
                      </NuxtLink>
                    </div>
                    <div class="mt-4">
                      <NuxtLink to="/community/sideproject">
                        <p
                          class="whitespace-nowrap hover:font-bold hover:underline"
                        >
                          사이드 프로젝트
                        </p>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- contents--right -->
      <div class="absolute right-0">
        <!-- after logIn -->
        <div class="flex" v-if="$auth.user" style="height: 80px">
          <!-- profile--image -->
          <div class="h-full ml-6">
            <div
              class="relative inline-block h-full text-left"
              @mouseleave="isProfileBtnOpened = false"
            >
              <div
                class="flex items-center justify-center h-full"
                style="width: 100px"
              >
                <button type="button" @mouseover="isProfileBtnOpened = true">
                  <img
                    v-if="$auth.user.imageUrl"
                    :src="$auth.user.imageUrl"
                    alt="프로필"
                    class="object-cover rounded-full"
                    style="width: 36px; height: 36px"
                  />
                  <img
                    v-else
                    src="~/assets/imgs/profile/default_user_profile.png"
                    alt="프로필기본"
                    class="object-cover rounded-full"
                    style="width: 36px; height: 36px"
                  />
                </button>

                <div
                  v-if="isProfileBtnOpened"
                  class="absolute w-56 pt-3 bg-transparent -left-full"
                  style="top: 80px"
                >
                  <div
                    class="w-full p-6 bg-white border rounded-md border-gray11"
                    style="width: 214px"
                  >
                    <!-- user nickname -->
                    <div class="">
                      <NuxtLink to="/mypage/profileset">
                        <p class="font-bold">
                          <span v-if="$auth.user.nickname">
                            {{ $auth.user.nickname }}
                          </span>
                          <span v-else> 이름을 설정해주세요! </span>
                        </p>
                      </NuxtLink>
                    </div>
                    <!-- divider -->
                    <div class="mt-4 border border-b-gray1"></div>
                    <!-- sub menu -->
                    <div class="py-1">
                      <div class="mt-4">
                        <NuxtLink to="/mypage/profileset">
                          <p class="hover:font-bold hover:underline">
                            프로필 수정
                          </p>
                        </NuxtLink>
                      </div>
                      <div class="mt-4">
                        <NuxtLink to="/mypage/myreview">
                          <p class="hover:font-bold hover:underline">
                            작성한 리뷰
                          </p>
                        </NuxtLink>
                      </div>
                      <div class="mt-4">
                        <NuxtLink to="/mypage/myarticle">
                          <p class="hover:font-bold hover:underline">
                            작성한 게시글
                          </p>
                        </NuxtLink>
                      </div>
                      <div class="mt-4">
                        <NuxtLink to="/mypage/mycomment">
                          <p class="hover:font-bold hover:underline">
                            작성한 댓글
                          </p>
                        </NuxtLink>
                      </div>
                      <div class="mt-4">
                        <NuxtLink to="/mypage/bookmark">
                          <p class="hover:font-bold hover:underline">
                            관심 강의
                          </p>
                        </NuxtLink>
                      </div>
                      <div class="mt-4">
                        <div @click="onLogout" class="cursor-pointer">
                          <p class="hover:font-bold hover:underline">
                            로그아웃
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- before logIn -->
        <div v-else class="flex">
          <div>
            <NuxtLink to="/login">
              <ButtonGeneral
                :width="71"
                :height="32"
                class="transition-colors border border-orange2 text-orange2 rounded-6px txt-base-bold hover:bg-orange2 hover:text-white"
              >
                <span>로그인</span>
              </ButtonGeneral>
            </NuxtLink>
          </div>
          <div class="ml-3">
            <NuxtLink to="/signup">
              <ButtonGeneral
                :width="85"
                :height="32"
                class="text-white transition-colors txt-base-bold bg-orange1 rounded-6px hover:bg-orange2"
              >
                <span>회원가입</span>
              </ButtonGeneral>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLocationClassPage: false,
      isReviewMenuOpened: false,
      isCommunityMenuOpened: false,
      isNotiMenuOpened: false,
      isProfileBtnOpened: false,
    };
  },
  mounted() {
    // console.log(this.$route.path);
  },
  methods: {
    async onLogout() {
      await this.$auth.logout();

      if (this.$router.currentRoute.path !== "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.nav-content-wrapper-size {
  max-width: 1194px;
  height: 80px;
}
.test {
  @apply border-2 border-orange1;
}
.header-backdrop-filter {
  backdrop-filter: blur(5px);
}
</style>
