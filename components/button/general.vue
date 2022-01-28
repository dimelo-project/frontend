<template>
  <div
    v-on="$listeners"
    type="button"
    class="button"
    :class="[
      center ? centerState : null,
      outline ? outlineState : normalState,
      large ? 'w-full' : null,
    ]"
    :style="sizeObject"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    color: {
      type: String,
    },
    large: {
      type: Boolean,
      default: () => false,
    },
    outline: {
      type: Boolean,
      default: () => false,
    },
    center: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      sizeObject: {
        width: `${this.width}px`,
        height: `${this.height}px`,
      },
    };
  },
  computed: {
    normalState() {
      return `bg-${this.color}`;
    },
    outlineState() {
      return `border border-${this.color} bg-white`;
    },
    centerState() {
      return `flex justify-center item-center`;
    },
  },
};
</script>

<style lang="postcss" scoped>
.button {
  @apply transition duration-200 ease-in cursor-pointer select-none;
}
</style>
