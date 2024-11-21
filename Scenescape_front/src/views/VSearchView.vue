<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import { KakaoMap } from "vue3-kakao-maps";

import attractionAPI from "@/api/attraction";
import areaAPI from "@/api/area";

import VSearchDropdown from "@/components/VSearchDropdown.vue";
import VPagenation from "@/components/VPagenation.vue";

// 카카오 맵 관련
const map = ref();
const originPosition = {
  lat: 37.501286,
  lng: 127.0396029,
};
let markerInfoList = ref([]);
const markerList = computed(() => markerInfoList.value);
let markerCount = ref(0);

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
};

const updateMarkers = () => {
  const length = pageInfo.value.items.length;
  const bounds = new kakao.maps.LatLngBounds();

  markerInfoList.value = [];

  for (let i = 0; i < length; ++i) {
    markerInfoList.value.push({
      key: pageInfo.value.items[i].no,
      lat: pageInfo.value.items[i].latitude,
      lng: pageInfo.value.items[i].longitude,
    });

    bounds.extend(
      new kakao.maps.LatLng(
        markerInfoList.value[i].lat,
        markerInfoList.value[i].lng
      )
    );
  }

  // computed 객체 markerList 갱신
  markerCount.value = length;
  setBounds(bounds);
};

const clearMakers = () => {
  markerInfoList.value = [];
  markerCount.value = 0;
  panTo(originPosition.lat, originPosition.lng);
};

const setBounds = (bounds) => {
  // 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다.
  // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다.
  if (map.value) {
    map.value.setBounds(bounds);
  }
};

const panTo = (lat, lng) => {
  if (map.value) {
    // 지도 중심을 부드럽게 이동시킵니다.
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다.
    map.value.setLevel(3);
    map.value.panTo(new kakao.maps.LatLng(lat, lng));
  }
};

// 사이드바 관련
const isOpenSideBar = ref(true);
const sideBarAnimation = computed(() =>
  isOpenSideBar.value ? "translate-x-0" : "translate-x-full"
);

// 검색 관련
const searchMode = ref(1);

const isSceneSearchBarActive = ref(true);
const isNoramlSearchBarActive = ref(true);

const contentBit = 0;
const isSelectedContent = (num) => {
  return contentBit.value & (1 << num);
};
const onSelectContent = (num) => {
  if (isSelectedContent(num)) {
    contentBit.value &= ~(1 << num);
  } else {
    contentBit.value |= 1 << num;
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

const sceneTitleList = ref([]);
const selectedScene = ref({
  title: "",
});

const searchTerm = ref("");

const areaInfoList = ref([]);
const selectedArea = ref({
  areaCode: 0,
  areaName: "",
});
const selectedSubArea = ref({
  subAreaCode: 0,
  subAreaName: "",
});

const setSelectedArea = (item) => {
  selectedArea.value.areaCode = item.areaCode;
  selectedArea.value.areaName = item.areaName;
  selectedSubArea.value.subAreaCode = 0;
  selectedSubArea.value.subAreaName = "";
};

// 특정 areaName의 subAreas를 반환하는 함수
const getSubAreas = (areaName) => {
  for (let i = 0; i < areaInfoList.value.length; ++i) {
    if (areaInfoList.value[i].areaName === areaName) {
      return areaInfoList.value[i].subAreas;
    }
  }

  return [];
};

const setSelectedSubArea = (item) => {
  selectedSubArea.value.subAreaCode = item.subAreaCode;
  selectedSubArea.value.subAreaName = item.subAreaName;
};

onMounted(() => {
  attractionAPI.getSceneTitles(
    ({ data }) => {
      sceneTitleList.value = data;
    },
    () => {
      console.log("SceneTitles 로드 실패");
    }
  );

  areaAPI.getAreas(
    ({ data }) => {
      data.areas.forEach((item) => {
        const area = {
          areaCode: item.areaCode,
          areaName: item.areaName,
          subAreas: [],
        };
        for (const sub of item.subAreas) {
          area.subAreas.push(sub);
        }
        areaInfoList.value.push(area);
      });
    },
    () => {
      console.log("areas 로드 실패");
    }
  );
});

const onReset = () => {
  selectedScene.value.title = "";
  pageInfo.value.totalCount = 0;
  pageInfo.value.curPage = 1;
  pageInfo.value.curPageCount = 0;
  pageInfo.value.items = [];
  clearMakers();
};

const onSearchByScene = () => {
  if (!selectedScene.value.title) {
    return;
  }

  attractionAPI.searchByFilter(
    { sceneTitle: selectedScene.value.title },
    ({ data }) => {
      pageInfo.value = data;
      updateMarkers();
    },
    (error) => {
      console.log(error);
    }
  );
};

const onSearchByNormal = () => {
  let contents = [];

  for (let i = 0; i < searchContents.length; ++i) {
    if (contentBit & (1 << i)) {
      contents.push(searchContents[i]);
    }
  }
  console.log(
    selectedArea.value.areaCode,
    selectedSubArea.value.subAreaCode,
    contents
  );

  attractionAPI.searchByFilter(
    {
      area: selectedArea.value.areaCode,
      subArea: selectedSubArea.value.subAreaCode,
      contents: contents,
    },
    ({ data }) => {
      pageInfo.value = data;
      updateMarkers();
    },
    (error) => {
      console.log(error);
    }
  );
};

const setSelectedTitle = (item) => {
  selectedScene.value.title = item.title;
};

// 페이지네이션 관련
const pageInfo = ref({
  totalCount: 0,
  page: 1,
  items: [],
});

const onChangePage = (page) => {
  attractionAPI.searchByFilter(
    { sceneTitle: selectedScene.value.title, page },
    ({ data }) => {
      pageInfo.value = data;
      updateMarkers();
    },
    (error) => {
      console.log(error);
    }
  );
};
</script>

<template>
  <!-- overflow-hidden -->
  <div class="relative h-[50rem] flex">
    <KakaoMap
      class="z-0"
      :width="1920"
      :height="800"
      :lat="originPosition.lat"
      :lng="originPosition.lng"
      :draggable="true"
      :markerList="markerList"
      @onLoadKakaoMap="onLoadKakaoMap"
    >
    </KakaoMap>

    <form
      :class="sideBarAnimation"
      class="absolute w-96 h-full right-16 transition-transform duration-500 bg-white border border-l-gray-100"
      @submit.prevent
    >
      <button
        class="absolute w-7 h-12 flex justify-center items-center top-1/2 transform -translate-x-full -translate-y-1/2 bg-white rounded-l-lg drop-shadow-lg"
        type="button"
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

      <div
        class="w-full h-full pb-3 flex flex-col items-center overflow-hidden"
      >
        <!-- 씬 검색 -->
        <div v-show="searchMode === 1" class="relative w-full pb-2">
          <div
            class="absolute w-96 bg-gray-50 drop-shadow-md transition-all duration-300 rounded-b-xl"
            :class="
              isSceneSearchBarActive ? 'translate-y-0' : '-translate-y-full'
            "
          >
            <div class="w-80 mx-auto">
              <VSearchDropdown
                :header="'컨텐츠 검색'"
                :items="sceneTitleList"
                :selected-item="selectedScene"
                :use-property="'title'"
                @change-selection="setSelectedTitle"
              />

              <div class="text-center mb-3 mx-auto">
                <button
                  class="w-24 mt-1 mr-2 px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400"
                  type="button"
                  @click="onReset"
                >
                  초기화
                </button>

                <button
                  class="w-24 mt-1 px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400"
                  @click="onSearchByScene"
                >
                  검색하기
                </button>
              </div>
            </div>

            <button
              class="absolute flex justify-center items-center w-12 h-5 transform left-1/2 -translate-x-1/2 rounded-b-md bg-white drop-shadow-md text-center cursor-pointer"
              type="button"
              @click="isSceneSearchBarActive = !isSceneSearchBarActive"
            >
              <svg
                v-show="!isSceneSearchBarActive"
                class="w-5 h-5 fill-main-300 mb-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
                />
              </svg>

              <svg
                v-show="isSceneSearchBarActive"
                class="w-5 h-5 fill-main-300 mt-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- 일반 검색 -->
        <div
          v-show="searchMode === 2"
          class="relative w-full pb-2 border-gray-200"
        >
          <div
            class="absolute w-96 bg-gray-50 drop-shadow-md transition-all duration-300 rounded-b-xl"
            :class="
              isSceneSearchBarActive ? 'translate-y-0' : '-translate-y-full'
            "
          >
            <div class="group relative w-80 mx-auto my-3">
              <label for="search" class="block text-sm text-gray-500">
                검색하기
              </label>
              <input
                class="block w-full px-10 pt-3 pb-1 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-main-300 peer"
                type="text"
                id="search"
                placeholder="당신만의 씬을 검색해보세요..."
                v-model.lazy="searchTerm"
              />
              <svg
                class="absolute left-3 top-8 w-5 h-5 fill-gray-300 peer-focus-within:fill-main-300"
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
                :header="'지역'"
                :items="areaInfoList"
                :selected-item="selectedArea"
                :use-property="'areaName'"
                @change-selection="setSelectedArea"
              />
              <VSearchDropdown
                :header="'세부 지역'"
                :items="getSubAreas(selectedArea.areaName)"
                :selected-item="selectedSubArea"
                :use-property="'subAreaName'"
                @change-selection="setSelectedSubArea"
              />
            </div>

            <div class="w-80 mx-auto mb-3 flex flex-col">
              <p class="text-sm text-gray-500">분류</p>
              <div class="w-80 mx-auto grid grid-cols-8">
                <label
                  v-for="(content, index) in searchContents"
                  :key="content.id"
                  class="relative flex justify-center items-center w-8 h-8 cursor-pointer border-2 rounded-md"
                  :class="
                    isSelectedContent(index)
                      ? 'border-main-200'
                      : 'border-gray-200'
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

            <div class="text-center mb-3">
              <button
                class="w-24 mt-2 mr-2 px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400"
                type="button"
                @click="onReset"
              >
                초기화
              </button>

              <button
                class="w-24 mt-1 px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400"
                @click="onSearchByNormal"
              >
                검색하기
              </button>
            </div>
            <button
              class="absolute flex justify-center items-center w-12 h-5 transform left-1/2 -translate-x-1/2 rounded-b-md bg-white drop-shadow-md text-center cursor-pointer"
              type="button"
              @click="isSceneSearchBarActive = !isSceneSearchBarActive"
            >
              <svg
                v-show="!isSceneSearchBarActive"
                class="w-5 h-5 fill-main-300 mb-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
                />
              </svg>

              <svg
                v-show="isSceneSearchBarActive"
                class="w-5 h-5 fill-main-300 mt-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          class="flex flex-col items-center w-96 flex-grow text-sm mt-2"
          :class="pageInfo.items.length > 0 ? '' : 'justify-center text-center'"
        >
          <template v-if="pageInfo.items.length > 0">
            <div
              v-for="item in pageInfo.items"
              :key="item.no"
              class="grid grid-cols-[auto_1fr] gap-2 w-full h-[120px] px-2 py-2 bg-white border-b hover:bg-gray-100 cursor-pointer"
              @click="panTo(item.latitude, item.longitude)"
            >
              <div>
                <img
                  class="w-28 h-28 object-cover"
                  src="@/assets/img/Danbam.jpg"
                />
              </div>
              <div class="overflow-hidden text-overflow-ellipsis">
                <p class="mb-1 text-base">{{ item.title }}</p>
                <p class="truncate">{{ item.address }}</p>
                <p>분류: {{ item.contentTypeID }}</p>
                <p>전화번호: {{ item.tel }}</p>
                <p class="truncate">{{ item.overview }}</p>
              </div>
            </div>
          </template>
          <div v-else class="text-base text-gray-300">
            검색 결과가 없습니다.
          </div>
        </div>

        <VPagenation
          v-if="pageInfo.items.length > 0"
          :pageInfo="pageInfo"
          @change-page="onChangePage"
        />
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
