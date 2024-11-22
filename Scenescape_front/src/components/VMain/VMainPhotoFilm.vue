<script setup>
import { ref, onMounted } from "vue";
import imageLoader from "@/utils/imageLoader";

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
const startAutoplay = () => {
  isHovered.value = false;
  animate();
};
const stopAutoplay = () => {
  isHovered.value = true;
};

onMounted(() => {
  for (let i = 1; i < films.value.length; ++i) {
    films.value[i].shift = 320 * i;
  }

  animate();
});

function animate() {
  if (isHovered.value) {
    return;
  }

  const speed = 1;

  for (let f of films.value) {
    f.shift -= speed;

    if (f.shift <= -320) {
      f.shift = 1920;
    }
  }

  requestAnimationFrame(animate);
}
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
    class="relative w-[120rem] h-52 mx-auto overflow-hidden bg-red-500"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
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
