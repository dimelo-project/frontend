<template>
  <div class="flex items-center justify-center txt-heading3">
    <div
      v-if="error.statusCode === 404"
      class="flex flex-col items-center mt-14"
    >
      <img
        src="~/assets/imgs/route/404.png"
        alt="404"
        style="width: 150px; height: 120px"
        draggable="false"
      />

      <span class="mt-8 txt-heading3">페이지를 찾을 수 없습니다.</span>
      <span class="mt-6 text-center txt-base">
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.<br />
        서비스 이용에 불편을 드려 죄송합니다.
      </span>
      <div @click="$router.go(-1)">
        <span class="mt-3 underline cursor-pointer txt-base text-orange2"
          >이전 페이지로 돌아가기
        </span>
      </div>
    </div>
    <div v-else-if="error.statusCode === 500" class="mt-14">
      <p>서버에 문제가 있습니다. 불편을 드려 죄송합니다.</p>
    </div>
    <h1 v-else>An error occurred</h1>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "home", // you can set a custom layout for the error page
};
</script>
