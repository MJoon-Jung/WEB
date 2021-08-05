<template>
  <div>
    <showMemos />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import showMemos from './ShowMemos.vue';
export default defineComponent({
  components: {
    showMemos,
  }
});
</script>


