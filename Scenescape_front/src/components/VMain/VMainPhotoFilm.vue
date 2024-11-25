<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import imageLoader from "@/utils/image-loader";

const FILM_FRAME_SIZE = 320;
const MAX_WIDTH = 1920;
const ANIMATION_SPEED = 1;

const leftFilms = ref([
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

const rightFilms = ref([
  {
    id: 8,
    shift: 0,
    img: imageLoader.getImageUrl("Guardian.jpg"),
  },
  {
    id: 9,
    shift: 0,
    img: imageLoader.getImageUrl("Sample/SamplePhoto_1.jfif"),
  },
  {
    id: 10,
    shift: 0,
    img: imageLoader.getImageUrl("Sample/SamplePhoto_2.jpeg"),
  },
  {
    id: 11,
    shift: 0,
    img: imageLoader.getImageUrl("Sample/SamplePhoto_3.jfif"),
  },
  {
    id: 12,
    shift: 0,
    img: imageLoader.getImageUrl("Sample/SamplePhoto_4.jpg"),
  },
  {
    id: 13,
    shift: 0,
    img: imageLoader.getImageUrl("Sample/SamplePhoto_5.jfif"),
  },
  {
    id: 14,
    shift: 0,
    img: imageLoader.getImageUrl("Sample/SamplePhoto_6.jpg"),
  },
]);

let isHovered = ref(false);
const startAnimation = () => {
  isHovered.value = false;
  toLeftAnimation();
  toRightAnimation();
};
const stopAnimation = () => {
  isHovered.value = true;
};

const toLeftAnimation = () => {
  if (isHovered.value) {
    return;
  }

  for (let film of leftFilms.value) {
    film.shift -= ANIMATION_SPEED;

    if (film.shift <= -FILM_FRAME_SIZE) {
      film.shift = MAX_WIDTH;
    }
  }

  requestAnimationFrame(toLeftAnimation);
};

const toRightAnimation = () => {
  if (isHovered.value) {
    return;
  }

  for (let film of rightFilms.value) {
    film.shift += ANIMATION_SPEED;

    if (film.shift >= MAX_WIDTH) {
      film.shift = -FILM_FRAME_SIZE;
    }
  }

  requestAnimationFrame(toRightAnimation);
};

onMounted(() => {
  for (let i = 1; i < leftFilms.value.length; ++i) {
    leftFilms.value[i].shift = FILM_FRAME_SIZE * i;
  }

  for (let i = 1; i < rightFilms.value.length; ++i) {
    rightFilms.value[i].shift = FILM_FRAME_SIZE * i;
  }

  toLeftAnimation();
  toRightAnimation();
});
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
    class="relative w-full h-52 bg-black overflow-hidden"
    @mouseenter="stopAnimation"
    @mouseleave="startAnimation"
  >
    <img
      v-for="film in leftFilms"
      :key="film.id"
      class="absolute w-80 h-full object-cover"
      :style="{
        transform: `translateX(${film.shift}px)`,
      }"
      :src="film.img"
    />
    <img
      v-for="film in leftFilms"
      :key="film.id"
      class="absolute w-80 h-full object-center"
      :style="{
        transform: `translateX(${film.shift}px)`,
      }"
      src="@/assets/img/FlimFrame.png"
    />
  </div>

  <div
    class="relative w-full h-52 bg-black overflow-hidden"
    @mouseenter="stopAnimation"
    @mouseleave="startAnimation"
  >
    <img
      v-for="film in rightFilms"
      :key="film.id"
      class="absolute w-80 h-full object-cover"
      :style="{
        transform: `translateX(${film.shift}px)`,
      }"
      :src="film.img"
    />
    <img
      v-for="film in rightFilms"
      :key="film.id"
      class="absolute w-80 h-full object-center"
      :style="{
        transform: `translateX(${film.shift}px)`,
      }"
      src="@/assets/img/FlimFrame.png"
    />
  </div>
</template>

<style scoped></style>
