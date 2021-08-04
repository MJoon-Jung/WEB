import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Books from "../components/Books.vue";
import Book from "../components/Book.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Books,
  },
  {
    path: "/books/:bookId",
    name: "book",
    component: Book,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
