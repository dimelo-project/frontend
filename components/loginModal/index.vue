<template>
  <div
    v-if="$store.state.loginModal.isLoginModalOpened"
    class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-75 bg-gray9"
  >
    <div class="relative">
      <!-- close button -->
      <div
        class="absolute right-0 translate-x-full cursor-pointer top-1"
        @click="closeModal"
      >
        <SvgCloseWindow :color="`white`" class="ml-4" />
      </div>
      <!-- contents -->
      <div
        class="py-10 bg-white opacity-100 px-13 rounded-8px"
        style="width: 400px"
      >
        <div class="flex justify-center select-none">
          <div
            class="relative flex flex-col items-center test"
            style="width: 360px"
          >
            <h3 class="txt-mid-bold">로그인</h3>

            <!-- ID (EMAIL) -->
            <InputGeneral
              ref="emailInput"
              v-model="login.userId"
              :type="`text`"
              :placeholder="`아이디(이메일)`"
              :width="360"
              :height="44"
              class="p-3 border mt-7 txt-sub rounded-4px"
              :class="[
                login.userId.length > 0 ? 'border-orange2' : 'border-gray2',
              ]"
            />

            <!-- PASSWORD -->
            <InputGeneral
              v-model="login.userPassword"
              :type="`password`"
              :placeholder="`비밀번호`"
              :width="360"
              :height="44"
              class="p-3 mt-4 border txt-sub rounded-4px"
              :class="[
                login.userPassword.length > 0
                  ? 'border-orange2'
                  : 'border-gray2',
              ]"
            />

            <!-- error Msg box -->
            <div class="flex items-start w-full h-9">
              <span v-if="formError" class="text-red1 pt-0.5 txt-mini">
                아이디 또는 비밀번호가 일치하지 않습니다.
              </span>
            </div>

            <!-- submit button -->
            <ButtonGeneral
              @click="userLogin"
              btnText="로그인"
              :width="360"
              :height="56"
              class="text-white hover:bg-orange2 bg-orange1 rounded-4px txt-mid-bold"
            >
              <span>로그인</span>
            </ButtonGeneral>

            <!-- sub link -->
            <div
              class="relative flex w-full mt-4 test txt-sub"
              style="height: 27px"
            >
              <p class="absolute pr-4 -translate-x-full left-1/2">
                <NuxtLink to="/signup"> 회원가입 </NuxtLink>
              </p>
              <div
                style="height: 24px"
                class="absolute -translate-x-1/2 border left-1/2 border-gray2"
              ></div>
              <p class="absolute pl-4 left-1/2">
                <NuxtLink to="/forgotpassword"> 비밀번호 찾기 </NuxtLink>
              </p>
            </div>

            <!-- OAuth -->
            <p class="mt-10 txt-mid-bold">간편 로그인</p>

            <!-- OAuth logo link-->
            <div class="mt-5">
              <div class="flex">
                <div class="mr-3" @click="googlLogin">
                  <img
                    draggable="false"
                    src="~assets/imgs/logo/google_logo.png"
                    alt="구글로그인"
                    style="width: 40px; height: 40px"
                    class="cursor-pointer"
                  />
                </div>
                <div class="ml-3" @click="githubLogin">
                  <img
                    draggable="false"
                    src="~assets/imgs/logo/github_logo.png"
                    alt="깃헙로그인"
                    style="width: 40px; height: 40px"
                    class="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        userId: "",
        userPassword: "",
      },
      formError: false,
    };
  },
  methods: {
    closeModal() {
      this.$store.commit("loginModal/changeIsLoginModalOpened", false);
      this.resetLoginModalData();
    },
    resetLoginModalData() {
      this.login.userId = "";
      (this.login.userPassword = ""), (this.formError = false);
    },
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: {
            email: this.login.userId,
            password: this.login.userPassword,
          },
        });

        if (response) {
          this.$store.commit("loginModal/changeIsLoginModalOpened", false);
          this.resetLoginModalData();
          await this.$nuxt.refresh();
        }
      } catch (err) {
        console.error(err);
        this.formError = true;
      }
    },
    googlLogin() {
      window.open("https://api.dimelo.io/api/auth/google", "_self");
    },
    githubLogin() {
      window.open("https://api.dimelo.io/api/auth/github", "_self");
    },
  },
};
</script>

<style lang="postcss" scoped></style>
