<template>
  <div>
    <p class="txt-sub">
      프로필 수정 > <span class="txt-sub-bold">비밀번호 변경</span>
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
        :type="`password`"
        :value="currentPassword"
        :width="360"
        :height="44"
        :class="{ 'border-orange2': currentPassword.length > 0 }"
        @input="inputCurrentPassword"
      />
    </div>

    <div class="mt-0.5 mb-2.5">
      <span class="text-red1 txt-mini">비밀번호를 확인해주세요.</span>
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
        :class="{ 'border-orange2': newPassword.length > 0 }"
        @input="inputNewPassword"
      />
    </div>

    <div class="mt-0.5 mb-2.5">
      <span class="text-red1 txt-mini">
        영문, 숫자를 포함해 8자 이상으로 만들어주세요.
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
        :class="{ 'border-orange2': newPasswordConfirm.length > 0 }"
        @input="inputNewPasswordConfirm"
      />
    </div>

    <div class="mt-0.5 mb-2.5">
      <span class="text-red1 txt-mini"> 비밀번호가 일치하지 않습니다. </span>
    </div>

    <!-- submit button -->
    <NuxtLink to="/mypage/profileset/passwordchangecomplete">
      <ButtonGeneral
        :width="360"
        :height="44"
        class="text-white bg-orange2 txt-base-bold rounded-4px"
      >
        <span>비밀번호 변경하기</span>
      </ButtonGeneral>
    </NuxtLink>

    <!-- cancel submit button -->
    <ButtonGeneral
      :width="360"
      :height="44"
      class="mt-3 border text-orange2 border-orange2 txt-base-bold rounded-4px"
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
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    };
  },
  methods: {
    inputCurrentPassword(value) {
      this.currentPassword = value;
    },
    inputNewPassword(value) {
      this.newPassword = value;
    },
    inputNewPasswordConfirm(value) {
      this.newPasswordConfirm = value;
    },
  },
};
</script>

<style lang="postcss" scoped></style>
