import { Module } from "vuex";
import axios from "axios";
import { RootState } from "..";

export interface Book {
  bookId: string;
  title: string;
  subtitle?: string;
  author: string;
  cover: string;
  price?: number;
  publisher?: string;
  page?: number;
  ISBN?: string;
  info?: string;
}

export interface BookState {
  books: Array<Book>;
  book: Book;
  getBookInfoIsLoading: boolean;
  getBookInfoIsSuccessed: boolean;
  getBookInfoIsFailed: boolean;
}

export const books: Module<BookState, RootState> = {
  namespaced: true,
  state: {
    books: [],
    book: {} as Book,
    getBookInfoIsLoading: false,
    getBookInfoIsSuccessed: false,
    getBookInfoIsFailed: false,
  },
  mutations: {
    updateBooks(state, books) {
      state.books = books;
    },
    updateBook(state, book) {
      state.book = book;
    },
  },
  actions: {
    getBooksInfo({ commit }) {
      axios
        .get("/api/books")
        .then((res) => {
          commit("updateBooks", res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getBookInfo({ commit }, bookId: string) {
      commit("loading", true);
      axios
        .get(`/api/books/${bookId}`)
        .then((res) => {
          commit("updateBook", res.data);
          commit("loading", false);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
