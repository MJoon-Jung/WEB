<template>
    <div class="relative p-8 bg-white shadow-sm sm:rounded-xl">
        <div class="mb-5 relative">
            <input type="text" v-model="content" @keyup.enter="addTodo" id="todo" class="peer pt-8 border border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="name@example.com" autocomplete="off" />
            <label for="todo" class="peer-placeholder-shown:opacity-100   opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out">Todo</label>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Todo from '../types/todo';
export default defineComponent ({
    data: function():Todo {
        return {
            id: 1,
            content: '',
        };
    },
    methods: {
        addTodo() {
            if(this.content === '') return;
            this.$emit('addTodo', String(this.id), this.content);
            this.id++;
            this.content = '';
        }
    },
})
</script>

<style>

</style>