<script setup>
import { ref, provide, watchEffect, onMounted, onUnmounted } from "vue";

import { useLayoutStore } from "@/stores/layout";
import { storeToRefs } from "pinia";

import VSearchKakaoMap from "@/components/VSearch/VSearchKakaoMap.vue";
import VSearchSidebarPlan from "@/components/VSearch/VSearchSidebarPlan.vue";
import VSearchSidebarSearch from "@/components/VSearch/VSearchSidebarSearch.vue";

// SearchView에서는 footer 제거
const layoutStore = useLayoutStore();
const { isFooterVisible } = storeToRefs(layoutStore);

onMounted(() => {
  isFooterVisible.value = false;
});

onUnmounted(() => {
  isFooterVisible.value = true;
});

// 지도 관련
const searchMap = ref(null);
const updateMarkers = (attractions) => {
  searchMap.value.updateMarkers(attractions);
};
const clearMarkers = () => {
  searchMap.value.clearMarkers();
};
const panTo = (lat, lng) => {
  searchMap.value.panTo(lat, lng);
};
const updatePathMarkers = (attractions) => {
  searchMap.value.updatePathMarkers(attractions);
};
const clearPathMarkers = () => {
  searchMap.value.clearPathMarkers();
};

provide("updateMarkers", updateMarkers);
provide("clearMarkers", clearMarkers);
provide("panTo", panTo);
provide("updatePathMarkers", updatePathMarkers);
provide("clearPathMarkers", clearPathMarkers);

// 일정 관련
const searchSidebarPlan = ref(null);
const insertAttractionToPlan = (attraction) => {
  searchSidebarPlan.value.insertAttractionToPlan(attraction);
};

provide("insertAttractionToPlan", insertAttractionToPlan);

let planMode = ref(0);
watchEffect(() => {
  if (searchSidebarPlan.value) {
    planMode.value = searchSidebarPlan.value.mode;
  }
});
</script>

<template>
  <div class="relative flex overflow-hidden">
    <VSearchSidebarPlan ref="searchSidebarPlan" />
    <VSearchKakaoMap ref="searchMap" />

    <!-- defineExpose 된 searchSidebarPlan.mode를 props로 넘기면 왜 안되는지 모르겠음. 일단은 watchEffect로 해결 -->
    <VSearchSidebarSearch :planMode="planMode" />
  </div>
</template>

<style scoped></style>
