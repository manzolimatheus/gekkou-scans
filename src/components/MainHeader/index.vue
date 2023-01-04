<template>
  <header>
    <router-link to="/">
      <img
        :src="logoURL"
        alt="Logo Gekkou Scans"
        :class="checkThemeLogo"
      />
    </router-link>
    <nav :class="checkThemeNavItems">
      <ul>
        <li>
          <router-link to="/">Início</router-link>
        </li>
        <li>
          <router-link to="/about">Avisos</router-link>
        </li>
        <li @click="$store.commit('toggleDarkMode')">
          <span>{{ $store.state.activeDarkMode ? "🌙" : "🌞" }}</span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>

import axios from "axios";
import { BASE_URL } from "@/assets/js/constants";

export default {
  name: "MainHeader",
  data() {
    return {
      logoURL: "",
    };
  },
  methods: {
    async getLogo() {
      const {data} = await axios.get(BASE_URL + "/api/logo-image?populate=*")

      this.logoURL = BASE_URL + data.data.attributes.image.data.attributes.url

    },
  },
  computed: {
    checkThemeLogo() {
      return this.$store.state.activeDarkMode ? "" : "logo-invert";
    },
    checkThemeNavItems() {
      return this.$store.state.activeDarkMode ? "nav-items-light" : "";
    },
  },
  created() {
    this.getLogo()
  }
};
</script>

<style scoped>
header {
  background: var(--secondary-color);
  display: flex;
  align-items: center;
  padding: 1%;
  gap: 2%;
}

header img {
  width: 100px;
  object-fit: contain;
  aspect-ratio: 16/9;
}

header ul {
  display: flex;
  gap: 1rem;
  list-style: none;
}

header ul li a {
  color: black;
}

header ul li span {
  cursor: pointer;
}

.logo-invert {
  filter: invert(1);
}

.nav-items-light ul li a {
  color: white;
}
</style>