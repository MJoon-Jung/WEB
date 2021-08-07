import { Module } from "vuex";
import { RootState } from "..";
import client from "@/api/client";
import sendMultipartRequest from "@/api/sendMultipartRequest";
import router from "@/router";

export interface Memo {
  memoid: number | null;
  title: string | null;
  content: string | null;
  file: File | null;
  originalFileName: string | null;
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
      state.memos = state.memos.filter((memo) => {
        return memo.memoid !== memoid;
      });
      console.log("memos:", state.memos);
    },
    resetMemo(state) {
      state.memo.memoid = null;
      state.memo.title = "";
      state.memo.content = "";
      state.memo.file = null;
      state.memo.originalFileName = null;
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
        .then(() => console.log("addMemo success"))
        .catch((err) => console.error(err))
        .finally(() => router.push("/"));
    },
    updateMemo(context, updateInfo) {
      sendMultipartRequest
        .put(`/api/memos/${updateInfo.memoid}`, updateInfo.formData)
        .then(() => console.log("addMemo success"))
        .catch((err) => console.error(err))
        .finally(() => router.push("/"));
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
  getters: {
    getCurrentMemo(state) {
      return state.memo;
    },
    getCurrentMemos(state) {
      return state.memos;
    },
  },
};
