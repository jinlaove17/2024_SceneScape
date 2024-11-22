<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import VHeader from "@/components/VHeader.vue";
import VFooter from "@/components/VFooter.vue";
import VChatBot from "@/components/VChatBot.vue";

// 챗봇 창의 열림/닫힘 상태를 관리하는 변수
const isChatBotOpen = ref(false);

// 챗봇 버튼 클릭 시 상태를 토글하는 함수
const toggleChatBot = () => {
  isChatBotOpen.value = !isChatBotOpen.value;
};

// 챗봇 닫기 이벤트 처리 함수
const closeChatBot = () => {
  isChatBotOpen.value = false;
};
</script>

<template>
  <div class="w-[120rem] min-h-[67.5rem] mx-auto flex flex-col relative">
    <header>
      <VHeader />
    </header>

    <main class="flex-grow">
      <RouterView />
    </main>

    <footer>
      <VFooter />
    </footer>

    <!-- 챗봇 버튼 -->
    <button
      @click="toggleChatBot"
      class="fixed bottom-20 left-12 z-50 w-9 h-9 bg-white border-4 border-main-200 rounded-full shadow-lg flex items-center justify-center hover:bg-main-200 transition-colors"
      aria-label="챗봇 열기"
    >
      💬
    </button>

    <!-- 챗봇 창 -->
    <transition name="fade">
      <div
        v-if="isChatBotOpen"
        class="fixed bottom-20 left-5 z-50 w-96 h-3/5 bg-white border rounded-lg shadow-lg overflow-hidden"
      >
        <VChatBot @close="closeChatBot" />
        <!-- 닫기 버튼 (컴포넌트 내부에서 제공) -->
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* 챗봇 창의 애니메이션 */
.fixed {
  transition: all 0.3s ease-in-out;
}
</style>
