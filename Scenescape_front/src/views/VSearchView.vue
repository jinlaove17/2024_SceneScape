<script setup>
import { ref, provide } from "vue";

import VSearchKakaoMap from "@/components/VSearch/VSearchKakaoMap.vue";
import VSearchSidebarPlan from "@/components/VSearch/VSearchSidebarPlan.vue";
import VSearchSidebarSearch from "@/components/VSearch/VSearchSidebarSearch.vue";

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
</script>

<template>
  <div class="relative flex overflow-hidden">
    <VSearchSidebarPlan ref="searchSidebarPlan" />
    <VSearchKakaoMap ref="searchMap" />
    <VSearchSidebarSearch />
  </div>
</template>

<style scoped></style>
