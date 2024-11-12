<script setup>
import { ref } from "vue";

const userInfo = ref({
  id: "",
  nickname: "",
});
const isHoveredNav = ref(false);
</script>

<template>
  <nav
    class="w-3/4 m-auto flex justify-center items-center"
    @mouseleave="isHoveredNav = false"
  >
    <div class="text-2xl font-bold grow-0 me-5">
      <RouterLink :to="{ name: 'main' }" class="select-none">
        <span class="text-main-300">S</span>CENE
        <br />
        <span class="text-main-300">S</span>CAPE
      </RouterLink>
    </div>
    <div class="flex flex-col grow">
      <div
        v-show="userInfo.id === ''"
        class="text-end border-b-2 border-gray-200 py-3"
      >
        <RouterLink
          :to="{ name: 'login' }"
          class="text-sm text-gray-500 hover:text-gray-700 mx-3"
          href="#"
        >
          로그인
        </RouterLink>
        <RouterLink
          :to="{ name: 'signup' }"
          class="text-sm text-gray-500 hover:text-gray-700 mx-3"
          href="#"
        >
          회원가입
        </RouterLink>
      </div>
      <div
        v-show="userInfo.id !== ''"
        class="text-end border-b-2 border-gray-200 py-3"
      >
        <a class="text-sm text-gray-500 hover:text-gray-700 mx-3" href="#">
          마이페이지
        </a>
        <a class="text-sm text-gray-500 hover:text-gray-700 mx-3" href="#">
          로그아웃
        </a>
      </div>

      <div class="relative py-3">
        <p
          class="inline-block w-36 text-center text-lg font-bold border-b-2 border-transparent hover:border-main-300 select-none"
          @mouseenter="isHoveredNav = true"
        >
          여행지 찾아보기
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
            >
              관광지 검색하기
            </RouterLink>
          </div>
          <div class="flex flex-col items-center w-36">
            <RouterLink
              :to="{ name: 'photoboard' }"
              class="text-gray-600 hover:text-main-400 text-md pt-3"
            >
              사진 게시판
            </RouterLink>
          </div>
          <div class="flex flex-col items-center w-36">
            <a class="text-gray-600 hover:text-main-400 text-md pt-3" href="#">
              개발자 커피 사주기</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
