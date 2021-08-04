import { createStore } from "vuex";
import { Users, UserState } from "./models/Users";
import { Memos, MemoState } from "./models/Memos";
import { Auth, AuthState } from "./models/Auth";
import { Admin, AdminState } from "./models/Admin";

export interface RootState {
  User: UserState;
  Memos: MemoState;
  Auth: AuthState;
  Admin: AdminState;
}

export default createStore({
  modules: { Users, Memos, Auth, Admin },
});
