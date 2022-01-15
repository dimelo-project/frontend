<template>
  <div class="flex justify-center mt-30">
    <div style="width: 380px">
      <h3 class="text-center txt-heading3">비밀번호 찾기</h3>
      <p class="mt-8">가입한 이메일로 임시 비밀번호를 보내드려요!</p>
      <p>이메일 주소를 입력해주세요.</p>
      <inputGeneral :value="userEmail" @input="updateInput" :height="56" />
      <buttonGeneral :large="true" :height="56" btnText="확인" class="mt-8" />
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
    };
  },
  methods: {
    updateInput(value: string) {
      this.userEmail = value;
    },
  },
});
</script>

<style lang="postcss" scoped></style>
