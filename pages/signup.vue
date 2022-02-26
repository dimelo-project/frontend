<template>
  <div class="flex justify-center select-none mt-14">
    <div class="relative flex flex-col test" style="width: 360px">
      <h3 class="text-center txt-mid-bold">회원가입</h3>

      <!-- ID (EMAIL) -->
      <p class="mt-3 txt-sub">이메일</p>

      <InputGeneral
        @input="handleUserId"
        :value="signup.userId"
        :type="`test`"
        :width="360"
        :height="44"
        class="p-3 mt-2 border rounded-4px txt-sub"
        :class="[signup.userId.length > 0 ? 'border-orange2' : 'border-gray2']"
      />

      <!-- email Msg Box -->
      <div class="h-8 pt-1 txt-sub">
        <p
          class="txt-mini"
          :class="[isEmailMsgError ? ' text-red1' : 'text-green1']"
        >
          {{ emailMsg }}
        </p>
      </div>

      <!-- PASSWORD -->
      <p class="txt-sub">비밀번호 입력</p>

      <InputGeneral
        @input="handleUserPassword"
        :value="signup.userPassword"
        :type="`password`"
        :width="360"
        :height="44"
        class="p-3 mt-2 border rounded-4px txt-sub"
        :class="[
          signup.userPassword.length > 0 ? 'border-orange2' : 'border-gray2',
        ]"
      />

      <!-- password Msg Box -->
      <div class="h-8 pt-1 txt-sub">
        <p
          class="txt-mini"
          :class="[isPasswordMsgError ? 'text-red1' : 'text-green1']"
        >
          {{ passwordMsg }}
        </p>
      </div>

      <!-- PASSWORD CONFIRM -->
      <p class="txt-sub">비밀번호 확인</p>

      <InputGeneral
        :value="signup.userPasswordConfirm"
        @input="handleUserPasswordConfirm"
        :type="`password`"
        :width="360"
        :height="44"
        class="p-3 mt-2 border rounded-4px txt-sub"
        :class="[
          signup.userPasswordConfirm.length > 0
            ? 'border-orange2'
            : 'border-gray2',
        ]"
      />

      <!-- password confirm Msg Box -->
      <div class="pt-1 h-9 txt-sub">
        <p class="text-red1 txt-mini">
          {{ passwordconfirmMsg }}
        </p>
      </div>

      <!-- button -->
      <ButtonGeneral
        @click="userSignUp"
        :width="360"
        :height="56"
        class="text-white bg-orange1 txt-mid-bold rounded-4px hover:bg-orange2"
      >
        <span>회원가입</span>
      </ButtonGeneral>

      <!-- OAuth -->
      <p class="mt-10 text-center txt-mid-bold">간편 회원가입</p>

      <!-- OAuth logo link-->
      <div class="mt-5">
        <div class="flex justify-center">
          <div class="mr-3" @click="googlLogin">
            <img
              src="~assets/imgs/logo/google_logo.png"
              alt="구글로그인"
              style="width: 40px; height: 40px"
              draggable="false"
              class="cursor-pointer"
            />
          </div>
          <div class="ml-3" @click="githubLogin">
            <img
              src="~assets/imgs/logo/github_logo.png"
              alt="깃헙로그인"
              style="width: 40px; height: 40px"
              draggable="false"
              class="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "home",
  middleware: "auth",
  auth: "guest",
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
      isEmailMsgError: false,
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
          if (err.response.data.statusCode == 409) {
            this.emailMsg = "이미 가입했거나 탈퇴한 이메일입니다.";
          } else if (err.response.data.statusCode == 400) {
            this.emailMsg = "이메일 형식이 올바르지 않습니다.";
          }
        }
      }, 500);
    },
    handleUserPassword(value) {
      this.signup.userPassword = value;

      const regExp = new RegExp("(?=.*[0-9])(?=.*[a-z])");
      // console.log(regExp.test(value));
      if (regExp.test(value) === false || this.signup.userPassword.length < 8) {
        this.passwordMsg = "영문, 숫자를 포함해 8자 이상으로 만들어주세요.";
        this.isPasswordMsgError = true;
      } else if (regExp.test(value) === true) {
        this.passwordMsg = "사용 가능한 비밀번호 입니다.";
        this.isPasswordMsgError = false;
      }

      if (this.signup.userPassword !== this.signup.userPasswordConfirm) {
        this.passwordconfirmMsg = "비밀번호가 일치하지 않습니다.";
      } else {
        this.passwordconfirmMsg = "";
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
        await this.$axios.$post("/api/auth/signup", {
          email: this.signup.userId,
          password: this.signup.userPassword,
          passwordConfirm: this.signup.userPasswordConfirm,
        });
        await this.$auth.loginWith("local", {
          data: {
            email: this.signup.userId,
            password: this.signup.userPassword,
          },
        });
        this.$router.push("/profileset");
      } catch (err) {
        console.error(err.response.data);
        // 에러 상태에 따른 로직
      }
    },
    googlLogin() {
      window.open("https://dimeloserverapi.site/api/auth/google", "_self");
    },
    githubLogin() {
      window.open("https://dimeloserverapi.site/api/auth/github", "_self");
    },
  },
};
</script>

<style lang="postcss" scoped>
.test {
  /* @apply border-2 border-orange1; */
}
</style>
