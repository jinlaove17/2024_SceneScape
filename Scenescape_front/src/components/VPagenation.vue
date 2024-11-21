<script setup>
import { computed } from "vue";

const props = defineProps({
  pageInfo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["changePage"]);
const onChangePage = (page) => {
  emit("changePage", page);
};

const NAVIGATION_SIZE = parseInt(
  import.meta.env.VITE_ATTRACTION_NAVIGATION_SIZE
);

const startPage = computed(() => {
  return (
    parseInt((props.pageInfo.page - 1) / NAVIGATION_SIZE) * NAVIGATION_SIZE + 1
  );
});
const endPage = computed(() => {
  let lastPage =
    parseInt((props.pageInfo.page - 1) / NAVIGATION_SIZE) * NAVIGATION_SIZE +
    NAVIGATION_SIZE;
  return lastPage < totalPage.value ? lastPage : totalPage.value;
});
const totalPage = computed(() => {
  return parseInt((props.pageInfo.totalCount - 1) / NAVIGATION_SIZE) + 1;
});
const endRange = computed(() => {
  return (
    parseInt((totalPage.value - 1) / NAVIGATION_SIZE) * NAVIGATION_SIZE <
    props.pageInfo.page
  );
});

const range = (start, end) => {
  const list = [];
  for (let i = start; i <= end; ++i) {
    list.push(i);
  }
  return list;
};
</script>

<template>
  <nav>
    <ul class="flex items-center -space-x-px h-8 cursor-pointer">
      <li
        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
        @click="onChangePage(startPage === 1 ? 1 : startPage - 1)"
      >
        <span class="sr-only">Previous</span>
        <svg
          class="w-2.5 h-2.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </li>
      <li
        v-for="page in range(startPage, endPage)"
        :key="page"
        class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        :class="page == props.pageInfo.page ? 'bg-main-200' : 'bg-white'"
        @click="onChangePage(page)"
      >
        {{ page }}
      </li>
      <li
        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
        @click="onChangePage(endRange ? totalPage : endPage + 1)"
      >
        <span class="sr-only">Next</span>
        <svg
          class="w-2.5 h-2.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
