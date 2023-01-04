<template>
  <div v-if="category">
    <img :src="category.image" :alt="category.name" class="banner"/>
    <MangaGrid :key="category.id" :categoryId="id" :title="category.name" />
  </div>
</template>

<script>
import MangaGrid from "@/components/MangaGrid";
import { categories } from "@/assets/js/mockData";

export default {
  name: "CategoryView",
  data(){
    return {
      category: null,
    }
  },
  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
  },
  components: {
    MangaGrid,
  },
  methods: {
    getCategory() {
      const category = categories.filter((category) => category.id == this.id)

      if (!category) {
        this.$router.push({ name: "not-found" });
        return
      }

      this.category = category[0]
    }
  },
  created() {
    this.getCategory()
  }
};
</script>

<style scoped>

.banner {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

</style>