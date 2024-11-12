import { createRouter, createWebHistory } from "vue-router";
import VMainView from "@/views/VMainView.vue";
import VSearchView from "@/views/VSearchView.vue";
import VLoginView from "@/views/VLoginView.vue";
import VSignupView from "@/views/VSignupView.vue";
import VPhotoBoardView from "@/views/VPhotoBoardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: VMainView,
    },
    {
      path: "/login",
      name: "login",
      component: VLoginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: VSignupView,
    },
    {
      path: "/search",
      name: "search",
      component: VSearchView,
    },
    {
      path: "/photoboard",
      name: "photoboard",
      component: VPhotoBoardView,
    },
  ],
});

export default router;
