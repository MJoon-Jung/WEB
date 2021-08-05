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
    updateMyInfo(state, user) {
      state.user = user;
      state.isUserLoggedIn = true;
    },
    checkCurrentLoggedIn(state, currentState) {
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
        .then(() => console.log("register: ", userInfo))
        .catch((err) => console.error(err));
    },
    login(context, user) {
      axios.post("/api/auth/login", user).then((res) => {
        localStorage.setItem("accessToken", res.data.token);
        context.commit("updateMyInfo", user);
        router.push("/");
      });
    },
    isCurrenUserState({ state, commit }) {
      if (localStorage.getItem("accessToken")) {
        const token = localStorage.getItem("accessToken");
        const { sub } = JwtDecode<JwtPayLoad>(token as string);
        client
          .get(`/api/users/${sub}`)
          .then(() => {
            console.log("LoggedIn");
            commit("checkCurrentLoggedIn", true);
          })
          .catch((err) => {
            console.error(err);
            router.push("/");
          });
      } else {
        commit("checkCurrentLoggedIn", false);
      }
    },
    autoLogin() {
      if (localStorage.getItem("accessToken")) {
        return true;
      }
    },
    logout() {
      localStorage.removeItem("accessToken");
    },
  },
  getters: {},
};
