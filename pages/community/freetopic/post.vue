<template>
  <div class="flex justify-center select-none mb-96">
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
          class="p-2 mr-2 transition-colors border outline-none border-gray2 rounded-4px txt-sub"
          :class="{
            'bg-yellow1 border-yellow1': idx === selectedCategoryMenuIdx,
          }"
        />
      </div>

      <div class="mt-6">
        <span class="txt-base-bold">제목</span>
      </div>

      <div class="relative" style="width: 684px">
        <InputGeneral
          :value="titleInput"
          @input="handleInput"
          :width="684"
          :height="40"
          :type="`text`"
          :placeholder="`제목을 입력해주세요.`"
          :maxlength="titleMaxLength"
          class="px-6 py-2 mt-2 border border-gray2 rounded-4px txt-sub"
        />

        <div class="absolute right-0 h-0">
          <span class="txt-mini text-gray1">
            {{ titleInput.length }}/{{ titleMaxLength }}
          </span>
        </div>
      </div>

      <div class="mt-6 mb-2">
        <span class="txt-base-bold">내용</span>
      </div>

      <client-only>
        <div
          v-if="editor"
          style="width: 990px; height: 56px"
          class="flex items-center px-6 border border-gray2 rounded-4px"
        >
          <button
            @click="editor.chain().focus().toggleBold().run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('bold') }"
          >
            <EditorIconBold class="editor-icon-size" />
          </button>
          <button
            @click="editor.chain().focus().toggleItalic().run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('italic') }"
          >
            <EditorIconItalic class="editor-icon-size" />
          </button>
          <button
            @click="editor.chain().focus().toggleUnderline().run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('underline') }"
          >
            <EditorIconUnderline class="editor-icon-size" />
          </button>
          <button
            @click="editor.chain().focus().toggleStrike().run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('strike') }"
          >
            <EditorIconStrike class="editor-icon-size" />
          </button>
          <button
            @click="editor.chain().focus().setParagraph().run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('paragraph') }"
          >
            <EditorIconParagraph class="editor-icon-size" />
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          >
            <span class="editor-icon-size txt-base-bold"> h1 </span>
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          >
            <span class="editor-icon-size txt-base-bold"> h2 </span>
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          >
            <span class="editor-icon-size txt-base-bold"> h3 </span>
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
          >
            <span class="editor-icon-size txt-base-bold"> h4 </span>
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
          >
            <span class="editor-icon-size txt-base-bold"> h5 </span>
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
          >
            <span class="editor-icon-size txt-base-bold"> h6 </span>
          </button>
          <button
            @click="editor.chain().focus().toggleBulletList().run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('bulletList') }"
          >
            <EditorIconUl class="editor-icon-size" />
          </button>
          <button
            @click="editor.chain().focus().toggleOrderedList().run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('orderedList') }"
          >
            <EditorIconOl class="editor-icon-size" />
          </button>
          <button
            @click="editor.chain().focus().toggleCodeBlock().run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('codeBlock') }"
          >
            <EditorIconCode class="editor-icon-size" />
          </button>
          <button
            @click="editor.chain().focus().toggleBlockquote().run()"
            class="editor-icon-style"
            :class="{ 'is-active': editor.isActive('blockquote') }"
          >
            <EditorIconQuote class="editor-icon-size" />
          </button>
          <button
            @click="editor.chain().focus().undo().run()"
            class="editor-icon-style"
          >
            <EditorIconUndo class="editor-icon-size" />
          </button>
          <button
            @click="editor.chain().focus().redo().run()"
            class="editor-icon-style"
          >
            <EditorIconRedo class="editor-icon-size" />
          </button>
        </div>
        <editor-content class="txt-sub" :editor="editor" />
      </client-only>

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
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";

export default {
  layout: "home",
  components: {
    EditorContent,
  },
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
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: "서로에게 예의를 지키며 이야기를 나눠보세요 :)",
        }),
        Underline,
      ],
      content: "",
    });
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
    cancelPost() {
      this.$router.go(-1);
    },
    beforeDestroy() {
      this.editor.destroy();
    },
    async uploadArticle() {
      const htmlData = this.editor.getHTML();
      const textData = this.editor.getText();
      // console.log(htmlData, textData);

      try {
        const response = await this.$axios.$post(`/api/talks`, {
          category: this.categoryMenu[this.selectedCategoryMenuIdx].name,
          title: this.titleInput,
          content: textData,
          markup: htmlData,
        });

        if (response) {
          this.$router.push("/community/freetopic");
        }

        // console.log(response);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
<style lang="postcss" scoped>
>>> .ProseMirror {
  width: 990px;
  height: 320px;
  overflow-y: auto;

  padding: 24px;
  outline: none;
  border: 1px solid #e0e1e5;
  border-radius: 4px;
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

/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

.editor-icon-style {
  @apply p-1 transition rounded-4px hover:text-white hover:bg-black1;
}
.editor-icon-size {
  width: 20px;
  height: 20px;
}
</style>
