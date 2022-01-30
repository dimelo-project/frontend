<template>
  <div
    v-on="$listeners"
    class="button_general"
    :class="[large ? 'w-full' : null, centerState]"
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
    disabled: {
      type: Boolean,
      default: () => false,
    },
    disabledColor: {
      type: String,
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
    // buttonState() {
    //   if (this.disabled) {
    //     return `pointer-events-none bg-${this.disabledColor}`;
    //   } else if (this.outline) {
    //     return `border border-${this.color} bg-white`;
    //   } else {
    //     return `bg-${this.color}`;
    //   }
    // },
    centerState() {
      return `flex justify-center items-center `;
    },
  },
};
</script>

<style lang="postcss" scoped>
.button_general {
  @apply transition duration-200 ease-in cursor-pointer select-none;
}
</style>
