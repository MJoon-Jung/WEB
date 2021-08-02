import { Module } from "vuex";
import { RootState } from "..";

export interface userState {
  userId: string;
}

export const user: Module<userState, RootState> = {
  namespaced: true,
  state: {
    userId: "user",
  },
  mutations: {
    updateUserId(state, newId) {
      state.userId = newId;
    },
  },
};
