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
    const currentUserLoggedin = () => store.dispatch("Users/isCurrenUserState");
    const isUserLoggedIn = computed(() => store.state.Users.isUserLoggedIn);
    console.log('hello', isUserLoggedIn);
    currentUserLoggedin();
    return { currentUserLoggedin }
  },
  updated(){
    this.currentUserLoggedin();
  }
});
</script>
