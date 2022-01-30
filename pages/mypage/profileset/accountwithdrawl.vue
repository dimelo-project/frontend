<template>
  <div class="select-none">
    <p class="txt-sub">
      프로필 수정 > <span class="txt-sub-bold">비밀번호 변경</span>
    </p>

    <div class="mt-3 border-t border-gray2"></div>

    <div class="mt-4">
      <span class="txt-mid-bold">회원 탈퇴하기</span>
    </div>

    <div class="mt-3">
      <span class="text-gray1">서비스 탈퇴</span>
    </div>

    <div class="pl-1 mt-2 txt-sub">
      <p>
        1. 탈퇴하시면 작성하신 리뷰, 게시글, 댓글을 수정 혹은 삭제하실 수
        없습니다.
      </p>
      <p>
        2. 탈퇴 신청 전에 꼭 확인해 주세요. 탈퇴 후 동일한 메일로는 재가입이
        불가능합니다.
      </p>
      <p>
        3. 현재 비밀번호를 아래에 입력하고 회원 탈퇴하기를 누르시면 위 내용에
        동의하는 것으로 간주됩니다.
      </p>
    </div>

    <InputGeneral
      :width="360"
      :height="44"
      :value="userPassword"
      @input="inputUserPassword"
      :placeholder="`현재 비밀번호`"
      class="mt-10 txt-sub"
      :class="{ 'border-orange2': userPassword.length > 0 }"
    />

    <ButtonGeneral
      :width="360"
      :height="44"
      class="text-white pointer-events-none bg-gray10 rounded-4px mt-9"
    >
      <span>회원 탈퇴하기</span>
    </ButtonGeneral>

    <ButtonGeneral
      :width="360"
      :height="44"
      class="mt-3 border-2 pointer-events-none text-gray10 border-gray10 rounded-4px"
    >
      <span>취소</span>
    </ButtonGeneral>
  </div>
</template>

<script>
export default {
  layout: "mypage",
  data() {
    return {
      userPassword: "",
    };
  },
  methods: {
    inputUserPassword(value) {
      this.userPassword = value;
    },
  },
};
</script>

<style lang="postcss" scoped></style>
