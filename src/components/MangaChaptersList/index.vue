<template>
  <div class="chapters-list" v-if="chapters.length">
    <header>
        <h3>Capítulos ({{chapters.length}})</h3>
    </header>
    <main>
      <ul>
        <li v-for="(chapter, index) in chapters" :key="chapter.id">
          <router-link :to="`/read/${chapter.id}`">
            #{{index + 1}} - {{chapter.attributes.title}}
          </router-link>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>

import {BASE_URL} from '@/assets/js/constants'
import axios from 'axios'
  
export default {
    name: 'MangaChaptersList',
    props: {
      mangaId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        chapters: []
      }
    },
    methods: {
      async getChapters() {
        const URL = `${BASE_URL}/api/manga-caps?filters[manga][id][$eq]=${this.mangaId}`

        const {data} = await axios.get(URL)

        this.chapters = data.data
      }
    },
    created(){
      this.getChapters()
    }
  }
</script>

<style scoped>

.chapters-list {
  margin-top: 4rem;
}

.chapters-list header {
  background: var(--app-color);
  padding: 2%;
}

.chapters-list ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
}

.chapters-list ul li:hover {
  background: var(--primary-color);
}
  
</style>