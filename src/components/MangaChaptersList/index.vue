<template>
  <div>
    <section class="chapters-list" v-if="chapters.length">
      <header>
        <h3>Capítulos ({{ totalRecords }})</h3>
        <button @click="getMore" v-show="chapters.length < totalRecords">
          Mostrar mais
        </button>
      </header>
      <main>
        <ul>
          <li v-for="(chapter, index) in chapters" :key="chapter.id">
            <router-link :to="`/read/${chapter.id}`">
              <span
                >#{{ totalRecords - index }} -
                {{ chapter.attributes.title }}</span
              >
              <span class="date">{{
                getLocaleDate(chapter.attributes.createdAt)
              }}</span>
            </router-link>
          </li>
        </ul>
      </main>
    </section>
    <section v-else>
      <h3 class="mt-2">Nenhum capítulo está disponibilizado para este mangá.</h3>
    </section>
  </div>
</template>

<script>
import { BASE_URL } from "@/assets/js/constants";
import axios from "axios";

export default {
  name: "MangaChaptersList",
  props: {
    mangaId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      chapters: [],
      offset: 0,
      limit: 100,
      totalRecords: 0,
      isLoaded: false,
    };
  },
  methods: {
    async getChapters() {
      const URL = `${BASE_URL}/api/manga-caps?filters[manga][id][$eq]=${this.mangaId}&pagination[start]=${this.offset}&pagination[limit]=${this.limit}&sort=createdAt:DESC`;
      const { data } = await axios.get(URL);

      this.totalRecords = data.meta.pagination.total;
      this.chapters = data.data;
      this.isLoaded = true;
    },
    async getMore() {
      this.offset += this.limit;
      const URL = `${BASE_URL}/api/manga-caps?filters[manga][id][$eq]=${this.mangaId}&pagination[start]=${this.offset}&pagination[limit]=${this.limit}&sort=createdAt:DESC`;
      const response = await axios.get(URL);

      this.chapters = [...this.chapters, ...response.data.data];
    },
    getLocaleDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  created() {
    this.getChapters();
  },
};
</script>

<style scoped>
.chapters-list {
  margin-top: 4rem;
  border: 2px solid var(--app-color);
}

.chapters-list header {
  background: var(--app-color);
  padding: 2%;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.chapters-list ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  max-height: 300px;
  background: var(--primary-color);
  overflow-y: auto;
}

.chapters-list ul li {
  background: var(--secondary-color);
  border: 2px solid var(--primary-color);
  padding: 2%;
  display: flex;
}

.chapters-list ul li a {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.chapters-list ul li a .date {
  background: var(--primary-color);
  padding: 1% 2%;
  border-radius: 10px;
}

.chapters-list ul li:hover {
  background: var(--primary-color);
}

.chapters-list button {
  background: var(--app-color);
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
}
</style>