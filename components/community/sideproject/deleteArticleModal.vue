<template>
  <div
    v-if="isModalOpened"
    class="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-opacity-75 border-0"
    style="background-color: rgba(11, 19, 30, 0.37)"
  >
    <div
      class="flex items-center justify-center bg-white border-0 select-none rounded-8px"
      style="width: 520px; height: 200px"
    >
      <div class="text-center">
        <div v-if="!isDeleteCompleted">
          <span class="txt-mid">삭제하시겠습니까?</span>
          <div class="flex mt-11">
            <ButtonGeneral
              @click="$emit('modalclosed')"
              :width="145"
              :height="44"
              class="border border-orange2 text-orange2 rounded-4px hover:bg-orange2 hover:text-white"
            >
              <span class="txt-base-bold"> 취소 </span>
            </ButtonGeneral>
            <ButtonGeneral
              @click="deleteMyArticle()"
              :width="145"
              :height="44"
              class="ml-4 text-white bg-orange1 rounded-4px hover:bg-orange2"
            >
              <span class="txt-base-bold"> 삭제 </span>
            </ButtonGeneral>
          </div>
        </div>
        <div v-else class="flex flex-col items-center">
          <span class="txt-mid">삭제완료</span>
          <span class="mt-3 txt-base">글을 삭제했습니다.</span>
          <ButtonGeneral
            @click="clickCompleteBtn"
            :width="60"
            :height="40"
            class="mt-5 text-white bg-orange1 rounded-4px hover:bg-orange2"
          >
            <span class="txt-base-bold"> 확인 </span>
          </ButtonGeneral>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isModalOpened: {
      type: Boolean,
      default: () => false,
    },
    prevArticleContent: {
      type: Object,
    },
  },
  data() {
    return {
      isDeleteCompleted: false,
    };
  },
  methods: {
    async deleteMyArticle() {
      try {
        const response = await this.$axios.$delete(
          `/api/projects/${this.prevArticleContent.project_id}`
        );

        if (response) {
          this.isDeleteCompleted = true;
        }
      } catch (err) {
        console.log(err.response.data);
      }
    },
    clickCompleteBtn() {
      this.$emit("modalclosed");
      this.isDeleteCompleted = false;

      this.$router.push("/community/sideproject");
    },
  },
};
</script>
