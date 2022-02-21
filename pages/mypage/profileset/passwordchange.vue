<template>
  <div class="select-none mb-96">
    <p class="txt-sub">
      <NuxtLink to="/mypage/profileset"> 프로필 수정</NuxtLink> >
      <span class="txt-sub-bold">비밀번호 변경</span>
    </p>

    <div class="mt-3 border-t border-gray2"></div>

    <div class="mt-4">
      <span class="txt-mid-bold">비밀번호 변경</span>
    </div>

    <div class="mt-5">
      <span class="txt-base-bold">현재 비밀번호</span>
    </div>

    <div class="mt-2">
      <InputGeneral
        ref="currentpassword"
        :type="`password`"
        :value="currentPassword"
        :width="360"
        :height="44"
        class="p-3 border rounded-4px border-gray2"
        :class="{ 'border-orange2': currentPassword.length > 0 }"
        @input="handleCurrentPassword"
      />
    </div>

    <div class="h-8">
      <span class="text-red1 txt-mini">{{ currentPasswordNotiMsg }}</span>
    </div>

    <!-- 새 비밀번호 입력 -->
    <div>
      <span class="txt-base-bold">새 비밀번호</span>
    </div>

    <div class="mt-2">
      <InputGeneral
        :type="`password`"
        :value="newPassword"
        :width="360"
        :height="44"
        class="p-3 border rounded-4px border-gray2"
        :class="{ 'border-orange2': newPassword.length > 0 }"
        @input="handleNewPassword"
      />
    </div>

    <div class="h-8">
      <span
        class="txt-mini"
        :class="[isNewPasswordMsgError ? 'text-red1' : 'text-green1']"
      >
        {{ newPasswordNotiMsg }}
      </span>
    </div>

    <!-- 비밀번호 확인 -->
    <div>
      <span class="txt-base-bold">비밀번호 확인</span>
    </div>

    <div class="mt-2">
      <InputGeneral
        :type="`password`"
        :value="newPasswordConfirm"
        :width="360"
        :height="44"
        class="p-3 border rounded-4px border-gray2"
        :class="{ 'border-orange2': newPasswordConfirm.length > 0 }"
        @input="handleNewPasswordConfirm"
      />
    </div>

    <div class="h-8">
      <span class="text-red1 txt-mini"> {{ newPasswordConfirmNotiMsg }} </span>
    </div>

    <!-- submit button -->
    <ButtonGeneral
      @click="changeUserPassword"
      :width="360"
      :height="44"
      class="border txt-base-bold rounded-4px"
      :class="[
        canSubmit
          ? 'text-white bg-orange1 hover:bg-orange2'
          : ' pointer-events-none border-gray2 bg-white text-gray2',
      ]"
    >
      <span>비밀번호 변경하기</span>
    </ButtonGeneral>

    <!-- cancel submit button -->
    <ButtonGeneral
      @click="$router.push('/mypage/profileset')"
      :width="360"
      :height="44"
      class="mt-3 border text-orange2 border-orange2 txt-base-bold rounded-4px hover:bg-orange2 hover:text-white"
    >
      <span>다음에 변경하기</span>
    </ButtonGeneral>
  </div>
</template>

<script>
export default {
  layout: "mypage",
  data() {
    return {
      // current password
      currentPassword: "",
      currentPasswordNotiMsg: "",
      isCurrentPasswordMsgError: false,
      timeout: null,
      // new password
      newPassword: "",
      newPasswordNotiMsg: "",
      isNewPasswordMsgError: false,
      // new password confirm
      newPasswordConfirm: "",
      newPasswordConfirmNotiMsg: "",
      isNewPasswordConfirmMsgError: false,
    };
  },
  computed: {
    canSubmit() {
      if (
        this.currentPassword.length > 0 &&
        !this.isCurrentPasswordMsgError &&
        this.newPassword.length > 0 &&
        !this.isNewPasswordMsgError &&
        this.newPasswordConfirm.length > 0 &&
        this.newPassword === this.newPasswordConfirm
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.$refs.currentpassword.$el.focus();
  },
  methods: {
    handleCurrentPassword(value) {
      this.currentPassword = value;
      this.currentPasswordNotiMsg = "";

      // debounce input event
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(async () => {
        try {
          const response = await this.$axios.$post(
            "/api/users/check/password",
            {
              password: this.currentPassword,
            }
          );

          if (response) {
            this.isCurrentPasswordMsgError = false;
          }
        } catch (err) {
          console.log(err.response);
          this.currentPasswordNotiMsg = "비밀번호가 일치하지 않습니다.";
          this.isCurrentPasswordMsgError = true;
        }
      }, 500);
    },
    handleNewPassword(value) {
      this.newPassword = value;

      const regExp = new RegExp("(?=.*[0-9])(?=.*[a-z])");

      if (regExp.test(value) === false || this.newPassword.length < 8) {
        this.newPasswordNotiMsg =
          "영문, 숫자를 포함해 8자 이상으로 만들어주세요.";
        this.isNewPasswordMsgError = true;
      } else {
        this.newPasswordNotiMsg = "사용 가능한 비밀번호 입니다.";
        this.isNewPasswordMsgError = false;
      }

      if (this.newPassword !== this.newPasswordConfirm) {
        this.newPasswordConfirmNotiMsg = "비밀번호가 일치하지 않습니다.";
      } else {
        this.newPasswordConfirmNotiMsg = "";
      }
    },
    handleNewPasswordConfirm(value) {
      this.newPasswordConfirm = value;
      this.newPasswordConfirmNotiMsg = "";

      if (this.newPassword !== this.newPasswordConfirm) {
        this.newPasswordConfirmNotiMsg = "비밀번호가 일치하지 않습니다.";
      } else {
        this.newPasswordConfirmNotiMsg = "";
      }
    },
    async changeUserPassword() {
      try {
        const response = await this.$axios.$patch(
          "/api/users/change/password",
          {
            password: this.currentPassword,
            newPassword: this.newPassword,
            passwordConfirm: this.newPasswordConfirm,
          }
        );
        await this.$auth.logout();
        this.$router.push("/mypage/profileset/passwordchangecomplete");
      } catch (err) {
        console.log(err.response);
      }
    },
  },
};
</script>

<style lang="postcss" scoped></style>
