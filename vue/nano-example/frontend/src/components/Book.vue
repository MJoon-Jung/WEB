<template>
    <div>
        <img :src="book.cover" style="width: 100px; height: auto;" />
        <p style="font-weight: bold;">{{ book.title }}</p>
        <p>{{ book.author }}</p>
    </div>
</template>
    
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
export default defineComponent ({
    props: {
        bookId: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const store = useStore();

        const book = computed(() => store.state.books.book);
        // const isLoading = computed(() => store.state.books.iaLoading);
        const updateBook = () => store.dispatch("books/getBookInfo", props.bookId);
        updateBook();

        return { book };
    },
})
</script>


