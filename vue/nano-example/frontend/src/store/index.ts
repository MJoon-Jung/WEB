import { createStore } from "vuex";
import { BookState, books } from "./module/books";
export interface RootState {
  books: BookState;
}

export default createStore({
  modules: {
    books,
  },
});
