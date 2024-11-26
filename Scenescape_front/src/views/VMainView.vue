<script setup>
import { ref } from "vue";

import VMainCarousel from "@/components/VMain/VMainCarousel.vue";
import VMainHotPlace from "@/components/VMain/VMainHotPlace.vue";
import VMainPhotoFilm from "@/components/VMain/VMainPhotoFilm.vue";
import VTopButton from "@/components/VTopButton.vue";

const hotPlaces = ref([]);
const setHotPlaces = (places) => {
  hotPlaces.value = places;
};
</script>

<template>
  <div>
    <VMainCarousel />
    <VMainHotPlace @set-hot-places="setHotPlaces" />
    <VMainPhotoFilm :hotPlaces="hotPlaces" />
    <VTopButton />
  </div>
</template>

<style scoped></style>
