<template>
  <div v-if="category">
    <img :src="BASE_URL + category.attributes.image.data.attributes.formats.medium.url" :alt="category.attributes.name" class="banner"/>
    <MangaGrid :key="category.id" :categoryId="id" :title="category.attributes.name" />
  </div>
</template>

<script>
import MangaGrid from "@/components/MangaGrid";
import { BASE_URL } from "@/assets/js/constants"
import axios from 'axios'

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
    async getCategory() {
      const URL = `${BASE_URL}/api/categories?filters[id][$eq]=${this.id}&populate=*`;
      const category = await axios.get(URL);

      this.category = category.data.data[0];
      console.log(this.category);
    },
  },
  computed: {
    BASE_URL() {
      return BASE_URL
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