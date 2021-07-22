<template>
  <div id="app">
    <Todo></Todo>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Todo from './components/Todo.vue';

export default defineComponent({
  components: {
    Todo,
  },
})
</script>

<style>
@import './assets/css/styles.css'
</style>
