<template>
  <div class="read">
    <button @click="toggleOrientation">Alterar Orientação</button>
    <h1>{{pages.attributes.title}}</h1>
    <div v-show="orientation == 'horizontal'">
      <p class="only-pc"><strong>ATENÇÃO!</strong> Para o modo horizontal, use <kbd>Shift</kbd> + scroll para mover horizontalmente.</p>
      <p class="only-mobile">Deslize para ver mais >></p>
    </div>
    <br>
    <div class="images" :style="flex">
      <img loading="lazy" v-for="image in pages.attributes.chapters.data" :key="image.id" :src="BASE_URL + image.attributes.url"/>
    </div>
  </div>
</template>

<script>

import {BASE_URL} from '@/assets/js/constants'
import axios from 'axios'
  
export default {
  name: 'ReadView',
  props: {
    chapterId: {
      type: String,
      required: true,
    }
  },
  data(){
    return {
      pages: [],
      orientation: 'vertical',
      currentIndex: 0,
    }
  },
  methods: {
    async getPages() {
      const URL = `${BASE_URL}/api/manga-caps?filters[id][$eq]=${this.chapterId}&populate=*`

      const {data} = await axios.get(URL)

      this.pages = data.data[0]
    },
    toggleOrientation() {
      if (this.orientation == 'vertical') {
        this.orientation = 'horizontal'
        return
      }

      this.orientation = 'vertical'
    }
  },
  computed: {
    BASE_URL() {
      return BASE_URL
    },
    flex() {
      return {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "start",
        flexDirection: this.orientation == 'vertical' ? 'column' : 'row',
        gap: "1rem"
      }
    }
  },
  created() {
    this.getPages()
  }
}

</script>

<style scoped>

  .read {
    text-align: center;
  }

  .read button {
    background: var(--app-color);
    padding: 1rem 2rem;
    border-radius: 10px;
    margin-bottom: 2rem;
    border: none;
  }

  .images {
    width: 60%;
    margin: 0 auto;
    overflow-x: scroll;
    background: var(--primary-color);
  }

  .read img {
    width: 100%;
  }

  .only-mobile {
    display: none;
  }

  @media(max-width: 768px) {
    .images {
      width: 100%;
    }

    .only-pc {
      display: none;
    }

    .only-mobile {
      display: block;
    }
  }
</style>