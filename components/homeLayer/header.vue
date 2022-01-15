<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b-2">
    <div class="relative flex items-center mx-auto nav-content-wrapper-size">
      <!-- content--left -->
      <div class="absolute left-0 h-full test">
        <div class="flex items-center h-full mr-6">
          <!-- logo -->
          <span class="p-2 border-2 border-black">Logo Image</span>

          <!-- menus -->
          <div
            class="relative inline-block h-full ml-8 text-left"
            @mouseleave="isReviewMenuOpened = false"
          >
            <div class="flex items-center h-full">
              <div class="txt-mid">
                <button
                  :class="{ 'font-bold': isReviewMenuOpened }"
                  type="button"
                  @mouseover="isReviewMenuOpened = true"
                >
                  강의리뷰
                </button>
              </div>

              <div
                v-if="isReviewMenuOpened"
                class="absolute w-56 pt-3 bg-transparent -left-1/4"
                style="top: 80px"
              >
                <div
                  class="w-full p-6 bg-white border rounded-md border-gray1"
                  style="width: 155px"
                >
                  <div class="py-1">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <div>
                      <NuxtLink to="/">
                        <p class="hover:font-bold hover:underline">개발</p>
                      </NuxtLink>
                    </div>
                    <div class="mt-4">
                      <NuxtLink to="/">
                        <p class="hover:font-bold hover:underline">
                          데이터 사이언스
                        </p>
                      </NuxtLink>
                    </div>
                    <div class="mt-4">
                      <NuxtLink to="/">
                        <p class="hover:font-bold hover:underline">디자인</p>
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
                <button
                  :class="{ 'font-bold': isCommunityMenuOpened }"
                  type="button"
                  @mouseover="isCommunityMenuOpened = true"
                >
                  커뮤니티
                </button>
              </div>

              <div
                v-if="isCommunityMenuOpened"
                class="absolute w-56 pt-3 bg-transparent -left-1/4"
                style="top: 80px"
              >
                <div
                  class="w-full p-6 bg-white border rounded-md border-gray1"
                  style="width: 155px"
                >
                  <div class="py-1">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <div>
                      <NuxtLink to="/">
                        <p class="hover:font-bold hover:underline">자유주제</p>
                      </NuxtLink>
                    </div>
                    <div class="mt-4">
                      <NuxtLink to="/">
                        <p class="hover:font-bold hover:underline">스터디</p>
                      </NuxtLink>
                    </div>
                    <div class="mt-4">
                      <NuxtLink to="/">
                        <p class="hover:font-bold hover:underline">
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

      <!-- content--middle -->
      <div
        v-if="isLocationClassPage"
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
        <!-- after logIn -->
        <div class="flex test" v-if="loggedIn" style="height: 80px">
          <div class="flex items-center h-full">
            <NuxtLink to="/">
              <svgHeartOutline />
            </NuxtLink>
          </div>

          <!-- Notification Button -->
          <div class="h-full ml-6">
            <div
              class="relative inline-block h-full text-left"
              @mouseleave="isNotiMenuOpened = false"
            >
              <div class="flex items-center h-full">
                <button
                  :class="{ 'font-bold': isNotiMenuOpened }"
                  type="button"
                  @mouseover="isNotiMenuOpened = true"
                >
                  <svgNotificationOutline />
                </button>

                <div
                  v-if="isNotiMenuOpened"
                  class="absolute left-0 w-56 pt-3 bg-transparent"
                  style="top: 80px; left: -145px"
                >
                  <div
                    class="w-full p-6 bg-white border rounded-md border-gray1"
                    style="width: 214px"
                  >
                    <!-- user nickname -->
                    <div class="">
                      <NuxtLink to="/">
                        <p class="font-bold">user nickname</p>
                      </NuxtLink>
                    </div>
                    <!-- divider -->
                    <div class="mt-4 border border-b-gray1"></div>
                    <!-- sub menu -->
                    <div class="py-1">
                      <div class="mt-4">
                        <NuxtLink to="/">
                          <p class="hover:font-bold hover:underline">
                            프로필 수정
                          </p>
                        </NuxtLink>
                      </div>
                      <div class="mt-4">
                        <NuxtLink to="/">
                          <p class="hover:font-bold hover:underline">
                            작성한 리뷰
                          </p>
                        </NuxtLink>
                      </div>
                      <div class="mt-4">
                        <NuxtLink to="/">
                          <p class="hover:font-bold hover:underline">
                            작성한 게시글
                          </p>
                        </NuxtLink>
                      </div>
                      <div class="mt-4">
                        <NuxtLink to="/">
                          <p class="hover:font-bold hover:underline">
                            작성한 댓글
                          </p>
                        </NuxtLink>
                      </div>
                      <div class="mt-4">
                        <NuxtLink to="/">
                          <p class="hover:font-bold hover:underline">
                            관심 강의
                          </p>
                        </NuxtLink>
                      </div>
                      <div class="mt-4">
                        <NuxtLink to="/">
                          <p class="hover:font-bold hover:underline">
                            로그아웃
                          </p>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- profile--image -->
          <div class="h-full ml-6">
            <div
              class="relative inline-block h-full text-left"
              @mouseleave="isProfileBtnOpened = false"
            >
              <div class="flex items-center h-full">
                <button type="button" @mouseover="isProfileBtnOpened = true">
                  <div class="w-6 h-6 bg-gray-500 rounded-full"></div>
                </button>

                <div
                  v-if="isProfileBtnOpened"
                  class="absolute left-0 w-56 pt-3 bg-transparent"
                  style="top: 80px; left: -449px; width: 479px"
                >
                  <div
                    class="w-full p-6 bg-white border rounded-md border-gray1"
                  >
                    <div class="py-1">
                      <!-- notification title -->
                      <div>
                        <p class="font-bold">전체 알림</p>
                      </div>
                      <!-- notification data -->
                      <div v-for="i in 4" :key="i">
                        <NuxtLink to="/">
                          <p class="mt-4">
                            ‘공백포함 10글자로..’ 글에 닉네임닉네임님이 댓글을
                            달았습니다.
                          </p>
                          <p class="mt-1 text-gray1">1분 전</p>
                        </NuxtLink>
                        <!-- divider -->
                        <div class="mt-1 border border-b-gray1"></div>
                      </div>
                      <!-- rule message -->
                      <p class="mt-4 text-center text-gray1">
                        최대 3개월의 알림만 보관됩니다.
                      </p>
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
            <ButtonGeneral btnText="로그인" :small="true" :dark="true" />
          </div>
          <div class="ml-3">
            <ButtonGeneral btnText="회원가입" :small="true" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      loggedIn: true,
      // loggedIn: false,
      isLocationClassPage: false,
      isReviewMenuOpened: false,
      isCommunityMenuOpened: false,
      isNotiMenuOpened: false,
      isProfileBtnOpened: false,
    };
  },
});
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
