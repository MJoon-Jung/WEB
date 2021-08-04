import { Module } from "vuex";
import { RootState } from "..";
import axios from "axios";

export interface User {
  userid: string;
  name: string;
  password: string;
}

export interface UserState {
  user: User;
}

export const Users: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    user: {
      userid: "",
      name: "",
      password: "",
    },
  },
  mutations: {
    updateMyInfo(state, user) {
      state.user = user;
    },
  },
  actions: {
    getMyInfo({ commit, state }) {
      axios
        .get(`/users/${state.user.userid}`)
        .then((res) => {
          commit("updateMyInfo", res.data);
        })
        .catch((err) => console.error(err));
    },
    deleteMyInfo({ state }) {
      axios
        .delete(`/users/${state.user.userid}`)
        .catch((err) => console.error(err));
    },
    register({ state }) {
      axios
        .post("/users", state.user)
        .then(() => console.log("register: ", state.user))
        .catch((err) => console.error(err));
    },
    login({}) {},
    autoLogin() {},
  },
  getters: {},
};
