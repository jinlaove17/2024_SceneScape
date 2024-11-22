<script setup>
import { ref, computed } from "vue";
import { KakaoMap } from "vue3-kakao-maps";

const map = ref();
const originPosition = {
  lat: 37.501286,
  lng: 127.0396029,
};
let markerInfoList = ref([]);
const markerList = computed(() => markerInfoList.value);
let markerCount = ref(0);

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
};

// const updateMarkers = () => {
//   const length = pageInfo.value.items.length;

//   if (length <= 0) {
//     return;
//   }

//   const bounds = new kakao.maps.LatLngBounds();

//   markerInfoList.value = [];

//   for (let i = 0; i < length; ++i) {
//     markerInfoList.value.push({
//       key: pageInfo.value.items[i].no,
//       lat: pageInfo.value.items[i].latitude,
//       lng: pageInfo.value.items[i].longitude,
//     });

//     bounds.extend(
//       new kakao.maps.LatLng(
//         markerInfoList.value[i].lat,
//         markerInfoList.value[i].lng
//       )
//     );
//   }

//   // computed 객체 markerList 갱신
//   markerCount.value = length;
//   setBounds(bounds);
// };

const clearMakers = () => {
  markerInfoList.value = [];
  markerCount.value = 0;
  panTo(originPosition.lat, originPosition.lng);
};

const setBounds = (bounds) => {
  // 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다.
  // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다.
  if (map.value) {
    map.value.setBounds(bounds);
  }
};

const panTo = (lat, lng) => {
  if (map.value) {
    // 지도 중심을 부드럽게 이동시킵니다.
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다.
    map.value.setLevel(3);
    map.value.panTo(new kakao.maps.LatLng(lat, lng));
  }
};
</script>

<template>
  <!-- overflow-hidden -->
  <div class="w-full h-[50rem] mx-auto flex overflow-hidden">
    <KakaoMap
      class="!w-full !h-full z-0 mx-auto"
      :lat="originPosition.lat"
      :lng="originPosition.lng"
      :draggable="true"
      :markerList="markerList"
      @onLoadKakaoMap="onLoadKakaoMap"
    >
    </KakaoMap>
  </div>
</template>

<style scoped></style>
