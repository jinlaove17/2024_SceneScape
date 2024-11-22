<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import imageLoader from "@/utils/imageLoader";

const FILM_FRAME_SIZE = 320;
const MAX_WIDTH = 1920;

const films = ref([
  {
    id: 1,
    shift: 0,
    img: imageLoader.getImageUrl("Guardian.jpg"),
  },
  {
    id: 2,
    shift: 0,
    img: imageLoader.getImageUrl("Sample/SamplePhoto_1.jfif"),
  },
  {
    id: 3,
    shift: 0,
    img: imageLoader.getImageUrl("Sample/SamplePhoto_2.jpeg"),
  },
  {
    id: 4,
    shift: 0,
    img: imageLoader.getImageUrl("Sample/SamplePhoto_3.jfif"),
  },
  {
    id: 5,
    shift: 0,
    img: imageLoader.getImageUrl("Sample/SamplePhoto_4.jpg"),
  },
  {
    id: 6,
    shift: 0,
    img: imageLoader.getImageUrl("Sample/SamplePhoto_5.jfif"),
  },
  {
    id: 7,
    shift: 0,
    img: imageLoader.getImageUrl("Sample/SamplePhoto_6.jpg"),
  },
]);

let isHovered = ref(false);
const startAnimation = () => {
  isHovered.value = false;
  animateFlims();
};
const stopAnimation = () => {
  isHovered.value = true;
};

const animateFlims = () => {
  if (isHovered.value) {
    return;
  }

  const speed = 0.5;

  for (let film of films.value) {
    film.shift -= speed;

    if (film.shift <= -FILM_FRAME_SIZE) {
      film.shift = MAX_WIDTH;
    }
  }

  requestAnimationFrame(animateFlims);
};

onMounted(() => {
  for (let i = 1; i < films.value.length; ++i) {
    films.value[i].shift = FILM_FRAME_SIZE * i;
  }

  animateFlims();
});
</script>

<template>
  <div class="w-[80rem] mb-5 overflow-hidden">
    <h1 class="text-3xl">
      📸 이곳의 <span class="text-blue-500">주인공</span>은 바로 나!
    </h1>
    <p class="text-xl text-gray-400 ps-10">
      촬영지에서 주인공이 된 사진을 공유해보세요!
    </p>
  </div>

  <div
    class="relative w-full h-52 bg-black overflow-hidden"
    @mouseenter="stopAnimation"
    @mouseleave="startAnimation"
  >
    <img
      v-for="film in films"
      :key="film.id"
      class="absolute w-80 h-full object-cover"
      :style="{
        transform: `translateX(${film.shift}px)`,
      }"
      :src="film.img"
      alt=""
    />
    <img
      v-for="film in films"
      :key="film.id"
      class="absolute w-80 h-full object-center"
      :style="{
        transform: `translateX(${film.shift}px)`,
      }"
      src="@/assets/img/FlimFrame.png"
      alt=""
    />
  </div>
</template>

<style scoped></style>
