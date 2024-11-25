<script setup>
import { ref, computed, readonly } from "vue";

import { useUserStore } from "@/stores/user";

import VSearchSidebarPlanList from "./VSearchSidebarPlanList.vue";
import VSearchSidebarPlanForm from "./VSearchSidebarPlanForm.vue";

const { userInfo } = useUserStore();

// 애니메이션 관련
const isOpen = ref(true);
const openAnimation = computed(() =>
  isOpen.value ? "translate-x-0" : "-translate-x-full"
);

// 계획 관련
const MODE_LIST = 0;
const MODE_WRITE = 1;
const mode = ref(MODE_LIST);
const selectedPlan = ref({});

const onGoForm = (plan) => {
  if (!userInfo.id) {
    alert("로그인 후 이용 가능합니다.");
    return;
  }

  mode.value = MODE_WRITE;

  // 기존 계획 수정
  if (plan) {
    selectedPlan.value = plan;
  }
  // 새 계획 추가
  else {
    selectedPlan.value = null;
  }
};

const onGoList = () => {
  mode.value = MODE_LIST;
};

const searchSidebarPlanForm = ref(null);

const insertAttractionToPlan = (attraction) => {
  console.log("반갑습니다", searchSidebarPlanForm.value);

  if (searchSidebarPlanForm.value) {
    searchSidebarPlanForm.value.insertAttractionToPlan(attraction);
  }
};

defineExpose({
  mode: readonly(mode), // mode를 readonly로 감싸서 읽기 전용으로 노출
  insertAttractionToPlan,
});
</script>

<template>
  <div
    class="absolute w-96 h-full z-10 transition-transform duration-500 bg-white border border-l-transparent border-r-gray-200"
    :class="openAnimation"
    @submit.prevent
  >
    <button
      class="absolute w-7 h-12 flex justify-center items-center top-1/2 right-0 transform translate-x-full -translate-y-1/2 bg-white rounded-r-lg border border-l-transparent border-r-gray-200"
      type="button"
      @click="isOpen = !isOpen"
    >
      <svg
        v-show="!isOpen"
        class="w-5 h-5 fill-main-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
      >
        <path
          d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
        />
      </svg>

      <svg
        v-show="isOpen"
        class="w-5 h-5 fill-main-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
      >
        <path
          d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
        />
      </svg>
    </button>

    <VSearchSidebarPlanList v-if="mode === MODE_LIST" @go-form="onGoForm" />
    <VSearchSidebarPlanForm
      v-if="mode === MODE_WRITE"
      :plan="selectedPlan"
      ref="searchSidebarPlanForm"
      @go-list="onGoList"
    />
  </div>
</template>

<style scoped></style>
