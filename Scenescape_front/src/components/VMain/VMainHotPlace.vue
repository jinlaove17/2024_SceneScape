<script setup></script>

<template>
  <div class="w-[80rem] mx-auto">
    <div class="mb-5">
      <h1 class="text-3xl">
        🔥 지금 <span class="text-rose-500">핫플레이스</span>는?
      </h1>
      <p class="text-xl text-gray-400 ps-10">
        현재 가장 인기 있는 세 곳을 추천해 드릴게요!
      </p>
    </div>

    <div class="flex justify-center items-center mb-16 p-5 overflow-hidden">
      <div
        class="min-w-80 max-w-80 rounded-lg shadow-2xl mx-8 mb-20 transition duration-200 ease-in-out hover:scale-105 border-2 border-transparent hover:border-main-200"
      >
        <a href="#">
          <img
            class="rounded-t-lg w-full object-cover"
            src="@/assets/img/Gwanganri.jpg"
            alt=""
          />
        </a>
        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
            🥇 부산 광안리 해수욕장
          </h5>
          <p class="mb-3 font-normal text-gray-700">설명을 입력하세요.</p>
          <a
            href="#"
            class="inline-flex items-end px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400 focus:ring-4 focus:outline-none focus:ring-main-100"
          >
            상세 보기
          </a>
        </div>
      </div>
      <div
        class="min-w-80 max-w-80 rounded-lg shadow-2xl mx-8 mb-20 transition duration-200 ease-in-out hover:scale-105 border-2 border-transparent hover:border-main-200"
      >
        <a href="#">
          <img
            class="rounded-t-lg w-full object-cover"
            src="@/assets/img/Hoamji.jpg"
            alt=""
          />
        </a>
        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
            🥈 충주 호암지 생태공원
          </h5>
          <p class="mb-3 font-normal text-gray-700">설명을 입력하세요.</p>
          <a
            href="#"
            class="inline-flex items-end px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400 focus:ring-4 focus:outline-none focus:ring-main-100"
          >
            상세 보기
          </a>
        </div>
      </div>
      <div
        class="min-w-80 max-w-80 rounded-lg shadow-2xl mx-8 mb-20 transition duration-200 ease-in-out hover:scale-105 border-2 border-transparent hover:border-main-200"
      >
        <a href="#">
          <img
            class="rounded-t-lg w-full object-cover"
            src="@/assets/img/Yeonudang.jpg"
            alt=""
          />
        </a>
        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
            🥉 전주 연우당
          </h5>
          <p class="mb-3 font-normal text-gray-700">설명을 입력하세요.</p>
          <a
            href="#"
            class="inline-flex items-end px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400"
          >
            상세 보기
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
