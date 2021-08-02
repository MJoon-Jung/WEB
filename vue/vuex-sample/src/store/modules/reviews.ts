import { Module } from "vuex";
import axios from "axios";
import { RootState } from "..";

export interface reviewsState {
  reviews: Array<string>;
}

export const reviews: Module<reviewsState, RootState> = {
  namespaced: true,
  state: {
    reviews: [],
  },
  mutations: {
    updateReviews(state, reviews) {
      state.reviews = reviews;
    },
  },
  actions: {
    getReviews({ commit }) {
      axios
        .get("/api/comments")
        .then((res) => {
          commit("updateReviews", res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  getters: {
    reviewCount(state) {
      return state.reviews.length;
    },
  },
};
