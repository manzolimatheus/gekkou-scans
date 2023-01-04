import { createStore } from 'vuex';

export default createStore({
  state: {
    activeDarkMode: false,
    showDiscordMessage: true,
  },
  getters: {},
  mutations: {
    toggleDarkMode(state) {
      state.activeDarkMode = !state.activeDarkMode;
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', state.activeDarkMode);
    },
    disableDiscordMessage(state) {
      state.showDiscordMessage = false;
    }
  },
  actions: {
  },
  modules: {},
});

