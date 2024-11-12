import "@/assets/css/main.css";

import { createApp } from "vue";
import App from "@/App.vue";

import { createNaverMap } from "vue3-naver-maps";

import router from "./router";

createApp(App)
  .use(createNaverMap, {
    clientId: "uj8hbqlcvw", // Required
    category: "ncp", // Optional
    subModules: [], // Optional, "panorama" | "geocoder" | "drawing" | "visualization"
  })
  .use(router)
  .mount("#app");
