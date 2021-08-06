import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/components/Home.vue";
import AddMemo from "@/components/AddMemo.vue";
import Signin from "@/components/Signin.vue";
import Signup from "@/components/Signup.vue";
import ReadMemo from "@/components/ReadMemo.vue";
import EditMemo from "@/components/EditMemo.vue";
import client from "@/api/client";
import JwtDecode, { JwtPayload } from "jwt-decode";
import store from "../store";
import { computed } from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add",
    name: "Add",
    component: AddMemo,
    meta: { isLoggedIn: true },
  },
  {
    path: "/edit/:memoid",
    name: "Edit",
    component: EditMemo,
    props: true,
    meta: { isLoggedIn: true },
  },
  {
    path: "/memos/:memoid",
    name: "Read",
    component: ReadMemo,
    props: true,
    meta: { isLoggedIn: true },
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    meta: { isNotLoggedIn: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { isNotLoggedIn: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

interface JwtPayLoad extends JwtPayload {
  sub: string;
}
const isUserLoggedIn = computed(() => store.getters["Users/getIsUserLoggedIn"]);
router.beforeEach((to, from, next) => {
  if (localStorage.getItem("accessToken")) {
    const token = localStorage.getItem("accessToken");
    const { sub } = JwtDecode<JwtPayLoad>(token as string);
    client
      .get(`/api/users/${sub}`)
      .then(() => {
        store.commit("Users/updateCurrentLoggedIn", true);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    store.commit("Users/updateCurrentLoggedIn", false);
  }
  if (to.matched.some((record) => record.meta.isLoggedIn)) {
    isUserLoggedIn.value ? next() : next("/signin");
  } else if (to.matched.some((record) => record.meta.isNotLoggedIn)) {
    isUserLoggedIn.value ? next("/") : next();
  } else {
    next();
  }
});

export default router;
