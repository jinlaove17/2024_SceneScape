<script setup>
import { ref } from "vue";

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

// 일정 관련
const searchSidebarPlan = ref(null);
const insertAttractionToPlan = (attraction) => {
  searchSidebarPlan.value.insertAttractionToPlan(attraction);
};
</script>

<template>
  <div class="relative flex overflow-hidden">
    <VSearchSidebarPlan ref="searchSidebarPlan" />
    <VSearchKakaoMap ref="searchMap" />
    <VSearchSidebarSearch
      @update-markers="updateMarkers"
      @clear-markers="clearMarkers"
      @pan-to="panTo"
      @insert-attraction-to-plan="insertAttractionToPlan"
    />
  </div>
</template>

<style scoped></style>
