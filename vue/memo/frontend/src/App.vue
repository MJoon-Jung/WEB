<template>
  <div id="app">
    <Menubar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menubar from './components/Menubar.vue';
export default defineComponent({
  components: {
    Menubar,
  },
});
</script>
