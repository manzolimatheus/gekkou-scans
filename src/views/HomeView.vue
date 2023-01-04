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
