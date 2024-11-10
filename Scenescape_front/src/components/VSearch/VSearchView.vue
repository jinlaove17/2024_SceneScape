<script setup>
import { ref } from "vue";
import { NaverMap, NaverMarker } from "vue3-naver-maps";

const map = ref();
const mapOptions = ref({
  latitude: 37.501286,
  longitude: 127.0396029,
  zoom: 17,
  zoomControl: true,
  zoomControlOptions: { position: "TOP_RIGHT" },
});

const onLoadMap = (mapObject) => {
  map.value = mapObject;
};
</script>

<template>
  <div class="flex">
    <naver-map
      class="grow h-[50rem] mx-auto border-t-2 border-r-2 border-b-2 border-main-200"
      :mapOptions="mapOptions"
      @onLoad="onLoadMap($event)"
    >
    </naver-map>
    <div class="w-96 mx-auto border-t-2 border-b-2 border-main-200"></div>
  </div>
</template>

<style scoped></style>
