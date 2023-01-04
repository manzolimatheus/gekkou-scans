<template>
  <footer>
    <p>GekkouScans &copy; {{ currentYear }}</p>
  </footer>
</template>

<script>
export default {
    name: 'MainFooter',
    computed: {
        currentYear(){
            return new Date().getFullYear();
        }
    }
}
</script>

<style scoped>

footer {
    background: var(--primary-color);
    text-align: center;
    margin-top: 4rem;
    padding: 2%;
}

</style>