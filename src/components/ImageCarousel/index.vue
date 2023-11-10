<template>
  <div class="carousel" v-if="content" :style="customBackground">
    <button @click="prev">
      <ion-icon name="arrow-back-outline"></ion-icon>
    </button>
    <div class="carousel-content">
      <router-link :to="content[index].attributes.link">
        <img
          :src="currentImage"
          :alt="content[index].title"
          loading="lazy"
        />
      </router-link>
      <ul>
        <li
          v-for="i in content.length"
          :key="i"
          :class="index + 1 == i ? 'active' : ''"
        ></li>
      </ul>
    </div>
    <button @click="next">
      <ion-icon name="arrow-forward-outline"></ion-icon>
    </button>
  </div>
</template>

<script>
import { BASE_URL } from "@/assets/js/constants";

export default {
  name: "ImageCarousel",
  data() {
    return {
      index: 0,
      interval: null,
    };
  },
  props: {
    content: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    restartCarousel() {
      clearInterval(this.interval);
      this.runCarousel();
    },
    next() {
      this.restartCarousel();
      this.index++;
      if (this.index >= this.content.length) {
        this.index = 0;
      }
    },
    prev() {
      this.restartCarousel();
      this.index--;
      if (this.index < 0) {
        this.index = this.content.length - 1;
      }
    },
    runCarousel() {
      this.interval = setInterval(() => {
        this.next();
      }, 5000);
    },
  },
  computed: {
    isMobile() {
      return window.innerWidth < 768;
    },
    customBackground() {
      return {
        background: this.content[this.index].attributes.color ?? 'black',
      };
    },
    currentImage() {
      return this.isMobile
        ? BASE_URL + this.content[this.index].attributes.imageMobile.data.attributes.url
        : BASE_URL + this.content[this.index].attributes.imageDesktop.data.attributes.url;
    },
  },
  mounted() {
    this.runCarousel();
  },
};
</script>

<style scoped>
.carousel {
  display: grid;
  grid-template-columns: 10% 80% 10%;
  height: 400px;
  align-items: center;
}

.carousel button {
  background: var(--secondary-color);
  border: none;
  height: 50px;
  width: 90%;
  clip-path: circle();
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.carousel button:hover {
  background: var(--app-color);
}

.carousel-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.carousel-content img {
  height: 300px;
  object-fit: contain;
}

.carousel-content ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.carousel-content ul li {
  width: 10px;
  height: 10px;
  background: var(--primary-color);
  border-radius: 50%;
  margin-top: 1rem;
}

.carousel-content ul li.active {
  background: white;
}
</style>