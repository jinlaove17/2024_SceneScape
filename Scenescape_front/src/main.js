import "@/assets/css/main.css";

import { createApp } from "vue";
import App from "@/App.vue";

import { createNaverMap } from "vue3-naver-maps";

createApp(App)
  .use(createNaverMap, {
    clientId: "uj8hbqlcvw", // Required
    category: "ncp", // Optional
    subModules: [], // Optional, "panorama" | "geocoder" | "drawing" | "visualization"
  })
  .mount("#app");
