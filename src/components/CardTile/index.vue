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
  height: 200px;
  width: 130px !important;
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
</style>