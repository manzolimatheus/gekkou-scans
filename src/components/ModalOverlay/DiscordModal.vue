<template>
  <ModalOverlay
    :show="$store.state.showDiscordMessage"
    @close="$store.commit('disableDiscordMessage')"
  >
    <a href="https://discord.gg/u7vsEQ8" target="_blank">
      <img
        src="https://gekkou.com.br/p/discord.png"
        alt="Entre em nosso Discord"
      />
      <button>Vamos lá!</button>
    </a>
    <button @click="disableModalForever">Não exibir novamente</button>
  </ModalOverlay>
</template>

<script>
import ModalOverlay from "@/components/ModalOverlay/index.vue";

export default {
  name: "DiscordModal",
  components: {
    ModalOverlay,
  },
  methods: {
    disableModalForever() {
      localStorage.setItem("discordModalDisabled", true);
      this.$store.commit("disableDiscordMessage");
    },
  },
  created() {
    if (localStorage.getItem("discordModalDisabled")) {
      this.$store.commit("disableDiscordMessage");
    }
  },
};
</script>

<style scoped>
button {
  background: none;
  border: none;
  margin-top: 4%;
  cursor: pointer;
  color: white;
}

a button {
  background: #7289da;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14pt;
  font-weight: 600;
  width: 100%;
  margin-top: 10px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

a button:hover {
  background: #5f73c1;
}
</style>