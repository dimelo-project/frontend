<template>
  <div>
    <img
      v-if="!url"
      src="~/assets/imgs/profile/default_user_profile.png"
      class="object-cover rounded-full"
      :style="`width: ${imgSize}px; height: ${imgSize}px`"
      alt="프로필이미지"
    />
    <img
      v-else
      :src="url"
      class="object-cover rounded-full"
      :style="`width: ${imgSize}px; height: ${imgSize}px`"
      alt="프로필이미지"
    />
  </div>
</template>

<script>
export default {
  props: ["url", "imgSize"],
};
</script>

<style lang="postcss" scoped></style>
