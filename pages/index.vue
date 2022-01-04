<template>
  <div class="root">
    <div class="test test1">
      {{ test1 }}
    </div>
    <div class="test test2">
      {{ test2 }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      test1: "TEAL",
      test2: "PERU",
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";

.root {
  display: flex;
}

.test {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vh;
  height: 20vh;
  &:hover {
    cursor: pointer;
    color: white;
    transition: 0.6s;
    transform: translate3d(5px, 5px, 0);
  }
}

.test1 {
  border: 2px dashed teal;
  &:hover {
    background-color: teal;
  }
}

.test2 {
  border: 2px dashed $testcolor;
  &:hover {
    background-color: $testcolor;
  }
}
</style>
