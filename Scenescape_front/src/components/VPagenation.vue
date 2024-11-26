<script setup>
import { computed } from "vue";

const props = defineProps({
  pageSize: {
    type: Number,
    required: true,
  },
  navigationSize: {
    type: Number,
    required: true,
  },
  pageInfo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["changePage"]);
const onChangePage = (page) => {
  emit("changePage", page);
};

const startPage = computed(() => {
  return (
    parseInt((props.pageInfo.page - 1) / props.navigationSize) *
      props.navigationSize +
    1
  );
});
const endPage = computed(() => {
  let lastPage =
    parseInt((props.pageInfo.page - 1) / props.navigationSize) *
      props.navigationSize +
    props.navigationSize;
  return lastPage < totalPage.value ? lastPage : totalPage.value;
});
const totalPage = computed(() => {
  return parseInt((props.pageInfo.totalCount - 1) / props.pageSize) + 1;
});
const endRange = computed(() => {
  return (
    parseInt((totalPage.value - 1) / props.navigationSize) *
      props.navigationSize <
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
    <ul class="flex items-center h-8 cursor-pointer text-sm">
      <li
        class="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
        @click="onChangePage(1)"
      >
        <span>처음</span>
      </li>

      <li
        class="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        @click="onChangePage(startPage === 1 ? 1 : startPage - 1)"
      >
        <span>이전</span>
      </li>
      <li
        v-for="page in range(startPage, endPage)"
        :key="page"
        class="flex items-center justify-center px-2 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        :class="page == props.pageInfo.page ? 'bg-main-200' : 'bg-white'"
        @click="onChangePage(page)"
      >
        {{ page }}
      </li>
      <li
        class="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        @click="onChangePage(endRange ? totalPage : endPage + 1)"
      >
        <span>다음</span>
      </li>
      <li
        class="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
        @click="onChangePage(totalPage)"
      >
        <span>끝</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
