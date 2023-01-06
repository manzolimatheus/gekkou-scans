<template>
  <div class="slider-container">
    <h1 v-if="!titleLink">{{ title }}</h1>
    <h1 v-else>
      <router-link :to="titleLink">
        {{ title }}
      </router-link>
    </h1>
    <div class="slider">
      <button @click="scrollBack">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </button>
      <div class="slider-content" ref="sliderContainer">
        <slot></slot>
      </div>
      <button @click="scrollNext">
        <ion-icon name="arrow-forward-outline"></ion-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentSlider",
  props: {
    title: {
      type: String,
      default: "",
    },
    titleLink: {
      type: String,
      default: ""
    }
  },
  methods: {
    scrollNext() {
      this.$refs.sliderContainer.scrollLeft += 200;
    },
    scrollBack() {
      this.$refs.sliderContainer.scrollLeft -= 200;
    },
  },
};
</script>


<style scoped>
.slider-container h1 {
  text-align: center;
  margin: 2rem 0;
}

.slider {
  display: grid;
  grid-template-columns: 10% 80% 10%;
  height: fit-content;
  align-items: center;
  width: 100%;
}

.slider button {
  background: var(--primary-color);
  border: none;
  height: 50px;
  width: 90%;
  clip-path: circle();
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  cursor: pointer;
}

.slider button:hover {
  background: var(--app-color);
}

.slider-content {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  scroll-behavior: smooth;
  overflow-y: hidden;
}

.slider-content::-webkit-scrollbar {
  display: none;
}

@media (max-width: 768px) {
  .slider {
    grid-template-columns: 100%;
    padding: 1rem;
  }

  .slider button {
    display: none;
  }
}
</style>