<script setup>
import { ref, computed, onMounted } from "vue";

import attractionAPI from "@/api/attraction";
import areaAPI from "@/api/area";
import { useUserStore } from "@/stores/user";
import imageLoader from "@/utils/imageLoader";

import VSearchDropdown from "@/components/VSearchDropdown.vue";
import VPagenation from "@/components/VPagenation.vue";

onMounted(() => {
  attractionAPI.getSceneTitles(
    ({ data }) => {
      sceneTitleList.value = data;
    },
    () => {
      console.log("sceneTitleList 로드 실패!");
    }
  );

  areaAPI.getAreas(
    ({ data }) => {
      data.forEach((item) => {
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
      console.log(areaInfoList.value);
    },
    () => {
      console.log("areaInfoList 로드 실패!");
    }
  );
});

// 에밋 관련
const emit = defineEmits([
  "updateMarkers",
  "clearMarkers",
  "panTo",
  "insertAttractionToPlan",
]);

// 유저 관련
const { userInfo } = useUserStore();

// 애니메이션 관련
const isOpen = ref(true);
const openAnimation = computed(() =>
  isOpen.value ? "translate-x-0" : "translate-x-full"
);

// 검색 기능 관련
const CONTENT_LIST = [
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
const NUM_TO_CONT_MAPPER = new Map();
NUM_TO_CONT_MAPPER.set(12, "관광지");
NUM_TO_CONT_MAPPER.set(14, "문화시설");
NUM_TO_CONT_MAPPER.set(15, "축제공연행사");
NUM_TO_CONT_MAPPER.set(25, "여행코스");
NUM_TO_CONT_MAPPER.set(28, "레포츠");
NUM_TO_CONT_MAPPER.set(32, "숙박");
NUM_TO_CONT_MAPPER.set(38, "쇼핑");
NUM_TO_CONT_MAPPER.set(39, "음식점");

const searchMode = ref(0);

const isSceneSearchBarActive = ref(true);
const isNoramlSearchBarActive = ref(true);

const contentsBit = ref(0);
const checkContent = (num) => {
  return contentsBit.value & (1 << num);
};
const onSelectContent = (num) => {
  if (checkContent(num)) {
    contentsBit.value &= ~(1 << num);
  } else {
    contentsBit.value |= 1 << num;
  }
};
const contents = computed(() => {
  let list = [];

  for (let i = 0; i < CONTENT_LIST.length; ++i) {
    if (contentsBit.value & (1 << i)) {
      list.push(CONTENT_LIST[i].id);
    }
  }

  return list;
});

const searchTerm = ref("");

const sceneTitleList = ref([]);
const selectedScene = ref({
  title: "",
});

const setTitle = (item) => {
  selectedScene.value.title = item.title;
};

const areaInfoList = ref([]);
const selectedArea = ref({
  areaCode: 0,
  areaName: "",
});
const selectedSubArea = ref({
  subAreaCode: 0,
  subAreaName: "",
});

const setArea = (item) => {
  selectedArea.value.areaCode = item.areaCode;
  selectedArea.value.areaName = item.areaName;
  selectedSubArea.value.subAreaCode = 0;
  selectedSubArea.value.subAreaName = "";
};

const setSubArea = (item) => {
  selectedSubArea.value.subAreaCode = item.subAreaCode;
  selectedSubArea.value.subAreaName = item.subAreaName;
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

const onReset = () => {
  searchTerm.value = "";
  selectedScene.value.title = "";
  selectedArea.value.areaCode = 0;
  selectedArea.value.areaName = "";
  selectedSubArea.value.subAreaCode = 0;
  selectedSubArea.value.subAreaName = "";
  searchResult.value.totalCount = 0;
  searchResult.value.curPage = 1;
  searchResult.value.curPageCount = 0;
  searchResult.value.items = [];
  contentsBit.value = 0;
  emit("clearMarkers");
};

const onSearchByScene = () => {
  if (!selectedScene.value.title) {
    return;
  }

  attractionAPI.searchByFilter(
    { sceneTitle: selectedScene.value.title },
    ({ data }) => {
      searchResult.value = data;
      emit("updateMarkers", searchResult.value.items);
    },
    (error) => {
      console.log(error);
    }
  );
};

const onDetailSearch = () => {
  attractionAPI.searchByFilter(
    {
      searchTerm: searchTerm.value || null,
      area: selectedArea.value.areaCode || null,
      subArea: selectedSubArea.value.subAreaCode || null,
      contents: contents.value,
    },
    ({ data }) => {
      searchResult.value = data;
      console.log(data);
      emit("updateMarkers", searchResult.value.items);
    },
    (error) => {
      console.log(error);
    }
  );
};

// 검색 결과 관련
const searchResult = ref({
  totalCount: 0,
  items: [],
  likes: [],
  page: 1,
});
const isItemExist = computed(() => searchResult.value.items.length > 0);

const onChangePage = (page) => {
  switch (searchMode.value) {
    case 0: // 씬 검색
      attractionAPI.searchByFilter(
        {
          sceneTitle: selectedScene.value.title,
          page,
        },
        ({ data }) => {
          searchResult.value = data;
          emit("updateMarkers", searchResult.value.items);
        },
        (error) => {
          console.log(error);
        }
      );
      break;
    case 1: // 상세 검색
      attractionAPI.searchByFilter(
        {
          searchTerm: searchTerm.value || null,
          area: selectedArea.value.areaCode || null,
          subArea: selectedSubArea.value.subAreaCode || null,
          contents: contents.value,
          page,
        },
        ({ data }) => {
          searchResult.value = data;
          emit("updateMarkers", searchResult.value.items);
        },
        (error) => {
          console.log(error);
        }
      );
      break;
  }
};

const onUpdateLikeCount = (item) => {
  if (!userInfo.id) {
    alert("로그인 후 이용 가능합니다.");
  }

  console.log(searchResult.value);

  let idx = searchResult.value.likes.indexOf(item.no);

  if (idx != -1) {
    searchResult.value.likes.splice(idx, 1);
    --item.likeCount;
  } else {
    searchResult.value.likes.push(item.no);
    ++item.likeCount;
  }

  attractionAPI.updateLikeCount(
    item.no,
    () => {
      console.log("updateLikeCount 성공");
    },
    () => {
      console.log("updateLikeCount 실패");
    }
  );
};
</script>

<template>
  <!-- 사이드 바 -->
  <div
    class="w-16 h-[50rem] z-20 flex flex-col items-center bg-white border-l border-l-gray-200"
  >
    <button
      class="w-16 h-16 group flex flex-col justify-center items-center"
      @click="searchMode = 0"
    >
      <svg
        class="w-7 h-7 mb-1 group-hover:fill-main-300"
        :class="searchMode == 0 ? 'fill-main-300' : 'fill-gray-300'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          d="M48 208l416 0 0 208c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16l0-208zm352-48l-64 0 80-80 32 0c8.8 0 16 7.2 16 16l-64 64zM320 80l-80 80-64 0 80-80 64 0zM160 80L80 160l-32 0 0-32L96 80l64 0zm352 80l0-64c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96l0 64 0 24 0 24L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208 0-24 0-24z"
        />
      </svg>

      <p
        class="text-xs group-hover:text-main-300"
        :class="searchMode == 0 ? 'text-main-300' : 'text-gray-300'"
      >
        씬 검색
      </p>
    </button>

    <button
      class="w-16 h-16 group flex flex-col justify-center items-center"
      @click="searchMode = 1"
    >
      <svg
        class="w-7 h-7 mb-1 group-hover:fill-main-300"
        :class="searchMode == 1 ? 'fill-main-300' : 'fill-gray-300'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM288 176c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 48.8 46.5 111.6 68.6 138.6c6 7.3 16.8 7.3 22.7 0c22.1-27 68.6-89.8 68.6-138.6zm-112 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
        />
      </svg>

      <p
        class="text-xs group-hover:text-main-300"
        :class="searchMode == 1 ? 'text-main-300' : 'text-gray-300'"
      >
        상세 검색
      </p>
    </button>
  </div>

  <form
    class="absolute w-96 h-full z-10 right-16 transition-transform duration-500 bg-white border border-r-transparent border-l-gray-200"
    :class="openAnimation"
    @submit.prevent
  >
    <button
      class="absolute w-7 h-12 flex justify-center items-center top-1/2 transform -translate-x-full -translate-y-1/2 bg-white rounded-l-lg border border-r-transparent border-l-gray-200"
      type="button"
      @click="isOpen = !isOpen"
    >
      <svg
        v-show="isOpen"
        class="w-5 h-5 fill-main-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
      >
        <path
          d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
        />
      </svg>

      <svg
        v-show="!isOpen"
        class="w-5 h-5 fill-main-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
      >
        <path
          d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
        />
      </svg>
    </button>

    <div class="w-full h-full pb-3 flex flex-col items-center overflow-hidden">
      <!-- 씬 검색 -->
      <div v-show="searchMode === 0" class="relative w-full pb-2">
        <div
          class="absolute w-96 bg-gray-50 drop-shadow-md transition-all duration-300 rounded-b-xl"
          :class="
            isSceneSearchBarActive ? 'translate-y-0' : '-translate-y-full'
          "
        >
          <div class="w-80 mx-auto">
            <VSearchDropdown
              :header="'컨텐츠(영화, 드라마, 예능 등)'"
              :items="sceneTitleList"
              :selected-item="selectedScene"
              :use-property="'title'"
              @change-selection="setTitle"
            />

            <div class="text-center mb-3 mx-auto">
              <button
                class="w-24 mt-1 mr-2 px-3 py-2 text-sm text-white bg-main-300 rounded-lg hover:bg-main-400"
                type="button"
                @click="onReset"
              >
                초기화
              </button>

              <button
                class="w-24 mt-1 px-3 py-2 text-sm text-white bg-main-300 rounded-lg hover:bg-main-400"
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

      <!-- 상세 검색 -->
      <div
        v-show="searchMode === 1"
        class="relative w-full pb-2 border-gray-200"
      >
        <div
          class="absolute w-96 bg-gray-50 drop-shadow-md transition-all duration-300 rounded-b-xl"
          :class="
            isNoramlSearchBarActive ? 'translate-y-0' : '-translate-y-full'
          "
        >
          <div class="group relative w-80 mx-auto my-3">
            <label for="search" class="block text-sm text-gray-500">
              검색어
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
              @change-selection="setArea"
            />
            <VSearchDropdown
              :header="'세부 지역'"
              :items="getSubAreas(selectedArea.areaName)"
              :selected-item="selectedSubArea"
              :use-property="'subAreaName'"
              @change-selection="setSubArea"
            />
          </div>

          <div class="w-80 mx-auto mb-3 flex flex-col">
            <p class="text-sm text-gray-500">분류</p>
            <div class="w-80 mx-auto grid grid-cols-4 gap-1 place-items-center">
              <label
                v-for="(content, index) in CONTENT_LIST"
                :key="content.id"
                class="relative flex justify-center items-center w-20 h-8 pt-1 cursor-pointer border-2 rounded-md bg-white text-xs"
                :class="
                  checkContent(index)
                    ? 'border-main-200 text-main-200'
                    : 'border-gray-200 text-gray-400'
                "
              >
                <input
                  type="checkbox"
                  class="absolute w-0 h-0"
                  :value="content.id"
                  @click="onSelectContent(index)"
                />
                {{ content.name }}
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
              @click="onDetailSearch"
            >
              검색하기
            </button>
          </div>
          <button
            class="absolute flex justify-center items-center w-12 h-5 transform left-1/2 -translate-x-1/2 rounded-b-md bg-white drop-shadow-md text-center cursor-pointer"
            type="button"
            @click="isNoramlSearchBarActive = !isNoramlSearchBarActive"
          >
            <svg
              v-show="!isNoramlSearchBarActive"
              class="w-5 h-5 fill-main-300 mb-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
              />
            </svg>

            <svg
              v-show="isNoramlSearchBarActive"
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

      <!-- 관광지 목록 -->
      <div
        class="flex flex-col items-center w-96 flex-grow text-sm mt-2"
        :class="isItemExist ? '' : 'justify-center'"
      >
        <template v-if="isItemExist">
          <div
            v-for="item in searchResult.items"
            :key="item.no"
            class="flex justify-center items-center w-full h-[120px] px-2 py-2 bg-white border-b hover:bg-gray-100"
          >
            <img
              class="w-24 h-24 mr-2 object-cover"
              :src="
                !item.img ? imageLoader.getImageUrl('Danbam.jpg') : item.img
              "
            />

            <div class="flex-grow overflow-hidden text-overflow-ellipsis">
              <p class="text-xs text-gray-400">
                {{ NUM_TO_CONT_MAPPER.get(item.contentTypeId) }}
              </p>
              <p class="text-base truncate" :title="item.title">
                {{ item.title }}
              </p>
              <p class="truncate">{{ item.address }}</p>
              <p>TEL: {{ item.tel || "-" }}</p>
              <p class="truncate" :title="item.overview">
                {{ item.overview }}
              </p>
            </div>

            <div class="flex flex-col justify-center items-center">
              <div
                v-if="
                  !searchResult.likes || !searchResult.likes.includes(item.no)
                "
                class="flex flex-col justify-center items-center"
              >
                <svg
                  class="w-5 h-5 fill-gray-300 hover:scale-110 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  @click="onUpdateLikeCount(item)"
                >
                  <path
                    d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                  />
                </svg>
                <p class="text-xs text-gray-400">{{ item.likeCount }}</p>
              </div>
              <div v-else class="flex flex-col justify-center items-center">
                <svg
                  class="w-5 h-5 fill-red-300 hover:scale-110 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  @click="onUpdateLikeCount(item)"
                >
                  <path
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                  />
                </svg>

                <p class="text-xs text-red-300">{{ item.likeCount }}</p>
              </div>

              <svg
                class="w-5 h-5 mb-2 fill-blue-300 hover:scale-110 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                @click="$emit('panTo', item.latitude, item.longitude)"
              >
                <path
                  d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                />
              </svg>

              <svg
                class="w-5 h-5 mb-2 fill-violet-300 hover:scale-110 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                @click="$emit('insertAttractionToPlan', item)"
              >
                <path
                  d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256zm176 40c-13.3 0-24 10.7-24 24l0 48-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l48 0 0 48c0 13.3 10.7 24 24 24s24-10.7 24-24l0-48 48 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-48c0-13.3-10.7-24-24-24z"
                />
              </svg>
            </div>
          </div>
        </template>
        <div v-else class="text-center text-base text-gray-300">
          검색 결과가 없습니다.
        </div>
      </div>

      <!-- 페이지네이션 -->
      <VPagenation
        v-if="isItemExist"
        :pageInfo="searchResult"
        @change-page="onChangePage"
      />
    </div>
  </form>
</template>

<style scoped></style>
