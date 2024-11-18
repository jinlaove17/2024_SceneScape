import "@/assets/css/main.css";
import "vue3-markdown/dist/style.css";

import { createApp } from "vue";
import App from "@/App.vue";

import router from "./router";

import { createNaverMap } from "vue3-naver-maps";

import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();

pinia.use(
  createPersistedState({
    storage: sessionStorage,
  })
);

app
  .use(createNaverMap, {
    clientId: "uj8hbqlcvw", // Required
    category: "ncp", // Optional
    subModules: [], // Optional, "panorama" | "geocoder" | "drawing" | "visualization"
  })
  .use(router)
  .use(pinia)
  .mount("#app");
