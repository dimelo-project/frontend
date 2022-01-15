<template>
  <input
    :value="value"
    @input="handleInput"
    type="text"
    class="w-full px-3 py-4 mt-8 border-2 rounded-base focus:outline-none"
    :class="{ 'border-black': value.length > 0 }"
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
    width: {
      type: Number,
    },
    height: {
      type: Number,
      default: () => 56,
    },
    placeholder: {
      type: String,
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
