import "@/assets/css/main.css";

import { createApp } from "vue";
import App from "@/App.vue";

import { createNaverMap } from "vue3-naver-maps";

import router from "./router";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app
  .use(createNaverMap, {
    clientId: "uj8hbqlcvw", // Required
    category: "ncp", // Optional
    subModules: [], // Optional, "panorama" | "geocoder" | "drawing" | "visualization"
  })
  .use(router)
  .use(pinia)
  .mount("#app");
