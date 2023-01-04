<template>
  <div class="about" v-if="isLoaded">
    <article v-for="topic in topics" :key="topic.id">
      <h1>{{ topic.attributes.name }}</h1>
      <div v-html="markDownToHTML(topic.id)" class="content"></div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import { marked } from "marked";
import { BASE_URL } from "@/assets/js/constants";

export default {
  name: "AboutView",
  data() {
    return {
      topics: [],
      isLoaded: false,
    };
  },
  methods: {
    async getTopics() {
      const URL = BASE_URL + "/api/about-topics?populate=*";

      const data = await (await axios.get(URL)).data.data;
      this.isLoaded = true;
      this.topics = data;
    },
    markDownToHTML(id) {
      const topic = this.topics.filter((topic) => topic.id == id)[0];

      if (!topic) return;

      return marked.parse(topic.attributes.content);
    },
  },
  created() {
    this.getTopics();
  },
};
</script>

<style scoped>
.about {
  padding: 2%;
}

article {
  background: var(--primary-color);
  padding: 2%;
  border-radius: 10px;
  text-align: justify;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 1rem;
}

article h1 {
  text-align: center;
}

article img {
  height: 200px;
  object-fit: cover;
  width: fit-content;
  margin: 0 auto;
}

.content {
  text-align: justify;
}

.content p {
  color: red;
}
</style>