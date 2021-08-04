import { Module } from "vuex";
import { RootState } from "..";
import axios from "axios";

export interface AuthState {}

export const Auth: Module<AuthState, RootState> = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  getters: {},
};
