import { Module } from "vuex";
import { RootState } from "..";
import client from "@/api/client";

export interface Memo {
  title: string;
  content: string;
  file: File;
  originalFileName: string;
}

export interface MemoState {
  memos: Array<Memo>;
  memo: Memo;
}

export const Memos: Module<MemoState, RootState> = {
  namespaced: true,
  state: {
    memos: [],
    memo: {} as Memo,
  },
  mutations: {},
  actions: {
    getMemos({ commit }) {
      client
        .get("/memos")
        .then((res) => {
          commit("updateMemos", res.data);
        })
        .catch((err) => console.error(err));
    },
    getMemo({ commit }, memoid) {
      client
        .get(`/memos/${memoid}`)
        .then((res) => {
          commit("updateMemo", res.data);
        })
        .catch((err) => console.error(err));
    },
    addMemo(formData) {
      client
        .post("/memos", formData)
        .then(() => console.log("addMemo success"))
        .catch((err) => console.error(err));
    },
    updateMemo(memoid) {
      client
        .put(`/momos/${memoid}`)
        .then(() => console.log("updateMemo success"))
        .catch((err) => console.error(err));
    },
    deleteMemo(memoid) {
      client
        .delete(`/memos/${memoid}`)
        .then(() => console.log("deleteMemo success"))
        .catch((err) => console.error(err));
    },
  },
  getters: {},
};
