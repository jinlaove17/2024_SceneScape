<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { useBoardStore } from "@/stores/board";

const userStore = useUserStore();
const { logoutUser } = userStore;
const { userInfo } = storeToRefs(userStore);

// 게시판 내의 이동이 아니라면, 검색 조건 초기화
const boardStore = useBoardStore();

const isHoveredNav = ref(false);

const onLogout = () => {
  logoutUser(
    () => {
      alert("로그아웃 되었습니다.");
    },
    () => {
      console.log("로그아웃 실패!");
    }
  );

  boardStore.resetSearchFilter();
};
</script>

<template>
  <nav
    class="w-[80rem] mx-auto flex items-center"
    @mouseleave="isHoveredNav = false"
  >
    <div class="text-2xl flex-grow-0 me-5">
      <RouterLink
        :to="{ name: 'main' }"
        class="select-none"
        @click="boardStore.resetSearchFilter"
      >
        <div>
          <span class="text-main-300">S</span>CENE
          <br />
          <span class="text-main-300">S</span>CAPE
        </div>
      </RouterLink>
    </div>

    <div class="flex flex-col flex-grow">
      <div
        v-if="userInfo.nickname === ''"
        class="text-sm text-end border-b-2 border-gray-200 py-3"
      >
        <RouterLink
          :to="{ name: 'login' }"
          class="text-gray-500 hover:text-gray-700 mx-3"
          @click="boardStore.resetSearchFilter"
        >
          로그인
        </RouterLink>
        <RouterLink
          :to="{ name: 'signup' }"
          class="text-gray-500 hover:text-gray-700 mx-3"
          @click="boardStore.resetSearchFilter"
        >
          회원가입
        </RouterLink>
      </div>
      <div v-else class="text-sm text-end border-b-2 border-gray-200 py-3">
        <span class="mx-3">{{ userInfo.nickname }}님 환영합니다.</span>
        <RouterLink
          :to="{ name: 'mypage' }"
          class="text-gray-500 hover:text-gray-700 mx-3"
          @click="boardStore.resetSearchFilter"
        >
          마이페이지
        </RouterLink>
        <span
          class="text-gray-500 hover:text-gray-700 mx-3 cursor-pointer"
          @click="onLogout"
        >
          로그아웃
        </span>
      </div>

      <div class="relative py-3">
        <p
          class="inline-block w-36 text-center text-lg font-bold border-b-2 border-transparent hover:border-main-300 select-none"
          @mouseenter="isHoveredNav = true"
        >
          나의 여행
        </p>
        <p
          class="inline-block w-36 text-center text-lg font-bold border-b-2 border-transparent hover:border-main-300 select-none"
          @mouseenter="isHoveredNav = true"
        >
          게시판
        </p>
        <p
          class="inline-block w-36 text-center text-lg font-bold border-b-2 border-transparent hover:border-main-300 select-none"
          @mouseenter="isHoveredNav = true"
        >
          고객센터
        </p>
        <div
          class="flex absolute bg-white w-full z-30 shadow-md overflow-hidden transition-all duration-300"
          :class="isHoveredNav ? 'h-40' : 'h-0'"
        >
          <div class="flex flex-col items-center w-36">
            <RouterLink
              :to="{ name: 'search' }"
              class="text-gray-600 hover:text-main-400 text-md pt-3"
              @click="boardStore.resetSearchFilter"
            >
              여행 플래너
            </RouterLink>
          </div>
          <div class="flex flex-col items-center w-36">
            <RouterLink
              :to="{ name: 'board' }"
              class="text-gray-600 hover:text-main-400 text-md pt-3"
            >
              씬 공유 게시판
            </RouterLink>
          </div>
          <div class="flex flex-col items-center w-36">
            <a class="text-gray-600 hover:text-main-400 text-md pt-3" href="#">
              개발자 커피 사주기
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
