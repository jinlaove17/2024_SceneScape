<script setup>
import { ref, computed } from "vue";
import { KakaoMap } from "vue3-kakao-maps";

// 카카오 맵 관련
const map = ref();
const originPosition = {
  lat: 37.501286,
  lng: 127.0396029,
};
let markerInfoList = ref([]);
const markerList = computed(() => markerInfoList.value);

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
};

const updateMarkers = (attractions) => {
  const bounds = new kakao.maps.LatLngBounds();
  const newMarkerList = [];

  for (let i = 0; i < attractions.length; ++i) {
    newMarkerList.push({
      key: attractions[i].no,
      lat: attractions[i].latitude,
      lng: attractions[i].longitude,
    });

    bounds.extend(
      new kakao.maps.LatLng(attractions[i].latitude, attractions[i].longitude)
    );
  }

  // computed 객체 markerList 갱신
  markerInfoList.value = newMarkerList;
  setBounds(bounds);
};

const clearMarkers = () => {
  markerInfoList.value = [];
  panTo(originPosition.lat, originPosition.lng);
};

const setBounds = (bounds) => {
  // 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다.
  // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다.
  map.value.setBounds(bounds);
};

const panTo = (lat, lng) => {
  // 지도 중심을 부드럽게 이동시킵니다.
  // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다.
  map.value.setLevel(3);
  map.value.panTo(new kakao.maps.LatLng(lat, lng));
};

// 익스포즈 관련
defineExpose({
  updateMarkers,
  clearMarkers,
  panTo,
});
</script>

<template>
  <KakaoMap
    class="flex-grow !h-[50rem] !z-0"
    :lat="originPosition.lat"
    :lng="originPosition.lng"
    :draggable="true"
    :markerList="markerList"
    @onLoadKakaoMap="onLoadKakaoMap"
  >
  </KakaoMap>
</template>

<style scoped></style>
