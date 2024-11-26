<script setup>
import { ref, watch } from "vue";

import boardAPI from "@/api/board";

const FILM_FRAME_SIZE = 320;
const MAX_WIDTH = 1920;
const ANIMATION_SPEED = 0.5;

const props = defineProps({
  hotPlaces: {
    type: Array,
    required: true,
  },
});
const filmList = ref([]);

watch(
  () => props.hotPlaces,
  async (newHotPlaces) => {
    if (!newHotPlaces.length) return;

    const attractionTitleList = newHotPlaces.map((item) => ({
      sceneTitle: item.sceneTitle,
      attractionTitle: item.title,
    }));

    // 2줄만 나타나도록 마지막 원소 제거
    attractionTitleList.pop();

    filmList.value = await Promise.all(
      attractionTitleList.map(
        (item) =>
          new Promise((resolve) => {
            boardAPI.searchByFilter(
              {
                searchType: ["sceneTitle", "attractionTitle"],
                searchKeyword: [item.sceneTitle, item.attractionTitle],
                pageSize: 6,
                offset: 0,
              },
              ({ data }) => {
                // 데이터 가공
                const newFilm = data.results.map((frame) => ({
                  no: frame.no,
                  img: frame.thumbnailUrl,
                  shift: 0,
                }));
                resolve(newFilm); // 성공 시 결과 반환
              },
              (error) => {
                console.error(error);
                resolve([]); // 에러 발생 시 빈 배열 반환
              }
            );
          })
      )
    );

    for (let i = 0; i < filmList.value.length; ++i) {
      let j = 0;

      for (; j < filmList.value[i].length; ++j) {
        filmList.value[i][j].shift = FILM_FRAME_SIZE * j;
      }

      filmList.value[i].push({
        no: -(i + 1),
        img: props.hotPlaces[i].img,
        shift: FILM_FRAME_SIZE * j,
      });
    }

    firstFilmAnimation();
    secondFilmAnimation();
  },
  { immediate: true }
);

let isHovered = ref([false, false, false]);

const startAnimation = (index) => {
  isHovered.value[index] = false;

  switch (index) {
    case 0:
      firstFilmAnimation();
      break;
    case 1:
      secondFilmAnimation();
      break;
  }
};
const stopAnimation = (index) => {
  isHovered.value[index] = true;
};

const firstFilmAnimation = () => {
  if (isHovered.value[0]) {
    return;
  }

  for (let frame of filmList.value[0]) {
    frame.shift -= ANIMATION_SPEED;

    if (frame.shift <= -FILM_FRAME_SIZE) {
      frame.shift = MAX_WIDTH;
    }
  }

  requestAnimationFrame(firstFilmAnimation);
};

const secondFilmAnimation = () => {
  if (isHovered.value[1]) {
    return;
  }

  for (let frame of filmList.value[1]) {
    frame.shift += ANIMATION_SPEED;

    if (frame.shift >= MAX_WIDTH) {
      frame.shift = -FILM_FRAME_SIZE;
    }
  }

  requestAnimationFrame(secondFilmAnimation);
};
</script>

<template>
  <div class="w-[80rem] mx-auto mb-5 overflow-hidden">
    <h1 class="text-3xl">
      📸 이 장면의 <span class="text-blue-500">주인공</span>은 바로 나!
    </h1>
    <p class="text-xl text-gray-400 ps-10">
      촬영지에서 주인공이 된 사진을 공유해보세요!
    </p>
  </div>

  <div
    v-for="(film, index) in filmList"
    :key="index"
    class="relative w-full h-52 overflow-hidden"
    @mouseenter="stopAnimation(index)"
    @mouseleave="startAnimation(index)"
  >
    <img
      v-for="frame in film"
      :key="frame.no"
      class="absolute w-80 h-full object-cover"
      :style="{
        transform: `translateX(${frame.shift}px)`,
      }"
      :src="frame.img"
    />
    <img
      v-for="frame in film"
      :key="frame.no"
      class="absolute w-80 h-full object-center"
      :style="{
        transform: `translateX(${frame.shift}px)`,
      }"
      src="@/assets/img/FlimFrame.png"
    />
  </div>
</template>

<style scoped></style>
