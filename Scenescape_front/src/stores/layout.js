import { ref } from "vue";
import { defineStore } from "pinia";

export const useLayoutStore = defineStore(
  "layout",
  () => {
    const isFooterVisible = ref(true);

    return {
      isFooterVisible,
    };
  },
  { persist: true }
);
