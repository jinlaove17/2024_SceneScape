<script setup>
import { ref, computed, onMounted } from "vue";

import tripAPI from "@/api/trip";

onMounted(() => {
  tripAPI.getTrips(
    ({ data }) => {
      planList.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
});

// 에밋 관련
defineEmits(["goForm"]);

// 계획 관련
const planList = ref([]);
const isPlanExist = computed(() => planList.value.length > 0);

const onDeletePlan = (index) => {
  tripAPI.deleteTrip(
    planList.value[index].no,
    () => {
      planList.value.splice(index, 1);
      alert("해당 계획이 삭제되었습니다.");
    },
    (error) => {
      console.log("해당 계획을 삭제하지 못했습니다.", error);
    }
  );
};
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex justify-between items-center mx-5 mt-5 mb-3 bg-white">
      <div>
        <h1 class="text-2xl">나의 여행 계획</h1>
        <p class="text-gray-400">어떤 곳으로 떠나볼까요?</p>
      </div>

      <div
        class="flex flex-col items-center cursor-pointer group"
        @click="$emit('goForm')"
      >
        <svg
          class="w-10 h-10 fill-main-200 group-hover:fill-main-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M512 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l128 0c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8l160 0c35.3 0 64 28.7 64 64l0 256zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64 64 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-64 0 0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 64-64 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0 0 64z"
          />
        </svg>
        <p class="text-xs text-main-300 group-hover:text-main-500">
          새 계획 추가
        </p>
      </div>
    </div>

    <div
      class="flex flex-col w-full flex-grow items-center overflow-y-auto bg-gray-50"
      :class="isPlanExist ? '' : 'justify-center'"
    >
      <div v-if="isPlanExist" class="flex flex-col items-center py-3">
        <div
          v-for="(plan, index) in planList"
          :key="plan.no"
          class="w-80 h-28 mx-auto text-sm bg-white border border-gray-200 rounded-lg drop-shadow-lg p-3 my-2 hover:border-main-300 hover:scale-[1.02] transform duration-200 ease-in-out"
        >
          <div class="flex justify-center h-full">
            <div
              class="flex flex-col justify-between flex-grow overflow-hidden"
            >
              <div>
                <p class="text-lg truncate">
                  {{ index + 1 }}. {{ plan.title }}
                </p>
                <p class="text-gray-500 truncate">{{ plan.description }}</p>
              </div>

              <div
                class="flex justify-between items-center text-end mr-3 text-xs text-gray-500"
              >
                <p class="text-main-300">
                  {{ plan.attractions.length }}개의 씬
                </p>
                <p>
                  시작일: {{ plan.startDate }} &nbsp; 종료일: {{ plan.endDate }}
                </p>
              </div>
            </div>

            <div class="flex flex-col gap-4 justify-center items-center">
              <svg
                class="w-5 h-5 fill-main-200 cursor-pointer hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                @click="$emit('goForm', plan)"
              >
                <path
                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
                />
              </svg>

              <svg
                class="w-5 h-5 fill-gray-300 cursor-pointer hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                @click="onDeletePlan(index)"
              >
                <path
                  d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-300">등록된 계획이 없습니다.</div>
    </div>
  </div>
</template>

<style scoped></style>
