<template>
  <div class="flex justify-center mt-30 md:mb-24">
    <div class="relative flex flex-col test" style="width: 380px">
      <h3 class="text-center txt-heading3">회원가입</h3>

      <!-- ID (EMAIL) -->
      <p class="mt-8 input-title">이메일</p>

      <InputGeneral
        :value="signup.userId"
        @input="handleUserId"
        class="mt-2"
        :type="`test`"
        :height="56"
      />

      <!-- email Msg Box -->
      <div class="h-10 pt-1 txt-sub">
        <p :class="[isEmailMsgError ? ' text-red1' : 'text-green1']">
          {{ emailMsg }}
        </p>
      </div>

      <!-- PASSWORD -->
      <p class="input-title">비밀번호 입력</p>

      <InputGeneral
        class="mt-2"
        :value="signup.userPassword"
        @input="handleUserPassword"
        @focus="focusUserPassword"
        @focusout="focusOutUserPassword"
        :type="`password`"
        :height="56"
      />

      <!-- password Msg Box -->
      <div class="h-10 pt-1 txt-sub">
        <p :class="[isPasswordMsgError ? 'text-red1' : 'text-gray1']">
          {{ passwordMsg }}
        </p>
      </div>

      <!-- PASSWORD CONFIRM -->
      <p class="input-title">비밀번호 확인</p>

      <InputGeneral
        class="mt-2"
        :value="signup.userPasswordConfirm"
        @input="handleUserPasswordConfirm"
        :type="`password`"
        :height="56"
      />

      <!-- password confirm Msg Box -->
      <div class="h-10 pt-1 txt-sub">
        <p class="text-red1">
          {{ passwordconfirmMsg }}
        </p>
      </div>

      <!-- button -->
      <ButtonGeneral
        @click="userSignUp"
        btnText="회원가입"
        :large="true"
        :height="56"
      />

      <!-- divider -->
      <div class="w-full border mt-15"></div>

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

<script>
export default {
  layout: "home",
  data() {
    return {
      signup: {
        userId: "",
        userPassword: "",
        userPasswordConfirm: "",
      },
      timeout: null,
      emailMsg: "",
      passwordMsg: "",
      passwordconfirmMsg: "",
      isEmailMsgError: true,
      isPasswordMsgError: false,
    };
  },
  methods: {
    handleUserId(value) {
      this.signup.userId = value;

      // debounce input event
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(async () => {
        try {
          let response = await this.$axios.$post("/api/auth/check/email", {
            email: this.signup.userId,
          });
          this.isEmailMsgError = false;
          this.emailMsg = "사용 가능한 이메일입니다.";
        } catch (err) {
          this.isEmailMsgError = true;
          if (err.response.data.code == 409) {
            this.emailMsg = "이미 가입했거나 탈퇴한 이메일입니다.";
          } else if (err.response.data.code == 400) {
            this.emailMsg = "이메일 형식이 올바르지 않습니다.";
          }
        }
      }, 500);
    },
    handleUserPassword(value) {
      this.signup.userPassword = value;

      const regExp = new RegExp("(?=.*[0-9])(?=.*[a-z])");
      // console.log(regExp.test(value));
      if (regExp.test(value) === false) {
        this.passwordMsg = "영문, 숫자를 포함해 12자 이상으로 만들어주세요.";
        this.isPasswordMsgError = true;
      } else if (regExp.test(value) === true) {
        this.passwordMsg = "";
        this.isPasswordMsgError = false;
      }
    },
    focusUserPassword() {
      if (
        this.signup.userPassword.length === 0 &&
        this.signup.userPassword.length >= 12
      ) {
        this.passwordMsg = "영문, 숫자를 포함해 12자 이상으로 만들어주세요.";
        this.isPasswordMsgError = false;
      }
    },
    focusOutUserPassword() {
      if (this.signup.userPassword.length === 0) {
        this.passwordMsg = "";
      }
    },
    handleUserPasswordConfirm(value) {
      this.signup.userPasswordConfirm = value;

      if (this.signup.userPassword !== this.signup.userPasswordConfirm) {
        this.passwordconfirmMsg = "비밀번호가 일치하지 않습니다.";
      } else {
        this.passwordconfirmMsg = "";
      }
    },
    async userSignUp() {
      try {
        const response = await this.$axios.$post("/api/auth/signup", {
          email: this.signup.userId,
          password: this.signup.userPassword,
        });
        console.log(response);
      } catch (err) {
        console.error(err);
        // 에러 상태에 따른 로직
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.test {
  /* @apply border-2 border-orange1; */
}

.input-title {
  @apply font-bold text-gray1;
}
</style>
