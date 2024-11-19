<script setup>
import VSearchDropdown from "@/components/VSearchDropdown.vue";
import { ref, onMounted, computed } from "vue";
import { NaverMap, NaverMarker } from "vue3-naver-maps";
import attractionAPI from "@/api/attraction";

// NaverMap
const map = ref();
const mapOptions = ref({
  latitude: 37.501286,
  longitude: 127.0396029,
  zoom: 17,
  zoomControl: true,
  zoomControlOptions: { position: "TOP_RIGHT" },
});
const markers = ref([]);
const onLoadMarker = (markerObject) => {
  markers.value.push(markerObject);
  console.log(markers.value);
};

const onLoadMap = (mapObject) => {
  map.value = mapObject;
};

// 사이드바 관련
const isOpenSideBar = ref(true);
const sideBarAnimation = computed(() =>
  isOpenSideBar.value ? "translate-x-0" : "translate-x-full"
);

// 씬 검색 컨텐츠
const selectedBit = ref(0);
const isSelectedContent = (num) => {
  return selectedBit.value & (1 << num);
};
const onSelectContent = (num) => {
  if (isSelectedContent(num)) {
    selectedBit.value &= ~(1 << num);
  } else {
    selectedBit.value |= 1 << num;
  }
};

const searchContents = [
  {
    id: 12,
    name: "관광지",
  },
  {
    id: 14,
    name: "문화시설",
  },
  {
    id: 15,
    name: "축제공연행사",
  },
  {
    id: 25,
    name: "여행코스",
  },
  {
    id: 28,
    name: "레포츠",
  },
  {
    id: 32,
    name: "숙박",
  },
  {
    id: 38,
    name: "쇼핑",
  },
  {
    id: 39,
    name: "음식점",
  },
];

// 검색 조건
const searchMode = ref(1);

// 씬 검색 데이터
const sceneTitles = ref([]);
const selectedTitle = ref("");
const scenes = ref([]);

onMounted(() => {
  attractionAPI.getSceneTitles(
    ({ data }) => {
      sceneTitles.value = data;
    },
    () => {
      console.log("SceneTitles 로드 실패");
    }
  );
});

const onGetScenesByTitle = () => {
  attractionAPI.searchBySceneTitle(
    selectedTitle.value,
    ({ data }) => {
      scenes.value = data;
      console.log(scenes);
    },
    () => {
      console.log("searchBySceneTitle 로드 실패");
    }
  );
};

const setSelectedTitle = (title) => {
  selectedTitle.value = title;
};
</script>

<template>
  <div class="relative h-[50rem] flex overflow-hidden">
    <naver-map
      class="flex-grow"
      :mapOptions="mapOptions"
      @onLoad="onLoadMap($event)"
    >
      <naver-marker
        v-for="scene in scenes"
        :key="scene.no"
        :latitude="scene.latitude"
        :longitude="scene.longitude"
        @onLoad="onLoadMarker($event)"
      >
      </naver-marker>
    </naver-map>

    <form
      :class="sideBarAnimation"
      class="absolute right-16 w-80 h-full transition-transform duration-500 bg-white"
      @submit.prevent="onGetScenesByTitle"
    >
      <button
        class="absolute w-7 h-12 flex justify-center items-center top-1/2 transform -translate-x-full -translate-y-1/2 bg-white rounded-l-lg"
        @click="isOpenSideBar = !isOpenSideBar"
      >
        <svg
          v-show="isOpenSideBar"
          class="w-5 h-5 fill-main-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
        >
          <path
            d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
          />
        </svg>

        <svg
          v-show="!isOpenSideBar"
          class="w-5 h-5 fill-main-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
        >
          <path
            d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
          />
        </svg>
      </button>

      <!-- 씬 검색 -->
      <div v-show="searchMode === 1" class="mb-10">
        <div class="w-64 mx-auto">
          <VSearchDropdown
            :title="'컨텐츠'"
            :items="sceneTitles"
            @selected-item="setSelectedTitle"
          />
          <!-- <VSearchDropdown
            :title="'촬영지'"
            :items="scenes.map((item) => item.title)"
          /> -->

          <div class="text-end">
            <button
              class="w-24 mt-1 px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400"
            >
              검색하기
            </button>
          </div>
        </div>
      </div>

      <!-- 일반 검색 -->
      <div v-show="searchMode === 2" class="mb-10">
        <div class="group relative w-64 my-3 mx-auto">
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

        <div class="w-64 mx-auto grid grid-cols-8">
          <label
            v-for="(content, index) in searchContents"
            :key="content.id"
            class="relative flex justify-center items-center w-8 h-8 cursor-pointer border-2 rounded-md"
            :class="
              isSelectedContent(index) ? 'border-main-200' : 'border-gray-200'
            "
          >
            <input
              type="checkbox"
              class="absolute w-0 h-0"
              :value="content.id"
              @click="onSelectContent(index)"
            />
            <svg
              class="w-5 h-5 fill-yellow-200"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#1C274C"
              />
              <path
                d="M8.39747 15.5534C8.64413 15.2206 9.11385 15.1508 9.44661 15.3975C10.175 15.9373 11.0541 16.25 12 16.25C12.9459 16.25 13.825 15.9373 14.5534 15.3975C14.8862 15.1508 15.3559 15.2206 15.6025 15.5534C15.8492 15.8862 15.7794 16.3559 15.4466 16.6025C14.4742 17.3233 13.285 17.75 12 17.75C10.715 17.75 9.5258 17.3233 8.55339 16.6025C8.22062 16.3559 8.15082 15.8862 8.39747 15.5534Z"
                fill="#1C274C"
              />
              <path
                d="M15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z"
                fill="#1C274C"
              />
              <path
                d="M9 12C9.55228 12 10 11.3284 10 10.5C10 9.67157 9.55228 9 9 9C8.44772 9 8 9.67157 8 10.5C8 11.3284 8.44772 12 9 12Z"
                fill="#1C274C"
              />
            </svg>
          </label>
        </div>
      </div>

      <div class="w-72 h-full mx-auto overflow-scroll">
        <table class="w-full text-center">
          <thead class="bg-gray-100">
            <tr>
              <th scope="col" class="p-2">분류</th>
              <th scope="col" class="p-2">장소명</th>
              <th scope="col" class="p-2">위치</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="scene in scenes"
              :key="scene.no"
              class="bg-white border-b hover:bg-gray-200"
            >
              <td class="p-2">{{ scene.contentTypeID }}</td>
              <td class="p-2">{{ scene.title }}</td>
              <td class="p-2">{{ scene.address }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>

    <!-- 사이드 바 -->
    <div
      class="flex flex-col items-center absolute right-0 w-16 h-full pt-5 bg-white border-l border-gray-200"
    >
      <div class="flex flex-col items-center mb-5 group">
        <button @click="searchMode = 1">
          <svg
            class="w-7 h-7 mb-1 group-hover:fill-main-300"
            :class="searchMode == 1 ? 'fill-main-300' : 'fill-gray-300'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M48 208l416 0 0 208c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-208zm352-48l-64 0 80-80 32 0c8.8 0 16 7.2 16 16l-64 64zM320 80l-80 80-64 0 80-80 64 0zM160 80L80 160l-32 0 0-32L96 80l64 0zm352 80l0-64c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96l0 64 0 24 0 24L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208 0-24 0-24z"
            />
          </svg>

          <p
            class="text-xs group-hover:text-main-300"
            :class="searchMode == 1 ? 'text-main-300' : 'text-gray-300'"
          >
            씬 검색
          </p>
        </button>
      </div>

      <div class="flex flex-col items-center mb-5 group">
        <button @click="searchMode = 2">
          <svg
            class="w-7 h-7 mb-1 group-hover:fill-main-300"
            :class="searchMode == 2 ? 'fill-main-300' : 'fill-gray-300'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM288 176c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 48.8 46.5 111.6 68.6 138.6c6 7.3 16.8 7.3 22.7 0c22.1-27 68.6-89.8 68.6-138.6zm-112 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
            />
          </svg>

          <p
            class="text-xs group-hover:text-main-300"
            :class="searchMode == 2 ? 'text-main-300' : 'text-gray-300'"
          >
            일반 검색
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
