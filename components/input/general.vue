<template>
  <input
    :value="value"
    @input="handleInput"
    v-on="listeners"
    :type="type"
    :placeholder="placeholder"
    class="w-full px-3 py-4 border rounded-4px focus:outline-none"
    :class="{
      'password-dot-bigger': type === `password` && value.length > 0,
    }"
    :style="inputSize"
  />
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
    },
    type: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
      default: () => 56,
    },
  },
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners;
      return listeners;
    },
    inputSize() {
      let size = {};
      if (this.width) {
        size["width"] = `${this.width}px`;
      }
      if (this.height) {
        size["height"] = `${this.height}px`;
      }
      return size;
    },
  },
  methods: {
    handleInput(event) {
      const eventTarget = event.target;
      this.$emit("input", eventTarget.value);
    },
  },
};
</script>

<style lang="postcss" scoped>
.password-dot-bigger {
  font-family: Verdana;
  letter-spacing: 0.125rem;
}
</style>
