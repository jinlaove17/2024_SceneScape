<script setup>
import VMainCarousel from "@/components/VMain/VMainCarousel.vue";
import VMainHotPlace from "@/components/VMain/VMainHotPlace.vue";
import VMainPhotoFilm from "@/components/VMain/VMainPhotoFilm.vue";
import VTopButton from "@/components/VTopButton.vue";
</script>

<template>
  <div>
    <VMainCarousel class="mb-16" />
    <VMainHotPlace class="mb-16" />
    <VMainPhotoFilm />
    <VTopButton />
  </div>
</template>

<style scoped></style>
