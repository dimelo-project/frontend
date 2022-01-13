<template>
  <div class="flex justify-center mt-32 md:mb-24 lg:mb-0">
    <div class="relative flex flex-col test" style="width: 380px">
      <h3 class="text-center txt-heading3">회원가입</h3>

      <!-- ID (EMAIL) -->
      <p class="mt-8 input-title">이메일</p>
      <input
        v-model="userId"
        type="text"
        class="w-full px-3 py-4 mt-2 border-2 rounded-md outline-none test"
        :class="{ 'border-black': userId.length > 0 }"
        style="height: 56px"
      />

      <!-- email Msg Box -->
      <div class="h-8">
        <p :class="[isEmailMsgError ? ' text-red1' : 'text-green1']">
          {{ emailMsg }}
        </p>
      </div>

      <!-- PASSWORD -->
      <p class="input-title">비밀번호 입력</p>
      <input
        v-model="userPassword"
        type="password"
        class="w-full px-3 py-4 mt-2 border-2 rounded-md outline-none test"
        :class="{ 'password-dot-bigger border-black': userPassword.length > 0 }"
        style="height: 56px"
      />

      <!-- password Msg Box -->
      <div class="h-8">
        <p :class="[isPasswordMsgError ? 'text-red1' : 'text-gray1']">
          {{ passwordMsg }}
        </p>
      </div>

      <!-- PASSWORD CONFIRM -->
      <p class="input-title">비밀번호 확인</p>
      <input
        v-model="userPasswordConfirm"
        type="password"
        class="w-full px-3 py-4 mt-2 border-2 rounded-md outline-none test"
        :class="{
          'password-dot-bigger border-black': userPasswordConfirm.length > 0,
        }"
        style="height: 56px"
      />

      <!-- password confirm Msg Box -->
      <div class="h-8">
        <p :class="{ 'text-red1': isPasswordConfirmMsgError }">
          {{ passwordconfirmMsg }}
        </p>
      </div>

      <!-- button -->
      <ButtonGeneral btnText="회원가입" :large="true" :height="56" />

      <!-- divider -->
      <div class="w-full border mt-9"></div>

      <!-- OAuth -->
      <p class="mt-12 text-center">간편 회원가입</p>

      <!-- OAuth logo link-->
      <div class="mt-4">
        <div class="flex justify-center">
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

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "home",
  data() {
    return {
      userId: "",
      userPassword: "",
      userPasswordConfirm: "",
      emailMsg: "이메일 형식이 올바르지 않습니다.",
      passwordMsg: "영문, 숫자를 포함해 12자 이상으로 만들어주세요.",
      passwordconfirmMsg: "비밀번호가 일치하지 않습니다.",
      isEmailMsgError: true,
      isPasswordMsgError: false,
      isPasswordConfirmMsgError: false,
    };
  },
});
</script>

<style lang="postcss" scoped>
.test {
  /* @apply border-2 border-orange1; */
}

.input-title {
  @apply font-bold text-gray1;
}

.password-dot-bigger {
  font-family: Verdana;
  letter-spacing: 0.125rem;
}
</style>
