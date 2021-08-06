import { Module } from "vuex";
import { RootState } from "..";
import client from "@/api/client";
import axios from "axios";
import router from "@/router";

import JwtDecode, { JwtPayload } from "jwt-decode";
interface JwtPayLoad extends JwtPayload {
  sub: string;
}

export interface User {
  userid: string;
  name: string;
  password: string;
}

export interface UserState {
  user: User;
  isUserLoggedIn: boolean;
}

export const Users: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    user: {
      userid: "",
      name: "",
      password: "",
    },
    isUserLoggedIn: false,
  },
  mutations: {
    updateMyInfo(state, user: User) {
      state.user = user;
    },
    updateCurrentLoggedIn(state, currentState) {
      state.isUserLoggedIn = currentState;
    },
  },
  actions: {
    getMyInfo({ commit, state }) {
      client
        .get(`/users/${state.user.userid}`)
        .then((res) => {
          commit("updateMyInfo", res.data);
        })
        .catch((err) => console.error(err));
    },
    deleteMyInfo({ state }) {
      client
        .delete(`/users/${state.user.userid}`)
        .catch((err) => console.error(err));
    },
    register(context, userInfo) {
      console.log("register", userInfo);
      axios
        .post("/api/users", userInfo)
        .then(() => router.push("/"))
        .catch((err) => console.error(err));
    },
    login(context, user) {
      axios.post("/api/auth/login", user).then((res) => {
        localStorage.setItem("accessToken", res.data.token);
        context.commit("updateMyInfo", user);
        context.commit("updateCurrentLoggedIn", true);
        router.push("/");
      });
    },
    logout({ commit }) {
      localStorage.removeItem("accessToken");
      commit("updateMyInfo", { userid: "", name: "", password: "" });
      commit("updateCurrentLoggedIn", false);
    },
  },
  getters: {
    getIsUserLoggedIn(state, getters, rootState) {
      return state.isUserLoggedIn;
    },
    getUser(state, getters, rootState) {
      return state.user;
    },
  },
};
