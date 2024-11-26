<script setup>
import { ref, onMounted } from "vue";

import attractionAPI from "@/api/attraction";
import imageLoader from "@/utils/image-loader";

import areacodeMapper from "@/utils/areacode-mapper";

const hotPlaces = ref([]);
const medals = ["🥇", "🥈", "🥉"];

const emit = defineEmits(["setHotPlaces"]);

onMounted(() => {
  attractionAPI.searchByFilter(
    { sortType: "like", pageSize: 3, offset: 0 },
    ({ data }) => {
      hotPlaces.value = data.items;
      emit("setHotPlaces", hotPlaces.value);
    },
    () => {
      console.log("상위 3개 데이터를 가져오지 못함");
    }
  );
});
</script>

<template>
  <div class="w-[80rem] mx-auto">
    <div class="mb-5">
      <h1 class="text-3xl">
        🔥 지금 <span class="text-rose-500">핫플레이스</span>는 어디일까요?
      </h1>
      <p class="text-xl text-gray-400 ps-10">
        현재 가장 인기 있는 세 곳을 추천해 드릴게요!
      </p>
    </div>

    <div class="flex justify-center items-center mb-16 p-5 overflow-hidden">
      <div
        v-for="(hotPlace, index) in hotPlaces"
        :key="hotPlace.no"
        class="relative w-80 rounded-lg shadow-2xl mx-8 mb-20 transition duration-200 ease-in-out hover:scale-105 border-2 border-transparent hover:border-main-200"
      >
        <img
          class="rounded-t-lg w-full h-56 object-cover"
          :src="
            !hotPlace.img
              ? imageLoader.getImageUrl('Gwanganri.jpg')
              : hotPlace.img
          "
        />

        <div
          class="absolute top-2 left-3 flex flex-col justify-center items-center"
        >
          <svg
            class="w-5 h-5 fill-red-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
            />
          </svg>
          <p class="text-sm text-red-300">
            {{ hotPlace.likeCount.toLocaleString() }}
          </p>
        </div>

        <div class="p-5">
          <div class="flex justify-between">
            <h1 class="mb-2 text-xl font-bold tracking-tight text-black">
              {{ medals[index] }} {{ hotPlace.title }}
              <span class="text-xs text-gray-400">
                {{ areacodeMapper.areaCodeToName(hotPlace.contentTypeId) }}
              </span>
            </h1>

            <p class="text-sm text-main-300">{{ hotPlace.sceneTitle }}</p>
          </div>

          <p class="font-normal text-gray-700">{{ hotPlace.address }}</p>

          <p
            class="mb-5 text-sm text-gray-500 truncate"
            :title="hotPlace.overview"
          >
            {{ hotPlace.overview }}
          </p>

          <div class="text-end">
            <RouterLink
              :to="{ name: 'search', query: { title: hotPlace.title } }"
              class="px-4 py-3 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400 focus:ring-4 focus:outline-none focus:ring-main-100"
            >
              상세 보기
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
