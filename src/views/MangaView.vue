<template>
  <div class="manga-view">
    <section class="loaded-data" v-if="isLoaded">
      <div class="banner">
        <img
          :src="BASE_URL + manga.attributes.imageBanner.data.attributes.url"
          alt="banner"
        />
      </div>
      <div class="data">
        <section class="cover">
          <img
            v-if="manga.attributes.imageCover.data.attributes.url"
            :src="BASE_URL + manga.attributes.imageCover.data.attributes.url"
            alt="cover"
          />
        </section>
        <section class="info">
          <h1>
            <span>{{ manga.attributes.name }}</span>
          </h1>
          <br />
          <p>{{ manga.attributes.description }}</p>
          <section class="info-details">
            <div>
              <router-link :to="`/category/${category.id}`" class="category">
                <ion-icon name="bookmarks-outline"></ion-icon>
                <h3>Categoria</h3>
                <p>{{ category.attributes.name }}</p>
              </router-link>
            </div>
            <div class="createdYear">
              <ion-icon name="calendar-number-outline"></ion-icon>
              <h3>Lançamento</h3>
              <p>{{ manga.attributes.createdDate }}</p>
            </div>
            <div class="views">
              <ion-icon name="eye-outline"></ion-icon>
              <h3>Visualizações</h3>
              <p>{{ manga.attributes.views.toLocaleString() }}</p>
            </div>
            <div class="stars">
              <ion-icon name="star-outline"></ion-icon>
              <h3>Avaliações</h3>
              <p>{{ manga.attributes.stars }}/5</p>
            </div>
          </section>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { BASE_URL } from "@/assets/js/constants";
import axios from "axios";

export default {
  name: "MangaView",
  data() {
    return {
      manga: null,
      category: null,
      isLoaded: false,
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  methods: {
    async getManga() {
      const URL = `${BASE_URL}/api/mangas?filters[id][$eq]=${this.id}&populate=*`;

      const manga = await axios.get(URL);
      if (manga.data.data.length < 1) {
        this.$router.push({ name: "not-found" });
        return;
      }

      this.manga = manga.data.data[0];
      this.getCategory(this.manga.attributes.category.data.id);
      this.incrementViews();
      this.isLoaded = true;
    },
    async getCategory(categoryId) {
      const URL = `${BASE_URL}/api/categories?filters[id][$eq]=${categoryId}`;
      const category = await axios.get(URL);

      this.category = category.data.data[0];
      console.log(this.category);
    },
    async incrementViews() {
      this.manga.attributes.views++;

      const URL = `${BASE_URL}/api/mangas/${this.id}`;
      console.log(this.manga);
      this.manga = await axios.put(URL, {
        data: {
          views: this.manga.attributes.views,
        },
      });
    },
  },
  computed: {
    BASE_URL() {
      return BASE_URL;
    },
  },
  mounted() {
    this.getManga();
  },
};
</script>

<style scoped>
.banner img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.data {
  display: grid;
  grid-template-columns: 20% 80%;
  padding: 2%;
}

.data .cover {
  height: 300px;
  width: 200px;
  margin: 0 auto;
  text-align: center;
}

.data .cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.data > .info {
  padding: 0 1rem;
}

.data > .info > h1 {
  font-size: 2rem;
  font-weight: 600;
}

.info-details div {
  width: 200px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
  background: var(--primary-color);
  padding: 1rem;
}

.info-details div:hover {
  background: var(--secondary-color);
  border: 1px solid var(--primary-color);
}

.info-details {
  display: flex;
  align-items: center;
  gap: 2rem;
  text-align: center;
  margin-top: 1rem;
}

.info-details ion-icon {
  font-size: 2rem;
  color: var(--primary-color-text);
}

@media (max-width: 768px) {
  .data {
    grid-template-columns: 100%;
  }

  .info h1 {
    text-align: center;
    margin: 1rem 0;
  }

  .info > p {
    text-align: justify;
    margin-bottom: 2rem;
  }

  .info-details {
    overflow-x: scroll;
  }
}
</style>