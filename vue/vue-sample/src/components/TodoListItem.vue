<template>
  <div>
    <div style="display:flex; justify-content: space-between;" class="py-3 px-5 mb-4 bg-blue-100 text-blue-900 text-sm rounded-md border border-blue-200" role="alert">
      {{ content }}
      <button class="uppercase p-3 flex items-center bg-yellow-500 text-blue-50 max-w-max shadow-sm hover:shadow-lg rounded-full w-12 h-12 ">
				<svg  width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" style="transform: rotate(360deg);"><path d="M26 18A10 10 0 1 1 16 8h6.182l-3.584 3.585L20 13l6-6l-6-6l-1.402 1.414L22.185 6H16a12 12 0 1 0 12 12z" fill="currentColor"></path></svg>
      </button>
      <button @click="removeTodo" class="uppercase p-3 flex items-center bg-red-500 text-blue-50 max-w-max shadow-sm hover:shadow-lg rounded-full w-12 h-12 ">
			<svg width="15" height="15" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" style="transform: rotate(360deg);"><path d="M12 12h2v12h-2z" fill="currentColor"></path><path d="M18 12h2v12h-2z" fill="currentColor"></path><path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z" fill="currentColor"></path><path d="M12 2h8v2h-8z" fill="currentColor"></path></svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Todo from '../types/todo';

export default defineComponent({
    props: {
      todo: {
        required: true,
        type: Object as PropType<Todo>
      }
    },
    data: function ():Todo {
      return {
        id: this.todo.id,
        content: this.todo.content,
      }
    },
    methods: {
      removeTodo() {
        this.$emit('removeTodo', this.id);
      }
    }
})
</script>

<style>

</style>