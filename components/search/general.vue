<template>
  <div
    class="block border border-gray2 txt-sub lg:flex lg:items-center lg:justify-between"
    :class="[borderRadius, searchboxColor, placeholderColor]"
  >
    <svgSearchOutline
      v-if="label === 'left'"
      :width="20"
      :height="20"
      :class="`mr-${labelGap}`"
    />
    <input
      :value="value"
      @input="handleInput"
      v-on="listeners"
      type="text"
      name="search"
      :placeholder="placeholder"
      class="w-full bg-transparent border-none outline-none"
      :class="[placeholderColor]"
      :style="{ width: `${width}px` }"
    />
    <svgSearchOutline
      v-if="label === 'right'"
      :width="20"
      :height="20"
      :class="`ml-${labelGap}`"
    />
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
    searchboxColor: {
      type: String,
    },
    borderRadius: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    placeholderColor: {
      type: String,
    },
    width: {
      type: Number,
    },
    label: {
      type: String,
      default: () => "right",
    },
    labelGap: {
      type: String,
      default: () => 0,
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
