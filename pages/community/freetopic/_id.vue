<template>
  <div class="flex justify-center mt-14">
    <PageMoveBtn :btnText="`sdf`" @click="handleClick" class="" />
    <div style="width: 788px; margin-bottom: 544px" class="ml-12">
      <!-- content title -->
      <div class="flex items-start">
        <ChipGeneral
          :height="34"
          :borderRadius="`rounded-4px`"
          :chipText="articleData['talk_category']"
          class="bg-green2 mt-2 text-green1 py-5px px-2.5 txt-base-bold flex-shrink-0 pointer-events-none select-none"
        />
        <div class="break-all">
          <h3 class="ml-3 txt-heading3">
            {{ articleData["talk_title"] }}
          </h3>
        </div>
      </div>
      <!-- author info & created date -->
      <div class="flex items-center mt-5">
        <!-- profile image -->
        <div
          v-if="!articleData['user_imageUrl']"
          class="bg-gray-700 rounded-full w-9 h-9"
        ></div>
        <img
          v-else
          style="width: 36px; height: 36px"
          :src="articleData['user_imageUrl']"
          class="object-cover rounded-full"
          alt="프로필이미지"
        />
        <!-- nickname -->
        <span class="ml-2 txt-base-bold">
          {{ articleData["user_nickname"] }}
        </span>
        <!-- career duration -->
        <span class="ml-1.5">
          {{ articleData["user_job"] }} {{ articleData["user_career"] }}
        </span>
        <!-- created date -->
        <div class="ml-6 text-gray6">
          <span>{{ articleData["talk_createdAt"].split(" ")[0] }}</span>
          <span class="ml-1">
            {{ articleData["talk_createdAt"].split(" ")[1] }}
          </span>
        </div>
      </div>
      <!-- divider -->
      <div class="mt-5 border border-gray2"></div>
      <!-- content body -->
      <div class="mt-9">
        <!-- prettier-ignore -->
        <p
          class="break-words whitespace-pre-wrap ProseMirror"
          v-html="articleData['talk_markup']"
        ></p>
      </div>
      <!-- divider -->
      <div class="mt-9"></div>
      <!-- number of comments -->
      <div class="mt-7">
        <span class="txt-mid-bold">댓글 {{ articleData["num_comment"] }}</span>
      </div>
      <!-- comments list -->
      <div class="mt-7" v-for="(comment, idx) in allCommentData" :key="idx">
        <!-- commentor info -->
        <div class="flex items-center">
          <!-- commentor profile image -->
          <div
            v-if="!comment['user_imageUrl']"
            class="bg-gray-300 rounded-full w-9 h-9"
          ></div>
          <img
            style="width: 36px; height: 36px"
            class="object-cover rounded-full"
            :src="comment['user_imageUrl']"
            alt="프로필이미지"
          />
          <!-- commentor nickname -->
          <span class="ml-2 txt-base-bold">{{ comment["user_nickname"] }}</span>
          <!-- commentor career duration -->
          <span class="ml-1.5 txt-base"
            >{{ comment["user_job"] }}{{ comment["user_career"] }}</span
          >
        </div>
        <!-- comment body -->
        <div class="mt-2.5">
          <!-- prettier-ignore -->
          <span class="break-words whitespace-pre-line">{{ comment["comment_commentText"] }}</span>
        </div>
        <!-- comment created date -->
        <div class="mt-2">
          <span class="text-gray1">
            {{ comment["comment_updatedAt"].split(" ")[0] }}
          </span>
        </div>
      </div>
      <!-- comment Box & submit button -->
      <div class="flex mt-12">
        <CommentBox
          :value="userComment"
          @input="handleInput"
          :placeholder="`답변을 남겨보세요.`"
          class="border border-gray2 rounded-8px py-2.5 px-3 w-full max-h-40"
        />
        <ButtonGeneral
          @click="uploadComment"
          :width="72"
          :height="44"
          class="rounded-8px txt-base-bold text-white bg-orange1 hover:bg-orange2 py-2.5 px-5 flex-shrink-0 ml-3.5"
        >
          <span>등록</span>
        </ButtonGeneral>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "home",
  async asyncData({ $axios, params }) {
    // console.log(params.id);
    const articleData = await $axios.$get(`/api/talks/${params.id}`);
    console.log("articleData", articleData);

    const allCommentData = await $axios.$get(
      `/api/talks/${params.id}/comments`
    );
    console.log("allCommentData", allCommentData);

    return { articleData, allCommentData };
  },
  data() {
    return {
      rows: 1,
      userComment: "",
    };
  },
  methods: {
    handleInput(value) {
      this.userComment = value;
    },
    handleClick() {
      this.$router.go(-1);
    },
    async getAllCommentData() {
      this.allCommentData = await this.$axios.$get(
        `/api/talks/${this.$route.params.id}/comments`
      );
    },
    async uploadComment() {
      const response = await this.$axios.$post(
        `/api/talks/${this.$route.params.id}/comments`,
        {
          commentText: this.userComment,
        }
      );
      if (response) {
        this.userComment = "";
        this.getAllCommentData();
      }
      console.log(response);
    },
  },
};
</script>

<style lang="postcss" scoped>
>>> p:empty:before {
  content: " ";
  white-space: pre;
}
>>> .ProseMirror > * + * {
  margin-top: 0.75em;
}
>>> .ProseMirror ul,
ol {
  padding: 0 1rem;
}
>>> .ProseMirror ol {
  padding: 0 1rem;
}
>>> .ProseMirror h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.1;
}
>>> .ProseMirror h1 {
  font-family: "NotoSansKR-Regular";
  font-size: 2.8125rem;
}
>>> .ProseMirror h2 {
  font-family: "NotoSansKR-Regular";
  font-size: 2.375rem;
}
>>> .ProseMirror h3 {
  font-family: "NotoSansKR-Regular";
  font-size: 1.75rem;
}
>>> .ProseMirror h4 {
  font-family: "NotoSansKR-Regular";
  font-size: 1.25rem;
}
>>> .ProseMirror h5 {
  font-family: "NotoSansKR-Regular";
  font-size: 1rem;
}
>>> .ProseMirror h6 {
  font-family: "NotoSansKR-Regular";
  font-size: 0.75rem;
}
>>> .ProseMirror code {
  background-color: rgb(97, 97, 97, 0.5);
  color: black;
}
>>> .ProseMirror blockquote {
  padding-left: 1rem;
  border-left: 2px solid #616161;
}
>>> .ProseMirror hr {
  border: none;
  border-top: 2px solid #616161;
  margin: 2rem 0;
}
>>> .ProseMirror pre {
  background: #0d0d0d;
  color: #fff;
  font-family: "JetBrainsMono", monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

>>> .ProseMirror pre code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}
</style>
