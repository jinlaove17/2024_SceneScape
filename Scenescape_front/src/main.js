import "@/assets/css/main.css";
import "vue3-markdown/dist/style.css";

import { createApp } from "vue";
import App from "@/App.vue";

import router from "./router";

import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

import { useKakao } from "vue3-kakao-maps/@utils";

const app = createApp(App);
const pinia = createPinia();

pinia.use(
  createPersistedState({
    storage: sessionStorage,
  })
);

useKakao("");
app.use(router).use(pinia).mount("#app");
