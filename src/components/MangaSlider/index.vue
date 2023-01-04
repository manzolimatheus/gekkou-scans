<template>
  <ContentSlider :title="title" v-if="mangas.length > 0" id="slider">
    <router-link
      :to="`/manga/${manga.id}`"
      v-for="manga in mangas"
      :key="manga.id"
    >
      <CardTile
        class="manga"
        :image="BASE_URL + manga.attributes.imageCover.data.attributes.url"
        :title="manga.attributes.name"
      />
    </router-link>
  </ContentSlider>
</template>

<script>
import ContentSlider from "@/components/ContentSlider";
import CardTile from "@/components/CardTile";
import { BASE_URL } from "@/assets/js/constants";
import axios from "axios";

export default {
  name: "MangaSlider",
  components: {
    ContentSlider,
    CardTile,
  },
  props: {
    categoryId: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      mangas: [],
      limit: 10,
    };
  },
  methods: {
    async getMangas() {
      const URL = `${BASE_URL}/api/mangas?filters[category][id][$eq]=${this.categoryId}&pagination[limit]=${this.limit}&populate=*`;

      const response = await axios.get(URL);

      this.totalRecords = response.data.meta.pagination.total;

      this.mangas = response.data.data;
    },
  },
  computed: {
    BASE_URL() {
      return BASE_URL;
    },
  },
  created() {
    this.getMangas();
  },
};
</script>

<style scoped>
.manga {
  width: 14rem;
}
</style>