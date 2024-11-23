<script setup>
import { ref } from "vue";

import VSearchForm from "@/components/VSearch/VSearchForm.vue";
import VSearchKakaoMap from "@/components/VSearch/VSearchKakaoMap.vue";
import VSearchPlanForm from "@/components/VSearch/VSearchPlanForm.vue";

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
</script>

<template>
  <div class="relative flex">
    <VSearchKakaoMap ref="searchMap" />
    <VSearchForm
      @update-markers="updateMarkers"
      @clear-markers="clearMarkers"
      @pan-to="panTo"
    />

    <!-- <VSearchPlanForm /> -->
  </div>
</template>

<style scoped></style>
