import { Module } from "vuex";
import { RootState } from "..";
import axios from "axios";
import { User } from "./Users";
import { Memo } from "./Memos";

export interface AdminState {
  users: Array<User>;
  user: User;
  memos: Array<Memo>;
}

export const Admin: Module<AdminState, RootState> = {
  namespaced: true,
  state: {
    users: [],
    user: {} as User,
    memos: [],
  },
  mutations: {
    updateUsers(state, users) {
      state.users = users;
    },
    updateUser(state, user) {
      state.user = user;
    },
    updateMemos(state, memos) {
      state.memos = memos;
    },
  },
  actions: {
    getUsers({ commit }) {
      axios
        .get("/admin/users")
        .then((res) => {
          commit("updateUsers", res.data);
        })
        .catch((err) => console.error(err));
    },
    getUser({ commit }, userid) {
      axios
        .get(`/admin/users/${userid}`)
        .then((res) => {
          commit("updateUser", res.data);
        })
        .catch((err) => console.error(err));
    },
    deleteUser(userid) {
      axios
        .delete(`/admin/users/${userid}`)
        .then(() => {
          console.log(`${userid} is deleted`);
        })
        .catch((err) => console.error(err));
    },
    getMemos({ commit }) {
      axios
        .get("/admin/memos")
        .then((res) => {
          commit("updateMemos", res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  getters: {},
};
