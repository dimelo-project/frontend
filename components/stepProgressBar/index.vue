<template>
  <div>
    <div class="container">
      <div
        class="relative flex items-center justify-between"
        style="width: 276px"
      >
        <div
          class="absolute left-0 bg-gray3 ml-6px"
          style="height: 2px; width: 264px"
        ></div>
        <div
          class="absolute left-0 z-10 transition-colors bg-yellow1 ml-6px"
          style="height: 2px"
          :style="{ width: `${$store.state.progressWidth}px` }"
        ></div>
        <div
          v-for="i in 5"
          :key="i"
          style="width: 12px; height: 12px"
          class="z-10 transition-colors rounded-full"
          :class="[
            i - 1 <= $store.state.currentStep ? 'bg-yellow1' : 'bg-gray3',
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>
