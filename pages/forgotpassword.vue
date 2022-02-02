<template>
  <div class="flex justify-center mt-30">
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
        class="px-3 py-4 mt-8 rounded-4px"
        :class="{ 'border-orange2': userEmail.length > 0 }"
      />
      <div class="h-8">
        <span v-if="userInputError" class="mt-1 text-red1 txt-sub">
          {{ processMessage }}
        </span>
      </div>
      <ButtonGeneral
        :width="380"
        :height="56"
        class="rounded-4px bg-orange2"
        @click="findUserPassword"
      >
        <span class="text-white txt-mid-bold">확인</span>
      </ButtonGeneral>
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
      try {
        const response = await this.$axios.$post("/api/auth/find/password", {
          email: this.userEmail,
        });
        this.userInputError = true;
      } catch (err: any) {
        if (err.response.data.statusCode === 400) {
          this.userInputError = true;
          this.processMessage = "이메일을 다시 확인해주세요.";
        }
      }
    },
  },
});
</script>

<style lang="postcss" scoped></style>
