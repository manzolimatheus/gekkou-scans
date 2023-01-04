<template>
  <div class="modal" v-show="showModalControl">
    <button @click="close"><ion-icon name="close-outline"></ion-icon></button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ModalOverlay",
  data() {
    return {
      showModalControl: false,
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true,
    },
  },
  methods: {
    close() {
      this.showModalControl = false;
      this.$emit("close");
    },
  },
  watch: {
    show: function (val) {
      this.showModalControl = val;
    },
  },
  mounted() {
    this.showModalControl = this.show;
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  padding: 2rem;
  backdrop-filter: blur(5px);
  z-index: 9999;
  text-align: center;
}

.modal button {
  height: fit-content;
  width: fit-content;
  background: none;
  font-size: 2rem;
  border: none;
}

.modal button ion-icon {
  font-size: 2rem;
  color: white !important;
}
</style>