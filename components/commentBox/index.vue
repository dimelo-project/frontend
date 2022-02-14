<template>
  <textarea
    ref="textarea"
    class="w-full overflow-hidden outline-none resize-none hide-scrollbar"
    :rows="rows"
    :placeholder="placeholder"
    :value="value"
    @input="onChangeComment"
  ></textarea>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rows: 1,
      userNewCommment: "",
    };
  },
  watch: {
    value() {
      if (!this.value) {
        this.rows = 0;
        this.$refs.textarea.style.height = "44px";
      }
    },
  },
  methods: {
    resize() {
      const $textarea = this.$refs.textarea;

      $textarea.style.height = "0px";
      $textarea.style.height = `${$textarea.scrollHeight}px`;
    },
    onChangeComment(event) {
      const rows = event.target.value.split("\n").length;

      this.rows = rows;
      this.userNewCommment = event.target.value;
      this.$emit("input", this.userNewCommment);
      this.resize();
    },
  },
};
</script>

<style lang="postcss" scoped>
.hide-scrollbar {
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
