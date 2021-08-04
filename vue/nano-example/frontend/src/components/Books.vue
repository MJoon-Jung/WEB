<template>
    <div>
        <ul>
            <li v-for="book in books" :key="book.id" style="float: left; width: 100px; height: 300px; margin: 10px; border: 1px solid black; cursor: pointer;">
                <router-link :to="{ name: 'book', params: { bookId: book.bookId } }">
                    <img :src="book.cover" style="width: 100px; height: auto;" />
                    <p style="font-weight: bold;">{{ book.title }}</p>
                    <p>{{ book.author }}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>
    
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex'; 
export default defineComponent ({
    setup() {
        const store = useStore();
        const books = computed(() => store.state.books.books);

        const updateBooks = () => store.dispatch("books/getBooksInfo");

        updateBooks();

        return { books };
    },

})
</script>


