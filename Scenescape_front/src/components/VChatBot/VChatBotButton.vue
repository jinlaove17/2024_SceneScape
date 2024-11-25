<script setup>
import { ref } from "vue";
import VChatBotChat from "./VChatBotChat.vue";

// 챗봇 창의 열림/닫힘 상태를 관리하는 변수
const isOpen = ref(false);

// 챗봇 버튼 클릭 시 상태를 토글하는 함수
const toggleChatBot = () => {
  isOpen.value = !isOpen.value;
};

// 챗봇 닫기 이벤트 처리 함수
const closeChatBot = () => {
  isOpen.value = false;
};
</script>

<template>
  <div>
    <!-- 챗 봇 버튼 -->
    <button
      @click="toggleChatBot"
      class="fixed bottom-8 right-12 z-50 w-9 h-9 bg-white border-4 border-main-200 rounded-full shadow-lg flex items-center justify-center hover:bg-main-200 transition-colors fill-white stroke-main-200 hover:fill-main-200 hover:stroke-white"
    >
      <svg
        class="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8" y2="16" />
        <line x1="16" y1="16" x2="16" y2="16" />
      </svg>
    </button>

    <!-- 챗 봇 창 -->
    <transition name="fade">
      <VChatBotChat v-show="isOpen" @close="closeChatBot" />
    </transition>
  </div>
</template>

<style scoped></style>
