<template>
  <div class="card">
    <img :src="image" :alt="title" loading="lazy" :title="title" />
  </div>
</template>

<script>
export default {
  name: "CardTile",
  props: {
    image: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  computed: {
    formattedDescription() {
      return this.description.length > 100
        ? this.description.substring(0, 100) + "..."
        : this.description;
    },
  },
};
</script>

<style scoped>
.card {
  height: 300px;
  width: 14rem;
  cursor: pointer;
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
}

.card img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.card:hover {
  filter: brightness(0.8);
}

@media (max-width: 768px) {
  .card {
    width: 100%;
  }
}
</style>