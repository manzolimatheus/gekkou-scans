<template>
 <div>
  <MainHeader/>
  <div class="view">
    <router-view/>
  </div>
  <MainFooter/>
 </div>
</template>

<script>

import {loadLocalStorageTheme} from '@/utils/theme'
import MainHeader from '@/components/MainHeader'
import MainFooter from '@/components/MainFooter'

export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter
  },
  created() {
    this.$store.state.activeDarkMode = loadLocalStorageTheme()
  }
}
</script>

<style>
@import url('@/assets/css/app.css');

.view {
  min-height: 100vh;
  background: var(--secondary-color);
}

</style>