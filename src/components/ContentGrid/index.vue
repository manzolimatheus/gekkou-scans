<template>
  <div class="grid-container">
    <h1 v-if="!titleLink">{{ title }}</h1>
    <h1 v-else>
      <router-link :to="titleLink">
        {{ title }}
      </router-link>
    </h1>
    <div class="grid-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentGrid",
  props: {
    title: {
      type: String,
      default: "",
    },
    titleLink: {
      type: String,
      default: "",
    },
  },
};
</script>


<style scoped>
.grid-container h1 {
  text-align: center;
  margin: 2rem 0;
}

.grid-content {
  display: grid;
  justify-content: center;
  gap: 1rem;
  padding: 0 2rem;
  grid-template-columns: repeat(5, 1fr);
}

@media (max-width: 768px) {
  .grid-content {
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem;
  }
}
</style>