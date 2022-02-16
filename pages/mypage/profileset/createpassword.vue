<template>
  <div class="select-none mb-96">
    <p class="txt-sub">
      <NuxtLink to="/mypage/profileset"> 프로필 수정</NuxtLink> >
      <span class="txt-sub-bold">비밀번호 생성</span>
    </p>

    <div class="mt-3 border-t border-gray2"></div>

    <div class="mt-4">
      <span class="txt-mid-bold">비밀번호 생성</span>
    </div>

    <!-- 새 비밀번호 입력 -->
    <div class="mt-5">
      <span class="txt-base-bold">비밀번호 입력</span>
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
      class="text-white bg-orange1 hover:bg-orange2 txt-base-bold rounded-4px"
    >
      <span>비밀번호 생성하기</span>
    </ButtonGeneral>

    <!-- cancel submit button -->
    <ButtonGeneral
      @click="$router.push('/mypage/profileset')"
      :width="360"
      :height="44"
      class="mt-3 border text-orange2 border-orange2 txt-base-bold rounded-4px hover:bg-orange2 hover:text-white"
    >
      <span>다음에 생성하기</span>
    </ButtonGeneral>
  </div>
</template>

<script>
export default {
  layout: "mypage",
  data() {
    return {
      timeout: null,
      // new password
      newPassword: "",
      newPasswordNotiMsg: "",
      isNewPasswordMsgError: false,
      // new password confirm
      newPasswordConfirm: "",
      newPasswordConfirmNotiMsg: "",
    };
  },
  methods: {
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
      }
    },
    handleNewPasswordConfirm(value) {
      this.newPasswordConfirm = value;
      this.newPasswordConfirmNotiMsg = "";

      if (this.newPassword !== this.newPasswordConfirm) {
        this.newPasswordConfirmNotiMsg = "비밀번호가 일치하지 않습니다.";
      }
    },
    async changeUserPassword() {
      try {
        const response = await this.$axios.$patch("api/users/set/password", {
          newPassword: this.newPassword,
          passwordConfirm: this.newPasswordConfirm,
        });
        console.log(response);
        if (response) {
          // create password success alert modal
        }
      } catch (err) {
        console.log(err.response);
      }
    },
  },
};
</script>

<style lang="postcss" scoped></style>
