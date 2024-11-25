<script setup>
import { onMounted, ref, computed, inject } from "vue";
import { vDraggable } from "vue-draggable-plus";
import { useUserStore } from "@/stores/user";

import tripAPI from "@/api/trip";

import imageLoader from "@/utils/image-loader";
import areaMapper from "@/utils/areacode-mapper";

const { userInfo } = useUserStore();

const props = defineProps({
  plan: {
    type: Object,
  },
});
const emit = defineEmits(["goList"]);

onMounted(() => {
  if (props.plan) {
    tripAPI.getTrip(
      props.plan.no,
      ({ data }) => {
        planParams.value = data;
        includedAttractions.value = data.attractions;
        console.log(includedAttractions.value);
        updatePathMarkers(includedAttractions.value);
      },
      (error) => {
        console.log("계획을 불러오지 못했습니다.", error);
      }
    );
  }
});

const planParams = ref({});

const includedAttractions = ref([]);
const isAttractionExist = computed(() => includedAttractions.value.length > 0);
const insertAttractionToPlan = (attraction) => {
  if (attraction) {
    includedAttractions.value.push(attraction);
    updatePathMarkers(includedAttractions.value);
  }
};
const removeAttractionFromPlan = (index) => {
  includedAttractions.value.splice(index, 1);
  updatePathMarkers(includedAttractions.value);
};
const onReset = () => {
  planParams.value.title = "";
  planParams.value.description = "";
  planParams.value.startDate = "";
  planParams.value.endDate = "";
  planParams.value.attractions = [];

  includedAttractions.value = [];
  clearPathMarkers();
};

const onGoList = () => {
  onReset();
  emit("goList");
};

const onCreatePlan = () => {
  planParams.value.attractions = includedAttractions.value.map(
    (attraction) => attraction.no
  );

  tripAPI.createTrip(
    planParams.value,
    () => {
      alert("새로운 계획이 생성되었습니다!");
      onGoList();
    },
    (error) => {
      console.log("계획을 생성하지 못했습니다.", error);
    }
  );
};

const onUpdatePlan = () => {
  planParams.value.attractions = includedAttractions.value.map(
    (attraction) => attraction.no
  );

  tripAPI.modifyTrip(
    planParams.value,
    () => {
      alert("계획이 수정되었습니다!");
      onGoList();
    },
    (error) => {
      console.log("계획을 수정하지 못했습니다.", error);
    }
  );
};

const dragStartIndex = ref(null);

const onDragStart = (evt) => {
  dragStartIndex.value = evt.oldDraggableIndex;
  console.log("Drag started at index:", dragStartIndex.value);
};

const onDragEnd = (evt) => {
  const dragEndIndex = evt.newDraggableIndex;
  console.log("Drag ended at index:", dragEndIndex.value);

  if (
    dragStartIndex.value !== null &&
    dragEndIndex !== null &&
    dragStartIndex.value !== dragEndIndex
  ) {
    const movedItem = includedAttractions.value.splice(
      dragStartIndex.value,
      1
    )[0];
    includedAttractions.value.splice(dragEndIndex, 0, movedItem);

    // 배열 강제 재할당
    includedAttractions.value = [...includedAttractions.value];

    // 마커 업데이트
    updatePathMarkers(includedAttractions.value);
    console.log("Updated attractions:", includedAttractions.value);
  }

  dragStartIndex.value = null;
};

defineExpose({
  insertAttractionToPlan,
});

// provide 제공 함수
const panTo = inject("panTo");
const updatePathMarkers = inject("updatePathMarkers");
const clearPathMarkers = inject("clearPathMarkers");
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="mx-5 mt-5 mb-3">
      <h1 class="text-2xl">나의 여행 계획</h1>
      <p class="text-gray-400">
        {{ userInfo.nickname }}님과 어울리는 멋진 계획이에요!
      </p>
    </div>

    <div class="w-full flex flex-col p-2 bg-gray-50">
      <div class="group w-80 mx-auto mb-3">
        <div class="mb-3">
          <label for="search" class="text-sm text-gray-500"> 제목 </label>
          <input
            class="block w-full px-3 pt-3 pb-1 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-main-300"
            type="text"
            id="search"
            placeholder="이 여행의 이름을 입력하세요..."
            v-model.lazy="planParams.title"
          />
        </div>

        <div class="mb-3 flex justify-between items-center">
          <div>
            <label class="block text-sm text-gray-500" for="startDate">
              시작일
            </label>
            <input
              class="w-36 text-sm p-1 border border-gray-300 focus:outline-none focus:border-main-300 border- rounded-md"
              type="date"
              id="startDate"
              v-model.lazy="planParams.startDate"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-500" for="endDate">
              종료일
            </label>
            <input
              class="w-36 text-sm p-1 border border-gray-300 focus:outline-none focus:border-main-300 rounded-md"
              type="date"
              id="endDate"
              v-model.lazy="planParams.endDate"
            />
          </div>
        </div>

        <label class="block text-sm text-gray-500" for="overview"> 설명 </label>
        <textarea
          class="block p-2.5 w-full text-sm bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-main-300 resize-none"
          id="overview"
          rows="3"
          placeholder="이 계획에 대한 설명과 지금의 감정을 남겨보세요..."
          v-model.lazy="planParams.description"
        ></textarea>
      </div>
    </div>

    <div class="flex-grow overflow-y-auto mb-2">
      <div>
        <!-- 드래그 가능한 리스트 -->
        <div
          v-draggable:list="includedAttractions"
          @start="onDragStart"
          @end="onDragEnd"
          class="drag-container"
        >
          <div
            v-for="(attraction, index) in includedAttractions"
            :key="attraction.no"
            class="drag-item flex justify-center items-center w-full h-24 p-1 text-sm bg-white border-b hover:bg-gray-100 select-none"
          >
            <div class="text-lg basis-4 self-start text-center">
              {{ index + 1 }}
            </div>
            <!-- 이미지 -->
            <img
              class="w-20 h-20 m-1 object-cover"
              :src="
                !attraction.img
                  ? imageLoader.getImageUrl('Danbam.jpg')
                  : attraction.img
              "
            />

            <!-- 텍스트 정보 -->
            <div class="flex-grow overflow-hidden text-overflow-ellipsis">
              <div class="flex justify-between text-xs">
                <p class="text-gray-400">
                  {{ areaMapper.areaCodeToName(attraction.contentTypeId) }}
                </p>
                <p class="text-main-400 mr-1">{{ attraction.sceneTitle }}</p>
              </div>

              <p class="text-base truncate" :title="attraction.title">
                {{ attraction.title }}
              </p>
              <p class="truncate">{{ attraction.address }}</p>
              <p>TEL: {{ attraction.tel || "-" }}</p>
            </div>

            <div class="h-full flex flex-col justify-around mx-1">
              <!-- 지도 이동 버튼 -->
              <svg
                class="w-5 h-5 fill-blue-300 hover:scale-110 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                @click="panTo(attraction.latitude, attraction.longitude)"
              >
                <path
                  d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                />
              </svg>

              <!-- 삭제 버튼 -->
              <svg
                class="w-5 h-5 fill-gray-300 hover:scale-110 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                @click="removeAttractionFromPlan(index)"
              >
                <path
                  d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8-7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-14 py-5 flex justify-center items-center bg-gray-50">
      <div v-if="!props.plan">
        <button
          class="w-24 mx-1 px-3 py-2 text-sm text-white bg-main-300 rounded-lg hover:bg-main-400"
          type="button"
          @click="onGoList"
        >
          목록으로
        </button>
        <button
          class="w-24 mx-1 px-3 py-2 text-sm text-white bg-main-300 rounded-lg hover:bg-main-400"
          type="button"
          @click="onReset"
        >
          초기화
        </button>
        <button
          class="w-24 mx-1 px-3 py-2 text-sm text-white bg-main-300 rounded-lg hover:bg-main-400"
          type="button"
          @click="onCreatePlan"
        >
          생성하기
        </button>
      </div>
      <div v-else>
        <button
          class="w-24 mx-1 px-3 py-2 text-sm text-white bg-main-300 rounded-lg hover:bg-main-400"
          type="button"
          @click="onGoList"
        >
          목록으로
        </button>
        <button
          class="w-24 mx-1 px-3 py-2 text-sm text-white bg-main-300 rounded-lg hover:bg-main-400"
          type="button"
          @click="onUpdatePlan"
        >
          수정하기
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
