import { ref } from "vue";
import { defineStore } from "pinia";

export const useBoardStore = defineStore(
  "board",
  () => {
    const searchFilter = ref({
      searchType: "title",
      searchKeyword: "",
      sortType: "created",
      page: 1,
    });

    const resetSearchFilter = () => {
      searchFilter.value.searchType = "title";
      searchFilter.value.searchKeyword = "";
      searchFilter.value.sortType = "created";
      searchFilter.value.page = 1;
    };

    return {
      searchFilter,
      resetSearchFilter,
    };
  },
  { persist: true }
);
