<template>
  <div class="select-none">
    <p class="txt-sub">
      프로필 수정 > <span class="txt-sub-bold">비밀번호 변경</span>
    </p>

    <div class="border-t border-gray2"></div>

    <div class="flex flex-col items-center mt-11">
      <div>
        <img
          draggable="false"
          src="~/assets/imgs/icon/complete.png"
          alt="변경완료"
          style="width: 48px; height: 48px"
        />
      </div>

      <div>
        <h3 class="mt-3 txt-heading3">비밀번호 변경완료!</h3>
      </div>

      <div class="mt-2">
        <span>새로운 비밀번호로 로그인해주세요!</span>
      </div>

      <ButtonGeneral
        :width="240"
        :height="56"
        class="mt-8 text-white bg-orange2 rounded-4px txt-mid-bold"
        @click="$router.push('/login')"
      >
        <span>로그인</span>
      </ButtonGeneral>
    </div>
  </div>
</template>

<script>
export default {
  layout: "mypage",
  methods: {
    goToLogin() {
      // logout loginc
      // redirect ot login
    },
  },
};
</script>

<style lang="postcss" scoped></style>
