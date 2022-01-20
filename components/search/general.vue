<template>
  <div
    class="block border rounded-4px border-gray2 txt-sub py-6px px-8px bg-gray4 lg:flex lg:items-center lg:justify-between"
  >
    <input
      :value="value"
      @input="handleInput"
      v-on="listeners"
      type="text"
      name="serch"
      :placeholder="placeholder"
      class="placeholder-black bg-transparent border-none outline-none placeholder-gray1"
      :style="{ width: `${width}px` }"
    />
    <svgSearchOutline :width="20" :height="20" />
  </div>
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
    width: {
      type: Number,
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

<style lang="postcss" scoped></style>
