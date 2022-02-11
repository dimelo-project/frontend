<template>
  <div class="flex justify-center select-none">
    <div class="mt-14 test" style="width: 990px">
      <div>
        <span class="txt-mid-bold">커뮤니티 자유주제 글쓰기</span>
      </div>

      <div class="mt-4 border-t border-gray2"></div>

      <div class="mt-6">
        <span class="txt-base-bold">카테고리</span>
      </div>

      <div class="flex mt-2">
        <ChipGeneral
          @click="clickCategoryMenu(idx)"
          v-for="(menu, idx) in categoryMenu"
          :key="idx"
          :chipText="menu.name"
          class="p-2 mr-2 border outline-none border-gray2 rounded-8px txt-sub"
          :class="{
            'bg-yellow1 border-yellow1': idx === selectedCategoryMenuIdx,
          }"
        />
      </div>

      <div class="mt-6">
        <span class="txt-base-bold">제목</span>
      </div>

      <div>
        <InputGeneral
          :value="titleInput"
          @input="handleInput"
          :width="684"
          :height="40"
          :type="`text`"
          :placeholder="`제목을 입력해주세요.`"
          :maxlength="titleMaxLength"
          class="px-3 py-2 mt-2 border border-gray2 rounded-8px txt-sub"
        />
        <div style="width: 684px" class="text-right txt-mini text-gray1">
          <span class="">{{ titleInput.length }}/{{ titleMaxLength }}</span>
        </div>
      </div>

      <div class="mt-6">
        <span class="txt-base-bold">내용</span>
      </div>

      <div>
        <textarea
          :value="contentInput"
          @input="handleContentInput"
          name=""
          id=""
          cols="30"
          rows="10"
          class="border border-black"
        ></textarea>
      </div>

      <div class="flex justify-end mt-14">
        <ButtonGeneral
          @click="cancelPost"
          :width="200"
          :height="44"
          class="transition-colors border border-orange2 rounded-4px text-orange2 txt-base-bold hover:bg-orange2 hover:text-white"
        >
          <span>취소</span>
        </ButtonGeneral>

        <ButtonGeneral
          @click="uploadArticle"
          :width="200"
          :height="44"
          class="ml-2 text-white transition-colors rounded-4px txt-base-bold bg-orange1 hover:bg-orange2"
        >
          <span>게시글 등록</span>
        </ButtonGeneral>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "home",
  data() {
    return {
      categoryMenu: [
        {
          id: 0,
          name: "개발",
        },
        {
          id: 1,
          name: "데이터",
        },
        {
          id: 2,
          name: "디자인",
        },
        {
          id: 3,
          name: "기타",
        },
      ],
      selectedCategoryMenuIdx: null,
      titleMaxLength: 50,
      titleInput: "",
      contentInput: "",
    };
  },
  methods: {
    clickCategoryMenu(idx) {
      this.selectedCategoryMenuIdx = idx;
    },
    handleInput(value) {
      if (value.length > this.titleMaxLength) {
        this.titleInput = value.slice(0, this.titleMaxLength);
      } else {
        this.titleInput = value;
      }
    },
    handleContentInput(event) {
      this.contentInput = event.target.value;
    },
    cancelPost() {
      this.$router.go(-1);
    },
    async uploadArticle() {
      try {
        const response = await this.$axios.$post(`/api/talks`, {
          category: this.categoryMenu[this.selectedCategoryMenuIdx].name,
          title: this.titleInput,
          content: this.contentInput,
        });

        console.log(response);
      } catch (err) {
        console.error(err.response);
      }
    },
  },
};
</script>

<style lang="postcss">
.test {
  /* @apply border border-orange2; */
}
</style>
