<template>
  <div class="flex justify-center mt-14">
    <PageMoveBtn :btnText="`sdf`" @click="handleClick" class="" />
    <div style="width: 788px; margin-bottom: 544px" class="ml-12">
      <!-- content title -->
      <div class="flex items-start">
        <ChipGeneral
          :height="34"
          :borderRadius="`rounded-4px`"
          :chipText="articleData['project_ongoing']"
          class="bg-green2 text-green1 py-5px px-2.5 txt-base-bold pointer-events-none flex-shrink-0"
        />
        <h3 class="ml-3 txt-heading3">
          {{ articleData["project_title"] }}
        </h3>
      </div>
      <!-- author info & created date -->
      <div class="flex items-center justify-between mt-5">
        <div class="flex items-center">
          <profileImageAvatar
            :url="articleData['user_imageUrl']"
            :imgSize="36"
          />
          <!-- nickname -->
          <span class="ml-2 txt-base-bold">{{
            articleData["user_nickname"]
          }}</span>
          <!-- career duration -->
          <span class="ml-1.5">{{ articleData["user_career"] }}</span>
          <!-- created date -->
          <div class="ml-6 text-gray6">
            <span>{{ articleData["project_createdAt"].split(" ")[0] }}</span>
            <span class="ml-1">{{
              articleData["project_createdAt"].split(" ")[1]
            }}</span>
          </div>
        </div>

        <div
          v-if="
            $auth &&
            $auth.user &&
            $auth.user.nickname === articleData['user_nickname']
          "
        >
          <span
            @click="clickUpdateArticleBtn"
            class="underline cursor-pointer text-gray1 txt-sub"
            >수정</span
          >
          <span
            class="ml-2 underline cursor-pointer text-gray1 txt-sub"
            @click="clickDeleteArticleBtn"
            >삭제</span
          >
        </div>
      </div>
      <!-- divider -->
      <div class="mt-5 border-t border-gray2"></div>
      <!-- 모집 포지션 -->
      <div class="flex items-center mt-7">
        <div style="width: 82px" class="mr-5">
          <span class="txt-base-bold text-gray1">모집 포지션</span>
        </div>
        <div v-if="articleData['project_position']" class="flex">
          <ChipGeneral
            v-for="(position, idx) in articleData['project_position'].split(
              ','
            )"
            :key="idx"
            :height="40"
            :borderRadius="`rounded-4px`"
            :chipText="position"
            class="px-3 py-2 mr-3 pointer-events-none bg-gray3"
          />
        </div>
        <div v-else class="flex items-center">
          <ChipGeneral
            :height="40"
            :borderRadius="`rounded-4px`"
            :chipText="`협의 후 결정`"
            class="px-3 py-2 mr-3 pointer-events-none bg-gray3"
          />
        </div>
      </div>
      <!-- selected tech stacks -->
      <div class="flex mt-8">
        <div
          class="flex items-center flex-shrink-0 mr-5 txt-base-bold text-gray1"
          style="height: 40px; width: 82px"
        >
          <span>사용 기술</span>
        </div>
        <div class="flex flex-wrap" style="width: 700px">
          <ChipGeneral
            v-for="(skill, idx) in articleData['project_skill'].split(',')"
            :key="idx"
            :height="40"
            :borderRadius="`rounded-4px`"
            :chipText="skill"
            class="px-3 py-2 mb-2 mr-3 pointer-events-none bg-gray3"
          />
        </div>
      </div>
      <!-- divider -->
      <div class="mt-5 border-t border-gray2"></div>
      <!-- content body -->
      <div class="mt-9">
        <p
          class="break-words whitespace-pre-wrap ProseMirror"
          v-html="articleData['project_markup']"
        ></p>
        <!-- <p>
          {{ articleData["project_content"] }}
        </p> -->
      </div>
      <!-- divider -->
      <div class="border-t mt-9 border-gray2"></div>
      <!-- number of comments -->
      <div class="mt-7">
        <span class="txt-mid-bold">댓글 {{ allCommentData.length }}</span>
      </div>
      <!-- comments list -->
      <div class="mt-7" v-for="(comment, idx) in allCommentData" :key="idx">
        <!-- commentor info -->
        <div class="flex items-center">
          <!-- commentor profile image -->
          <profileImageAvatar :url="comment['user_imageUrl']" :imgSize="36" />
          <!-- commentor nickname -->
          <span class="ml-2 txt-base-bold">{{ comment["user_nickname"] }}</span>
          <!-- commentor career duration -->
          <span class="ml-1.5 txt-base">{{ comment["user_career"] }}</span>
        </div>
        <!-- comment body -->
        <div class="mt-2.5">
          <span class="break-words whitespace-pre-line">{{
            comment["comment_commentText"]
          }}</span>
        </div>
        <!-- comment created date -->
        <div class="mt-2">
          <span class="text-gray1">{{
            comment["comment_updatedAt"].split(" ")[0]
          }}</span>

          <span
            v-if="$auth && $auth.user && $auth.user.id === comment['user_id']"
            @click="clickUpdateText(idx, comment['comment_id'])"
            class="ml-10 underline cursor-pointer text-gray1 txt-sub"
          >
            수정
          </span>
          <span
            v-if="$auth && $auth.user && $auth.user.id === comment['user_id']"
            @click="deleteComment(idx, comment['comment_id'])"
            class="ml-4 underline cursor-pointer text-gray1 txt-sub"
          >
            삭제
          </span>
        </div>
      </div>
      <!-- comment Box & submit button -->
      <div class="flex mt-12">
        <CommentBox
          ref="commentbox"
          :value="userComment"
          @input="handleInput"
          :placeholder="`답변을 남겨보세요.`"
          class="border border-gray2 rounded-8px py-2.5 px-3 w-full max-h-40"
        />
        <ButtonGeneral
          v-if="commentEditMode"
          @click="cancelCommentEdit"
          :width="72"
          :height="44"
          class="rounded-8px txt-base-bold text-orange2 bg-white border border-orange2 hover:text-white hover:bg-orange2 py-2.5 px-5 flex-shrink-0 ml-3.5"
        >
          <span>취소</span>
        </ButtonGeneral>
        <ButtonGeneral
          v-if="commentEditMode"
          @click="updateComment"
          :width="72"
          :height="44"
          class="rounded-8px txt-base-bold text-white bg-orange1 hover:bg-orange2 py-2.5 px-5 flex-shrink-0 ml-3.5"
        >
          <span>수정</span>
        </ButtonGeneral>
        <ButtonGeneral
          v-if="!commentEditMode"
          @click="uploadComment"
          :width="72"
          :height="44"
          class="rounded-8px txt-base-bold text-white bg-orange1 hover:bg-orange2 py-2.5 px-5 flex-shrink-0 ml-3.5"
        >
          <span>등록</span>
        </ButtonGeneral>
      </div>
    </div>

    <!-- update article modal -->
    <communitySideprojectUpdateArticleModal
      :isModalOpened="isUpdateArticleModalOpened"
      @modalclosed="isUpdateArticleModalOpened = false"
      :prevArticleContent="articleData"
      @updateArticle="updateArticle"
    />
    <!-- delete article modal -->
    <communitySideprojectDeleteArticleModal
      :isModalOpened="isDeleteArticleModalOpened"
      @modalclosed="isDeleteArticleModalOpened = false"
      :prevArticleContent="articleData"
    />
  </div>
</template>

<script>
export default {
  layout: "home",
  async asyncData({ $axios, params }) {
    // console.log(params.id);
    let articleData, allCommentData;

    try {
      articleData = await $axios.$get(`/api/projects/${params.id}`);
      // console.log("articleData", articleData);

      allCommentData = await $axios.$get(`/api/projects/${params.id}/comments`);
      // console.log("allCommentData", allCommentData);
    } catch (err) {
      console.error(err.response);
    }

    return { articleData, allCommentData };
  },
  data() {
    return {
      userComment: "",
      commentEditMode: false,
      selectedCommentDataIdx: null,
      selectedCommentId: null,
      isUpdateArticleModalOpened: false,
      isDeleteArticleModalOpened: false,
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
      try {
        this.allCommentData = await this.$axios.$get(
          `/api/projects/${this.$route.params.id}/comments`
        );
      } catch (err) {
        console.error(err.response);
      }
    },
    async uploadComment() {
      if (!this.$store.getters["authentication/isUserLoggedIn"]) {
        this.$store.commit("loginModal/changeIsLoginModalOpened", true);
        return;
      }

      if (!this.$store.getters["authentication/isAlreadyProfileSet"]) {
        this.$store.commit("requireProfileSetModal/changeIsModalOpened", true);
        return;
      }

      if (this.userComment === "") {
        return;
      }

      try {
        const response = await this.$axios.$post(
          `/api/projects/${this.$route.params.id}/comments`,
          {
            commentText: this.userComment,
          }
        );
        if (response) {
          this.userComment = "";
          this.getAllCommentData();
        }
        // console.log(response);
      } catch (err) {
        console.error(err.response);
      }
    },
    clickUpdateText(commentDataIdx, comment_id) {
      this.selectedCommentDataIdx = commentDataIdx;
      this.selectedCommentId = comment_id;
      this.userComment =
        this.allCommentData[commentDataIdx]["comment_commentText"];
      this.$refs.commentbox.$el.focus();
      this.commentEditMode = true;
    },
    cancelCommentEdit() {
      this.userComment = "";
      this.commentEditMode = false;
    },
    clickUpdateArticleBtn() {
      this.isUpdateArticleModalOpened = true;
    },
    clickDeleteArticleBtn() {
      this.isDeleteArticleModalOpened = true;
    },
    updateArticle(newArticleData) {
      this.articleData = Object.assign({}, this.articleData, {
        project_ongoing: newArticleData.ongoing,
        project_title: newArticleData.title,
        project_markup: newArticleData.markup,
        project_position: newArticleData.positions,
        project_skill: newArticleData.skills,
      });

      // console.log("myNewData", this.articleData);
    },
    async updateComment() {
      try {
        const response = await this.$axios.$patch(
          `/api/projects/${this.$route.params.id}/comments/${this.selectedCommentId}`,
          {
            commentText: this.userComment,
          }
        );

        // console.log(response);
        if (response) {
          this.commentEditMode = false;
          this.allCommentData.splice(
            this.selectedCommentDataIdx,
            1,
            Object.assign(
              {},
              this.allCommentData[this.selectedCommentDataIdx],
              {
                comment_commentText: this.userComment,
              }
            )
          );
          this.userComment = "";
        }
      } catch (err) {
        console.error(err.response);
      }
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
