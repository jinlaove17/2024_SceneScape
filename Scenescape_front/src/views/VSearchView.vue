<script setup>
import VSearchDropdown from "@/components/VSearchDropdown.vue";
import { ref, onMounted } from "vue";
import { NaverMap, NaverMarker } from "vue3-naver-maps";
import attractionAPI from "@/api/attraction";

const map = ref();
const mapOptions = ref({
  latitude: 37.501286,
  longitude: 127.0396029,
  zoom: 17,
  zoomControl: true,
  zoomControlOptions: { position: "TOP_RIGHT" },
});

const sceneTitles = ref([]);
const scenes = ref([]);

onMounted(() => {
  attractionAPI.getSceneTitles(
    ({ data }) => {
      sceneTitles.value = data;
      // console.log(sceneTitles.value);
    },
    () => {
      console.log("SceneTitles 로드 실패");
    }
  );
});

const onLoadMap = (mapObject) => {
  map.value = mapObject;
};

const loadScenes = (title) => {
  attractionAPI.searchBySceneTitle(
    title,
    ({ data }) => {
      scenes.value = data;
    },
    () => {
      console.log("searchBySceneTitle 로드 실패");
    }
  );
};
</script>

<template>
  <div class="w-[120rem] h-[54rem] mx-auto flex">
    <naver-map
      class="grow mx-auto border-2 border-main-200"
      :mapOptions="mapOptions"
      @onLoad="onLoadMap($event)"
    >
    </naver-map>

    <div class="w-96 mx-auto border-2 border-main-200">
      <form class="flex flex-col w-full" @submit.prevent>
        <div class="group relative w-80 my-3 mx-auto">
          <label
            for="search"
            class="block text-sm text-gray-500 group-focus-within:text-main-300"
          >
            검색하기
          </label>
          <input
            class="block w-full px-10 pt-3 pb-2 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-main-300"
            type="text"
            id="search"
            placeholder="당신만의 씬을 검색해보세요..."
          />
          <svg
            class="absolute left-3 top-8 w-5 h-5 fill-gray-300 group-focus-within:fill-main-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            />
          </svg>
        </div>

        <div class="w-80 mx-auto">
          <VSearchDropdown
            :title="'컨텐츠'"
            :items="sceneTitles"
            @require-sub-items="loadScenes"
          />
          <VSearchDropdown
            :title="'촬영지'"
            :items="scenes.map((item) => item.title)"
          />
        </div>

        <div class="w-80 mx-auto">
          <div class="w-80 mx-auto flex flex-wrap2">
            <input
              v-for="index in 8"
              :key="index"
              :id="'checkbox-' + index"
              class="w-10 h-10 border-2 border-main-300 rounded-md"
              type="checkbox"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
