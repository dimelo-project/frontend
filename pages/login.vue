<template>
  <div class="flex justify-center mt-32 md:mb-24">
    <div class="relative flex flex-col items-center test" style="width: 380px">
      <h3 class="txt-heading3">로그인</h3>

      <!-- ID (EMAIL) -->
      <input
        v-model="login.userId"
        type="text"
        class="w-full px-3 py-4 mt-8 border-2 rounded-md outline-none test"
        :class="{ 'border-black': login.userId.length > 0 }"
        placeholder="아이디(이메일)"
        style="height: 56px"
      />

      <!-- PASSWORD -->
      <input
        v-model="login.userPassword"
        type="password"
        class="w-full px-3 py-4 border-2 rounded-md outline-none mt-7 test"
        :class="{
          'password-dot-bigger border-black': login.userPassword.length > 0,
        }"
        placeholder="비밀번호"
        style="height: 56px"
      />

      <!-- error Msg box -->
      <div class="flex items-center justify-start w-full h-8">
        <p v-if="formError" class="text-red1 txt-sub">
          아이디 또는 비밀번호가 일치하지 않습니다.
        </p>
      </div>

      <!-- submit button -->
      <ButtonGeneral
        @click="userLogin"
        btnText="로그인"
        :large="true"
        :height="56"
      />

      <!-- sub link -->
      <div class="relative flex w-full mt-7 test" style="height: 24px">
        <p class="absolute pr-4 -translate-x-full txt-base left-1/2">
          회원가입
        </p>
        <div
          style="height: 24px"
          class="absolute -translate-x-1/2 border left-1/2"
        ></div>
        <p class="absolute pl-4 txt-base left-1/2">비밀번호 찾기</p>
      </div>

      <!-- divider -->
      <div class="w-full border mt-9"></div>

      <!-- OAuth -->
      <p class="mt-12">간편 로그인</p>

      <!-- OAuth logo link-->
      <div class="mt-4">
        <div class="flex">
          <NuxtLink class="mr-3" to="/">
            <img src="~assets/imgs/logo/google_logo.png" alt="구글로그인" />
          </NuxtLink>
          <NuxtLink class="ml-3" to="/">
            <img src="~assets/imgs/logo/github_logo.png" alt="깃헙로그인" />
          </NuxtLink>
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
      login: {
        userId: "",
        userPassword: "",
      },
      formError: true,
    };
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login,
        });
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.test {
  /* @apply border-2 border-orange1; */
}

.password-dot-bigger {
  font-family: Verdana;
  letter-spacing: 0.125rem;
}
</style>
