<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

// 현재 스크롤 상태 관리
const scrollY = ref(0); // 스크롤 위치
const isScrollActive = computed(() => scrollY.value > 0); // 스크롤 활성 상태

// 스크롤 상태 업데이트 함수
const updateScroll = () => {
  scrollY.value = window.scrollY;
};

// 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 추가
onMounted(() => {
  window.addEventListener("scroll", updateScroll);
});

// 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener("scroll", updateScroll);
});

// 최상단으로 이동하는 함수
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <button
    v-if="isScrollActive"
    class="flex justify-center items-center fixed w-9 h-9 bottom-20 right-12 bg-white border-4 border-main-200 rounded-full hover:bg-main-200"
    @click="scrollToTop"
  >
    <svg
      class="fill-main-200 hover:fill-white w-8 h-8"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path
        d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
      />
    </svg>
  </button>
</template>

<style scoped></style>
