<template>
  <div
    v-on="$listeners"
    style="width: 50px; height: 50px"
    class="flex items-center justify-center border rounded-full cursor-pointer border-gray2"
  >
    <img src="~/assets/imgs/icon/leftarrow.png" alt="뒤로가기" />
  </div>
</template>

<script>
export default {
  props: {},
};
</script>

<style lang="postcss" scoped></style>
