<template>
  <div>
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

import axios from 'axios';
import { BASE_URL } from '@/assets/js/constants';
import MangaSlider from '@/components/MangaSlider';

export default {
    name: 'MangasView',
    components: {
        MangaSlider,
    },
    data() {
        return {
            categories: [],
        }
    },
    methods: {
    async getCategories() {
      const URL = BASE_URL + "/api/categories";

      const { data } = await axios.get(URL);

      this.categories = data.data;
    },
  },
    created() {
        this.getCategories();
    },
}
</script>

<style>

</style>