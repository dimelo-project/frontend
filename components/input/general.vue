<template>
  <input
    :value="value"
    @input="handleInput"
    v-on="listeners"
    :type="type"
    :placeholder="placeholder"
    class="w-full px-3 py-4 mt-8 border-2 rounded-base focus:outline-none"
    :class="{
      'border-black': value.length > 0,
      'password-dot-bigger': type === `password` && value.length > 0,
    }"
    :style="`${height}px`"
  />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
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
  },
  methods: {
    handleInput(event: InputEvent) {
      const eventTarget = event.target as HTMLInputElement;
      this.$emit("input", eventTarget.value);
    },
  },
});
</script>

<style lang="postcss" scoped>
.password-dot-bigger {
  font-family: Verdana;
  letter-spacing: 0.125rem;
}
</style>
