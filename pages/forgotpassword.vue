<template>
  <div>
    <div v-if="!submitted" class="flex justify-center mt-30">
      <div style="width: 380px">
        <h3 class="text-center txt-heading3">비밀번호 찾기</h3>
        <p class="mt-8">가입한 이메일로 임시 비밀번호를 보내드려요!</p>
        <p>이메일 주소를 입력해주세요.</p>
        <inputGeneral
          :value="userEmail"
          @input="updateInput"
          :width="380"
          :height="56"
          :type="`text`"
          class="px-3 py-4 mt-8 border rounded-4px"
          :class="[userEmail.length > 0 ? 'border-orange2' : 'border-gray2']"
        />
        <div class="h-8">
          <span v-if="userInputError" class="mt-1 text-red1 txt-sub">
            {{ processMessage }}
          </span>
        </div>
        <ButtonGeneral
          :width="380"
          :height="56"
          class="rounded-4px bg-orange1 hover:bg-orange2"
          @click="findUserPassword"
        >
          <span v-if="!loading" class="text-white txt-mid-bold">확인</span>
          <svgSpinner v-else :stColor="`white`" :bgColor="`white`" />
        </ButtonGeneral>
      </div>
    </div>

    <!-- test -->
    <div v-else class="flex flex-col items-center text-center mt-30">
      <div>
        <img
          draggable="false"
          src="~/assets/imgs/icon/complete.png"
          alt="변경완료"
          style="width: 48px; height: 48px"
        />
      </div>

      <div>
        <h3 class="mt-3 txt-heading3">메일 전송 완료!</h3>
      </div>

      <div class="mt-7">
        <span>
          임시 비밀번호를 메일로 전송했습니다.<br />
          메일함을 확인해 주세요.
        </span>
      </div>

      <div class="mt-7">
        <span>
          메일을 받지 못했나요?
          <span
            @click="resendEmail"
            class="underline cursor-pointer text-orange2 txt-base-bold"
          >
            다시 전송하기
          </span>
        </span>
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
      userEmail: "",
      userInputError: false,
      processMessage: "",
      submitted: false,
      loading: false,
    };
  },
  watch: {
    userEmail() {
      this.userInputError = false;
      this.processMessage = "";
    },
  },
  methods: {
    updateInput(value: string) {
      this.userEmail = value;
    },
    async findUserPassword() {
      this.loading = true;

      try {
        const response = await this.$axios.$post("/api/auth/find/password", {
          email: this.userEmail,
        });

        setTimeout(() => {
          if (response) {
            this.userInputError = false;
            this.submitted = true;
          }
          this.loading = false;
        }, 1000);
      } catch (err: any) {
        setTimeout(() => {
          if (err.response.data.statusCode === 400) {
            this.userInputError = true;
            this.processMessage = "이메일을 다시 확인해주세요.";
          }
          this.loading = false;
        }, 1000);
      }
    },
    resendEmail() {
      this.submitted = false;
    },
  },
});
</script>

<style lang="postcss" scoped></style>
