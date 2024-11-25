import { createRouter, createWebHistory } from "vue-router";
import VMainView from "@/views/VMainView.vue";

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
      component: () => import("@/views/VLoginView.vue"),
      children: [
        {
          path: "",
          name: "login",
          component: () => import("@/components/VLogin/VLoginForm.vue"),
        },
        {
          path: "find-passowrd",
          name: "login_find-password",
          component: () =>
            import("@/components/VLogin/VLoginFindPasswordForm.vue"),
        },
      ],
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/VSignupView.vue"),
    },
    {
      path: "/search/:title?",
      name: "search",
      component: () => import("@/views/VSearchView.vue"),
    },
    {
      path: "/board",
      name: "board",
      component: () => import("@/views/VBoardView.vue"),
    },
    {
      path: "/board/:no",
      name: "board_detail",
      component: () => import("@/views/VBoardDetailView.vue"),
    },
    {
      path: "/board/write/:no?",
      name: "board_write",
      component: () => import("@/views/VBoardWriteView.vue"),
    },
    {
      path: "/mypage",
      name: "mypage",
      component: () => import("@/views/VMypageView.vue"),
    },
  ],
});

export default router;
