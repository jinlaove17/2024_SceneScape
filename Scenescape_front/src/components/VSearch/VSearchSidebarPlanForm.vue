<script setup>
import { onMounted, ref } from "vue";

import tripAPI from "@/api/trip";
import imageLoader from "@/utils/imageLoader";

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
      },
      (error) => {
        console.log("계획을 불러오지 못했습니다.", error);
      }
    );
  }
});

const planParams = ref({});

const includedAttractions = ref([]);
const insertAttractionToPlan = (attraction) => {
  if (attraction) {
    includedAttractions.value.push(attraction);
  }
};
const removeAttractionFromPlan = (index) => {
  includedAttractions.value.splice(index, 1);
};
const onReset = () => {
  planParams.value.title = "";
  planParams.value.description = "";
  planParams.value.startDate = "";
  planParams.value.endDate = "";
  planParams.value.attractions = [];
  includedAttractions.value = [];
};

const onGoList = () => {
  onReset();
  emit("goList");
};

const onCreatePlan = () => {
  planParams.value.attractions = includedAttractions.value.map(
    (attraction, index) => ({
      attractionNo: attraction.no,
      sequence: index + 1,
    })
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
    (attraction, index) => ({
      attractionNo: attraction.no,
      sequence: index + 1,
    })
  );

  tripAPI.modifyTrip(
    planParams.value,
    () => {
      alert("계획이 수정되었습니다!");
      onReset();
    },
    (error) => {
      console.log("계획을 수정하지 못했습니다.", error);
    }
  );
};

const onSwapOrder = (index, isUp) => {
  if (isUp) {
    if (index - 1 >= 0) {
      [includedAttractions.value[index - 1], includedAttractions.value[index]] =
        [
          includedAttractions.value[index],
          includedAttractions.value[index - 1],
        ];
    }
  } else {
    if (index + 1 < includedAttractions.value.length) {
      [includedAttractions.value[index + 1], includedAttractions.value[index]] =
        [
          includedAttractions.value[index],
          includedAttractions.value[index + 1],
        ];
    }
  }
};

defineExpose({
  insertAttractionToPlan,
});
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="mx-5 mt-5 mb-3">
      <h1 class="text-2xl">나의 여행 계획</h1>
      <p class="text-gray-400">멋져요, 더 좋은 계획을 만들고 계시군요!</p>
    </div>

    <div class="w-full flex flex-col">
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
      <div
        v-for="(attraction, index) in includedAttractions"
        :key="attraction.no"
        class="flex justify-center items-center w-full h-20 px-2 py-2 text-sm bg-white border-b hover:bg-gray-100"
      >
        <img
          class="w-16 h-16 mr-2 object-cover"
          :src="
            !attraction.img
              ? imageLoader.getImageUrl('Danbam.jpg')
              : attraction.img
          "
        />

        <div class="flex-grow overflow-hidden text-overflow-ellipsis">
          <p class="text-base truncate" :title="attraction.title">
            {{ attraction.title }}
          </p>
          <p class="truncate">{{ attraction.address }}</p>
          <p>TEL: {{ attraction.tel || "-" }}</p>
        </div>

        <div class="flex flex-col gap-4">
          <svg
            class="w-4 h-4 fill-gray-300 hover:scale-110 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            @click="removeAttractionFromPlan(index)"
          >
            <path
              d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
            />
          </svg>

          <div>
            <svg
              class="w-4 h-4 mb-1 fill-main-300 hover:scale-110 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              @click="onSwapOrder(index, true)"
            >
              <path
                d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm224 64c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4l-208 0c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"
              />
            </svg>

            <svg
              class="w-4 h-4 fill-main-300 hover:scale-110 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              @click="onSwapOrder(index, false)"
            >
              <path
                d="M384 432c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0zm64-16c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="text-end mr-3 mb-3">
      <div v-if="!props.plan">
        <button
          class="w-24 mt-2 mr-2 px-3 py-2 text-sm text-white bg-main-300 rounded-lg hover:bg-main-400"
          type="button"
          @click="onGoList"
        >
          목록으로
        </button>
        <button
          class="w-24 mt-2 mr-2 px-3 py-2 text-sm text-white bg-main-300 rounded-lg hover:bg-main-400"
          type="button"
          @click="onReset"
        >
          초기화
        </button>
        <button
          class="w-24 mt-2 mr-2 px-3 py-2 text-sm text-white bg-main-300 rounded-lg hover:bg-main-400"
          type="button"
          @click="onCreatePlan"
        >
          생성하기
        </button>
      </div>
      <div v-else>
        <button
          class="w-24 mt-2 mr-2 px-3 py-2 text-sm text-white bg-main-300 rounded-lg hover:bg-main-400"
          type="button"
          @click="onGoList"
        >
          목록으로
        </button>
        <button
          class="w-24 mt-2 mr-2 px-3 py-2 text-sm text-white bg-main-300 rounded-lg hover:bg-main-400"
          type="button"
          @click="onUpdatePlan"
        >
          수정하기
        </button>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <!-- <VPagenation
        v-if="isItemExist"
        :pageInfo="searchResult"
        @change-page="onChangePage"
      /> -->
  </div>
</template>

<style scoped></style>
