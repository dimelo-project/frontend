<template>
  <div class="flex txt-sub">
    <button class="btn" style="width: 54px">이전</button>

    <button class="btn" v-for="i in 10" :key="i">
      <div
        v-if="i < 99"
        style="width: 36px"
        class="flex items-center justify-center h-full"
        :class="{ 'bg-yellow1': i === pageIdx + 1 }"
        @click="handleClick(i)"
      >
        <span>{{ i }}</span>
      </div>
      <div
        v-else
        :style="`width: ${36 + (i.toString().length - 2) * 2}px`"
        class="flex items-center justify-center h-full"
        :class="{ 'bg-yellow1': i === pageIdx }"
        @click="handleClick(i)"
      >
        <span>{{ i }}</span>
      </div>
    </button>

    <button class="btn" style="width: 54px">다음</button>
  </div>
</template>

<script>
export default {
  props: {
    pageIdx: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handleClick(i) {
      this.$emit("click", i - 1);
    },
  },
};
</script>

<style lang="postcss" scoped>
.btn {
  @apply border border-gray2 rounded-4px mx-8px;
  height: 38px;
}
</style>
