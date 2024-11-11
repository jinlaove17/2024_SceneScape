<script setup>
import { ref } from "vue";

const userInfo = ref({
  id: "",
  nickname: "",
});
const isHoveredNav = ref(false);
</script>

<template>
  <header class="w-3/4 m-auto">
    <nav
      class="flex justify-center items-center"
      @mouseleave="isHoveredNav = false"
    >
      <div class="text-2xl font-bold grow-0 me-5">
        <a href="#">
          <span class="text-main-300">S</span>CENE
          <br />
          <span class="text-main-300">S</span>CAPE
        </a>
      </div>
      <div class="flex flex-col grow">
        <div
          v-show="userInfo.id === ''"
          class="text-end border-b-2 border-gray-200 py-3"
        >
          <a class="text-sm text-gray-500 hover:text-gray-700 mx-3" href="#">
            로그인
          </a>
          <a class="text-sm text-gray-500 hover:text-gray-700 mx-3" href="#">
            회원가입
          </a>
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
          <a
            class="inline-block w-36 text-center text-lg font-bold border-b-2 border-transparent hover:border-main-300"
            href="#"
            @mouseenter="isHoveredNav = true"
          >
            여행지 찾아보기
          </a>
          <a
            class="inline-block w-36 text-center text-lg font-bold border-b-2 border-transparent hover:border-main-300"
            href="#"
            @mouseenter="isHoveredNav = true"
          >
            게시판
          </a>
          <a
            class="inline-block w-36 text-center text-lg font-bold border-b-2 border-transparent hover:border-main-300"
            href="#"
            @mouseenter="isHoveredNav = true"
          >
            고객센터
          </a>
          <div
            class="flex absolute bg-white w-full z-30 shadow-md overflow-hidden transition-all duration-300"
            :class="isHoveredNav ? 'h-40' : 'h-0'"
            @mouseenter="isHoveredNav = true"
          >
            <div class="flex flex-col items-center w-36">
              <a class="text-gray-600 hover:text-main-400 text-md pt-3" href="#"
                >관광지 검색하기</a
              >
            </div>
            <div class="flex flex-col items-center w-36">
              <a class="text-gray-600 hover:text-main-400 text-md pt-3" href="#"
                >사진 게시판</a
              >
            </div>
            <div class="flex flex-col items-center w-36">
              <a class="text-gray-600 hover:text-main-400 text-md pt-3" href="#"
                >개발자 커피 사주기</a
              >
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
