<template>
  <div :style="skeletonStyle" class="skeleton"></div>
</template>

<script>
export default {
  name: "SkeletonLoading",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    borderRadius: {
      type: String,
      default: "10px",
    },
  },
  computed: {
    skeletonStyle() {
      return {
        width: this.width,
        height: this.height,
        borderRadius: this.borderRadius,
      };
    },
  }
};
</script>

<style scoped>
.skeleton {
  background-color: #e0e0e0;
  animation: pulse 1s infinite alternate;
}

@keyframes pulse {
  0% {
    background-color: var(--primary-color);
  }
  100% {
    background-color: var(--third-color);
  }
}
</style>