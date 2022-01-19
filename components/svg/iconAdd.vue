<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5.25V18.75"
      :stroke="[dark ? 'white' : 'black']"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.75 12H5.25"
      :stroke="[dark ? 'white' : 'black']"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    dark: {
      type: Boolean,
    },
  },
});
</script>
