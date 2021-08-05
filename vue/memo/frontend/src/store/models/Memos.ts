import { Module } from "vuex";
import { RootState } from "..";
import client from "@/api/client";
import sendMultipartRequest from "@/api/sendMultipartRequest";
import router from "@/router";
import axios from "axios";

export interface Memo {
  memoid: number;
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
  mutations: {
    updateMemos(state, memos) {
      state.memos = memos;
    },
    updateMemo(state, memo) {
      state.memo = memo;
    },
    deleteMemo(state, memoid) {
      console.log("memoid: ", memoid);
      state.memos = [...state.memos].filter((memo) => {
        console.log("memo: ", memo);
        memo.memoid !== memoid;
      });
      console.log("memos:", state.memos);
    },
  },
  actions: {
    getMemos({ commit }) {
      client
        .get("/api/memos")
        .then((res) => {
          commit("updateMemos", res.data);
        })
        .catch((err) => console.error(err));
    },
    getMemo({ commit }, memoid) {
      client
        .get(`/api/memos/${memoid}`)
        .then((res) => {
          commit("updateMemo", res.data);
        })
        .catch((err) => console.error(err));
    },
    addMemo(context, formData) {
      sendMultipartRequest
        .post("/api/memos", formData)
        .then(() => {
          console.log("addMemo success");
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => router.push("/"));
    },
    updateMemo(memoid) {
      client
        .put(`/api/momos/${memoid}`)
        .then(() => console.log("updateMemo success"))
        .catch((err) => console.error(err));
    },
    deleteMemo(context, memoid) {
      client
        .delete(`/api/memos/${memoid}`)
        .then(() => {
          console.log("deleteMemo success");
          context.commit("deleteMemo", memoid);
        })
        .catch((err) => console.error(err));
    },
  },
  getters: {},
};
