<template>
  <div id="app">
    <Menubar></Menubar>
    <ProductPage></ProductPage>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Menubar from './components/Menubar.vue';
import ProductPage from '/src/components/Productpage.vue';

export default defineComponent({
  components: {
    ProductPage,
    Menubar,
  },
  
})
</script>

<style>
@import './assets/css/styles.css'
</style>
