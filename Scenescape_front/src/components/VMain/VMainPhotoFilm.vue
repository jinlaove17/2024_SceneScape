<script setup>
import { ref } from "vue";

const films = ref([
  {
    id: 1,
    shift: 0,
    img: "https://via.placeholder.com/800x400?text=Image+1",
  },
  {
    id: 2,
    shift: 0,
    img: "https://via.placeholder.com/800x400?text=Image+2",
  },
  {
    id: 3,
    shift: 0,
    img: "https://via.placeholder.com/800x400?text=Image+3",
  },
  {
    id: 4,
    shift: 0,
    img: "https://via.placeholder.com/800x400?text=Image+4",
  },
  {
    id: 5,
    shift: 0,
    img: "https://via.placeholder.com/800x400?text=Image+1",
  },
  {
    id: 6,
    shift: 0,
    img: "https://via.placeholder.com/800x400?text=Image+2",
  },
]);

const startAutoplay = () => {};
const stopAutoplay = () => {};
</script>

<template>
  <div class="w-[80rem] mx-auto mb-5 overflow-hidden">
    <h1 class="text-3xl">
      📸 이곳의 <span class="text-blue-500">주인공</span>은 바로 나!
    </h1>
    <p class="text-xl text-gray-400 ps-10">
      촬영지에서 주인공이 된 사진을 공유해보세요!
    </p>
  </div>

  <div
    class="w-[120rem] mx-auto flex overflow-hidden"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <img
      v-for="film in films"
      :key="film.id"
      class="w-80 object-center"
      :style="{ transform: `translateX(-${film.shift}px)` }"
      :src="film.img"
      alt=""
    />
  </div>
  <div
    class="w-[120rem] mx-auto flex overflow-hidden"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <img
      v-for="film in films"
      :key="film.id"
      class="w-80 object-center"
      :style="{ transform: `translateX(-${film.shift}px)` }"
      :src="film.img"
      alt=""
    />
  </div>
</template>

<style scoped></style>
