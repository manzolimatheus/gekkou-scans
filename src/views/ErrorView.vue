<template>
  <div class="error">
    <h1>Oops!</h1>
    <img
      src="https://chpic.su/_data/stickers/c/ChainsawManPack/ChainsawManPack_009.webp"
      alt="Makima Pensando"
    />
    <p>Parece que o que você está buscando foi movido ou não existe!</p>
    <router-link to="/">Voltar para a página inicial</router-link>
  </div>
</template>

<script>
export default {
  name: "ErrorView",
};
</script>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 2rem;
  padding: 2rem;
}

.error h1 {
  font-size: 5rem;
  margin: 0;
}

.error img {
  width: 20rem;
  background: white;
}

.error p {
  font-size: 1.5rem;
  text-align: center;
}

.error a {
    text-decoration: none;
    background: var(--app-color);
    font-weight: bold;
    transition: 0.2s;
    padding: 1%;
}

</style>