<template>
  <div id="app">
    <Menubar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import Menubar from './components/Menubar.vue';
export default defineComponent({
  components: {
    Menubar,
  },
  setup() {
    const store = useStore();
    const isUserLoggin = () => store.dispatch("Users/isCurrenUserState");
    isUserLoggin();
  }
});
</script>
