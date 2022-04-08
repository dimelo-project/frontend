<template>
  <div class="select-none">
    <p class="txt-sub">
      <NuxtLink to="/mypage/profileset">프로필 수정</NuxtLink> >
      <span class="txt-sub-bold">비밀번호 변경</span>
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
      v-if="userHasPassword"
      :width="360"
      :height="44"
      :value="userPassword"
      @input="inputUserPassword"
      :placeholder="`현재 비밀번호`"
      :type="`password`"
      class="p-3 mt-10 rounded-4px"
      :class="{ 'border-orange2': userPassword.length > 0 }"
    />

    <div class="h-9">
      <span class="text-red1 txt-mini">{{ userPasswordNoti }}</span>
    </div>

    <ButtonGeneral
      @click="withdrawlUserAccount"
      :width="360"
      :height="44"
      class="text-white rounded-4px hover:bg-orange2"
      :class="[btnActive ? 'bg-orange1' : 'bg-gray10 pointer-events-none']"
    >
      <span>회원 탈퇴하기</span>
    </ButtonGeneral>

    <NuxtLink to="/mypage/profileset">
      <ButtonGeneral
        :width="360"
        :height="44"
        class="mt-3 border text-orange2 border-orange2 rounded-4px hover:bg-orange2 hover:text-white"
      >
        <span>취소</span>
      </ButtonGeneral></NuxtLink
    >
  </div>
</template>

<script>
export default {
  layout: "mypage",
  async asyncData({ $axios }) {
    let userHasPassword, btnActive;

    try {
      const response = await $axios.$get("/api/users/password");

      // console.log(response);
      if (response) {
        userHasPassword = true;
        btnActive = false;
      } else {
        userHasPassword = false;
        btnActive = true;
      }
    } catch (err) {
      console.error(err.response);
    }
    return { userHasPassword, btnActive };
  },
  data() {
    return {
      userPassword: "",
      userPasswordNoti: "",
      timeout: null,
      btnActive: false,
    };
  },
  methods: {
    async inputUserPassword(value) {
      this.userPassword = value;
      this.userPasswordNoti = "";
      this.btnActive = false;

      // debounce input event
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(async () => {
        try {
          const response = await this.$axios.$post(
            "/api/users/check/password",
            {
              password: this.userPassword,
            }
          );
          if (response) {
            this.btnActive = true;
            this.userPasswordNoti = "";
          }
        } catch (err) {
          this.userPasswordNoti = "비밀번호가 일치하지 않습니다.";
        }
      }, 500);
    },
    async withdrawlUserAccount() {
      try {
        if (this.userHasPassword) {
          const response = await this.$axios.$post("/api/users/delete/me", {
            password: this.userPassword,
          });
          // console.log(response);
        } else {
          const response = await this.$axios.$post("/api/users/deactivate/me");

          // console.log(response);
        }

        this.$router.push("/");
        this.$store.commit("auth/SET", { key: "user", value: false });
        this.$store.commit("auth/SET", { key: "loggedIn", value: false });
      } catch (err) {
        console.log(err.response);
      }
    },
  },
};
</script>

<style lang="postcss" scoped></style>
