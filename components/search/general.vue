<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    // value: {
    //   type: String,
    //   required: true,
    // },
    // searchboxColor: {
    //   type: String,
    // },
    // borderRadius: {
    //   type: String,
    // },
    // placeholder: {
    //   type: String,
    // },
    // placeholderColor: {
    //   type: String,
    // },
    // width: {
    //   type: Number,
    // },
    // label: {
    //   type: String,
    //   default: () => "right",
    // },
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
