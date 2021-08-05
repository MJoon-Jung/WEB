import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/components/Home.vue";
import AddMemo from "@/components/AddMemo.vue";
import Signin from "@/components/Signin.vue";
import Signup from "@/components/Signup.vue";
import ReadMemo from "@/components/ReadMemo.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "/add", name: "Add", component: AddMemo, meta: { isAuth: true } },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isLoggedIn)) {
    localStorage.getItem("accessToken") ? next() : next("/signin");
  } else if (to.matched.some((record) => record.meta.isNotLoggedIn)) {
    localStorage.getItem("accessToken") ? next("/") : next();
  } else {
    next();
  }
});

export default router;
