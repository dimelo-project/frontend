<template>
  <div class="flex justify-center select-none mb-96">
    <div class="mt-14 test" style="width: 990px">
      <div>
        <span class="txt-mid-bold">커뮤니티 스터디 글쓰기</span>
      </div>

      <div class="mt-4 border-t border-gray2"></div>

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
        <span class="txt-base-bold">사용 기술</span>
      </div>

      <div style="width: 684px">
        <!-- 선택된 기술 칩 리스트 -->
        <div
          class="flex px-2 mt-2 border rounded-8px border-gray2"
          :class="{ 'pb-2': selecetedTechStacks.length > 5 }"
          style="width: 684px; min-height: 48px"
        >
          <div class="flex flex-wrap items-center flex-grow">
            <div
              v-for="(tech, idx) in selecetedTechStacks"
              :key="tech.id"
              class="flex items-center content-center justify-center px-2 mr-2 bg-gray3"
              :class="{ 'mt-2': selecetedTechStacks.length > 5 }"
              style="border-radius: 100px; width: 101px; height: 30px"
            >
              <span class="flex-grow text-center txt-mini">{{
                tech.name
              }}</span>

              <div
                @click="popTechStack(tech, idx)"
                class="flex-shrink-0 cursor-pointer"
              >
                <SvgCloseChip />
              </div>
            </div>
          </div>

          <div
            @click="showAvailableTechStack"
            class="flex flex-shrink-0 cursor-pointer"
            :class="[selecetedTechStacks.length > 5 ? 'mt-2' : 'items-center']"
          >
            <SvgChevronDownOutline
              :class="{ 'rotate-180': this.techDropDown }"
              class="duration-700 transform"
            />
          </div>
        </div>

        <div
          v-if="techDropDown"
          class="overflow-y-scroll border border-gray2 rounded-4px"
          style="height: 196px"
        >
          <div
            v-for="stack in availableTeckStacks"
            @click="pushTeckStack(stack)"
            :key="stack.id"
            this.sele
            class="flex items-center transition-colors duration-75 cursor-pointer hover:bg-gray3"
            style="height: 36px"
          >
            <span class="px-3 py-2 txt-mini">{{ stack.name }}</span>
          </div>
        </div>
      </div>

      <div class="mt-6 mb-2">
        <span class="txt-base-bold">모집인원</span>
      </div>

      <div
        @click="showParticpantDropDown"
        style="width: 70px; height: 36px"
        class="flex items-center justify-center border cursor-pointer border-gray2 rounded-4px"
      >
        <span v-if="selectedParticpantNum" class="ml-1 txt-sub">
          {{ selectedParticpantNum }} 명
        </span>

        <span v-else class="ml-1 txt-sub">미정</span>
        <div class="ml-1">
          <SvgChevronDownOutline
            :class="{ 'rotate-180': this.participantDropDown }"
            class="duration-700 transform"
          />
        </div>
      </div>
      <div
        v-if="participantDropDown"
        style="width: 70px; height: 216px"
        class="overflow-y-scroll border border-gray2 rounded-4px"
      >
        <div
          @click="selectParticpantNum('미정')"
          style="height: 36px"
          class="flex items-center cursor-pointer hover:bg-gray3"
        >
          <span class="ml-2 txt-sub"> 미정</span>
        </div>
        <div
          v-for="i in 15"
          @click="selectParticpantNum(i)"
          :key="i"
          style="height: 36px"
          class="flex items-center cursor-pointer hover:bg-gray3"
        >
          <span class="ml-2 txt-sub"> {{ i }} 명</span>
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
      selecetedTechStacks: [],
      selectedHashTable: [],
      availableTeckStacks: [
        {
          id: 0,
          name: "JavaScript",
          pName: "JavaScript",
        },
        {
          id: 1,
          name: "TypeScript",
          pName: "TypeScript",
        },
        {
          id: 2,
          name: "React",
          pName: "React",
        },
        {
          id: 3,
          name: "Vue.js",
          pName: "Vuejs",
        },
        {
          id: 4,
          name: "Java",
          pName: "Java",
        },
        {
          id: 5,
          name: "Spring",
          pName: "Spring",
        },
        {
          id: 6,
          name: "Php",
          pName: "Php",
        },
        {
          id: 7,
          name: "Go",
          pName: "Go",
        },
        {
          id: 8,
          name: "C++",
          pName: "C++",
        },
        {
          id: 9,
          name: "Kotlin",
          pName: "Kotlin",
        },
        {
          id: 10,
          name: "Python",
          pName: "Python",
        },
        {
          id: 11,
          name: "Django",
          pName: "Django",
        },
        {
          id: 12,
          name: "Flutter",
          pName: "Flutter",
        },
        {
          id: 13,
          name: "Swift",
          pName: "Swift",
        },
        {
          id: 14,
          name: "Node.js",
          pName: "Nodejs",
        },
        {
          id: 15,
          name: "Next.js",
          pName: "Nextjs",
        },
        {
          id: 16,
          name: "Nuxt.js",
          pName: "Nuxtjs",
        },
        {
          id: 17,
          name: "Svelte",
          pName: "Svelte",
        },
        {
          id: 18,
          name: "Nest.js",
          pName: "Nestjs",
        },
        {
          id: 19,
          name: "Xd",
          pName: "Xd",
        },
        {
          id: 20,
          name: "Zeplin",
          pName: "Zeplin",
        },
        {
          id: 21,
          name: "Figma",
          pName: "Figma",
        },
        {
          id: 22,
          name: "기타",
          pName: "etc",
        },
      ],
      techDropDown: false,
      participantDropDown: false,
      selectedParticpantNum: 1,
      categoryMenu: [
        {
          id: 0,
          name: "모집중",
        },
        {
          id: 1,
          name: "모집완료",
        },
      ],
      selectedCategoryMenuIdx: 0,
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

      const data = {
        title: this.titleInput,
        content: textData,
        markup: htmlData,
        ongoing: "모집중",
        participant: this.selectedParticpantNum,
        skills: this.selecetedTechStacks
          .map((elem) => {
            return elem.pName;
          })
          .join(),
      };

      try {
        const response = await this.$axios.$post(`/api/studies`, data);

        if (response) {
          this.$router.push("/community/study");
        }
        // console.log(response);
      } catch (err) {
        alert("폼의 모든 부분을 채워주세요!");

        console.error(err);
      }
    },
    popTechStack(tech, idx) {
      this.selecetedTechStacks.splice(idx, 1);
      this.selectedHashTable[tech.id] = 0;
    },
    pushTeckStack(stack) {
      if (this.selectedHashTable[stack.id]) {
        return;
      }
      this.selecetedTechStacks.push(stack);
      this.selectedHashTable[stack.id] = 1;
    },
    showAvailableTechStack() {
      this.techDropDown = !this.techDropDown;
    },
    showParticpantDropDown() {
      this.participantDropDown = !this.participantDropDown;
    },
    selectParticpantNum(selectedParticipantValue) {
      if (!selectedParticipantValue) {
        this.selectedParticpantNum = null;
      } else {
        this.selectedParticpantNum = Number(selectedParticipantValue);
      }
      this.participantDropDown = false;
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

.hide-arrow {
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
}

.editor-icon-style {
  @apply p-1 transition rounded-4px hover:text-white hover:bg-black1;
}
.editor-icon-size {
  width: 20px;
  height: 20px;
}
</style>
