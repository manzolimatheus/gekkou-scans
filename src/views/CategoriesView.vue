<template>
  <div class="categories-view">
    <ContentGrid title="Carregando..." v-if="!isLoaded">
      <SkeletonLoading width="300px" height="200px" v-for="i in 10" :key="i" />
    </ContentGrid>
    <ContentGrid title="Categorias" v-if="isLoaded">
      <router-link
        v-for="category in categories"
        :key="category.id"
        :to="`/category/${category.id}`"
      >
        <div
          :style="
            generateBackgroundStyle(
              category.attributes.image.data.attributes.url
            )
          "
          class="category-image"
        >
          <h3>{{ category.attributes.name }}</h3>
        </div>
      </router-link>
    </ContentGrid>
    <button @click="getMore" v-show="categories.length < totalRecords">
        Mostrar mais
      </button>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "@/assets/js/constants";
import ContentGrid from "@/components/ContentGrid";
import SkeletonLoading from "@/components/SkeletonLoading";

export default {
  name: "CategoriesView",
  components: {
    ContentGrid,
    SkeletonLoading,
  },
  data() {
    return {
      categories: [],
      offset: 0,
      limit: 10,
      totalRecords: 0,
      isLoaded: false,
    };
  },
  methods: {
    async getCategories() {
      const URL = `${BASE_URL}/api/categories?pagination[start]=${this.offset}&pagination[limit]=${this.limit}&populate=*`;

      const { data } = await axios.get(URL);

      this.categories = data.data;
      this.totalRecords = data.meta.pagination.total;
      this.isLoaded = true;
    },
    generateBackgroundStyle(image) {
      return {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                url(${BASE_URL}${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };
    },
    async getMore() {
      this.offset += this.limit;
      const URL = `${BASE_URL}/api/categories?pagination[start]=${this.offset}&pagination[limit]=${this.limit}&populate=*`;

      const response = await axios.get(URL);

      this.categories = [...this.categories, ...response.data.data];
    },
  },
  computed: {
    BASE_URL() {
      return BASE_URL;
    },
  },
  created() {
      this.getCategories();
  },
};
</script>

<style scoped>
.category-image {
  height: 200px;
  width: 300px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.categories-view {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.categories-view button {
  background: var(--app-color);
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  width: fit-content;
  margin: 0 auto;
}
</style>