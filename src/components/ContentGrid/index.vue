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
.grid-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}
.grid-container h1 {
  text-align: center;
  margin: 2rem 0;
}

.grid-content {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>