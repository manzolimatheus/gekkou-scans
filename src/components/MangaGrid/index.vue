<template>
  <div class="manga-grid">
    <ContentGrid :title="titleCount" :titleLink="`/category/${categoryId}`">
      <router-link
        :to="`/manga/${manga.id}`"
        v-for="manga in mangas"
        :key="manga.id"
      >
        <CardTile
          :image="BASE_URL + manga.attributes.imageCover.data.attributes.url"
          :title="manga.attributes.name"
        />
      </router-link>
    </ContentGrid>
    <button @click="getMore" v-show="mangas.length < totalRecords">Mostrar mais</button>
  </div>
</template>

<script>
import ContentGrid from "@/components/ContentGrid";
import CardTile from "@/components/CardTile";
import { BASE_URL } from "@/assets/js/constants";
import axios from "axios";

export default {
  name: "MangaGrid",
  components: {
    ContentGrid,
    CardTile,
  },
  props: {
    categoryId: {
      type: String,
      default: "0",
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      mangas: [],
      offset: 0,
      limit: 10,
      totalRecords: 0,
    };
  },
  methods: {
    async getMangas() {
      const URL = `${BASE_URL}/api/mangas?filters[category][id][$eq]=${this.categoryId}&pagination[start]=${this.offset}&pagination[limit]=${this.limit}&populate=*`;

      const response = await axios.get(URL);

      this.totalRecords = response.data.meta.pagination.total;

      this.mangas = response.data.data;

    },
    async getMore() {
      this.offset += this.limit;
      const URL = `${BASE_URL}/api/mangas?filters[category][id][$eq]=${this.categoryId}&pagination[start]=${this.offset}&pagination[limit]=${this.limit}&populate=*`;

      const response = await axios.get(URL);

      this.mangas = [...this.mangas, ...response.data.data];
    },
  },
  computed: {
    titleCount() {
      return `${this.title} (${this.mangas.length})`;
    },
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

.manga-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.manga-grid button {
  background: var(--app-color);
  padding: 10px 20px;
  border-radius: 10px;
}

</style>