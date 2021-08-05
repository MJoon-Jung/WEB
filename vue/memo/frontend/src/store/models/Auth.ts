import { Module } from "vuex";
import { RootState } from "..";
import client from "@/api/client";
import router from "@/router";

export interface AuthState {
  isUserLoggedIn: boolean;
}

export const Auth: Module<AuthState, RootState> = {
  namespaced: true,
  state: {
    isUserLoggedIn: false,
  },
  mutations: {},
  actions: {},
  getters: {},
};
