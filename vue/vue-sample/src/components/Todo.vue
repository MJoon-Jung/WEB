<template>
    <div class="relative py-3 w-11/12 max-w-xl sm:mx-auto">
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
        My Todo App
        </h2>
        <BaseInputText @addTodo="addTodo"></BaseInputText>
        <ul>
            <TodoListItem @removeTodo="removeTodo" v-for="todo in todos" :key="todo.id" :todo="todo"></TodoListItem>
        </ul>
    </div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseInputText from './BaseInputText.vue';
import TodoListItem from './TodoListItem.vue';
import todo from '../types/todo'

export default defineComponent({
    components: {
        BaseInputText,
        TodoListItem,
    },
    data: function() {
        return {
            todos: [] as todo[],
        };
    },
    methods: {
        addTodo(id: number, todoContent: string) {
            this.todos.push({ id, content: todoContent });
            console.log(this.todos);
        },
        removeTodo(id: number) {
            this.todos = this.todos.filter((todo) => todo.id !== id);
        },
    }
})
</script>