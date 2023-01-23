<template>
  <div class="home">
    <DiscordModalVue />
    <ImageCarousel :content="carouselData" />
    <MangaSlider
      v-for="category in categories"
      :key="category.id"
      :categoryId="category.id"
      :title="category.attributes.name"
      :titleLink="`/category/${category.id}`"
    />
    <section class="more-content-soon">
      <h1>Você chegou ao fim!</h1>
      <img src="http://i.imgur.com/MuUwwmT.png" alt="Princesa Mononoke">
      <h2>Por enquanto, é só isso que temos para mostrar.</h2>
      <h2>Mais conteúdo vindo em breve!! Fique atento! ✨</h2>
    </section>
  </div>
</template>

<script>
import ImageCarousel from "@/components/ImageCarousel";
import DiscordModalVue from "@/components/ModalOverlay/DiscordModal.vue";
import MangaSlider from "@/components/MangaSlider";
import { BASE_URL } from "@/assets/js/constants";
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      carouselData: [],
      categories: [],
    };
  },
  components: {
    DiscordModalVue,
    ImageCarousel,
    MangaSlider,
  },
  methods: {
    async getCarouselData() {
      const URL = BASE_URL + "/api/carousel-contents?populate=*";

      const { data } = await axios.get(URL);

      this.carouselData = data.data;
    },
    async getCategories() {
      const URL = BASE_URL + "/api/categories?filters[showInHome][$eq]=true";

      const { data } = await axios.get(URL);

      this.categories = data.data;
    },
  },
  created() {
    this.getCarouselData();
    this.getCategories();
  },
};
</script>

<style scoped>

.more-content-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  padding: 2rem;
}

.more-content-soon h1 {
  font-size: 2rem;
  font-weight: 600;
}

.more-content-soon h2 {
  font-size: 1.5rem;
  font-weight: 400;
  opacity: 0.8;
}

</style>