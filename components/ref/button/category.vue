<template>
  <nuxt-link :to="refUrl">
    <button
      type="button"
      class="px-4 py-1 mt-1 ml-1 border border-gray-800 rounded-full hover:ring-2 hover:ring-blue-700 hover:bg-gray-100 hover:text-blue-700"
    >
      {{ refTopic }}
    </button>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    refUrl: String,
    refTopic: String,
  },
};
</script>
