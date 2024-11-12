<script setup>
import { ref, computed } from "vue";

const carouselContents = ref([
  {
    title: "강릉 주문진",
    desc: `
    "너와 함께한 모든 시간이 눈부셨다.<br />
    날이 좋아서, 날이 좋지 않아서, 날이 적당해서.<br />
    모든 날이 좋았다."<br />
    <p class="text-end">- 드라마 <도깨비> -</p>`,
    img: "/img/Guardian.jpg",
  },
  {
    title: "경북 안동",
    desc: `
    "바다보러 갑시다.<br/ >
    귀하가 본 엄청난 바다.<br />
    한 달이 걸리는 그 바다.<br / >
    수평선 너머에도 계속 이어지는 그 바다.<br />
    그 바다에서 피어나는 해도 봅시다."<br />
    <p class="text-end">- 드라마 <미스터 션샤인> -</p>`,
    img: "/img/MrSunshine.jpg",
  },
]);

const curIndex = ref(0);
const next = () => {
  ++curIndex.value;
};
const prev = () => {
  --curIndex.value;
};
const isFirstContent = computed(() => {
  return curIndex.value === 0;
});
const isLastContent = computed(() => {
  return curIndex.value === carouselContents.value.length;
});
</script>

<template>
  <div class="relative w-[100vw] h-[30rem] overflow-hidden select-none">
    <div
      class="flex transition-transform duration-1000 h-full"
      :style="{ transform: `translateX(-${100 * curIndex}%)` }"
    >
      <div
        class="min-w-full min-h-full animate-wave bg-gradient-to-r from-main-200 from-30% via-indigo-200 via-60% to-violet-200 to-90%"
      >
        <div class="inline absolute left-36 top-28 z-10">
          <p class="text-3xl text-gray-500">당신의 여정이 영화가 되는 곳</p>
          <h1 class="text-7xl ms-24 my-4">
            SCENE SCAPE<span class="text-3xl text-gray-500">에서</span>
          </h1>
          <p class="text-3xl ms-44 text-gray-500">
            당신만의 한 장면을 담아보세요.
          </p>
        </div>
        <img
          src="/img/Seoul.jpg"
          alt="Slide image"
          class="absolute top-1/2 right-0 transform -translate-y-1/2 min-w-[45rem] max-w-[45rem] mask-gradient"
        />
      </div>

      <div
        v-for="content in carouselContents"
        :key="content.title"
        class="relative min-w-full"
      >
        <div class="inline absolute left-28 top-24 z-10">
          <p class="text-2xl text-white">이곳은 어떠세요?</p>
          <h1 class="text-5xl mt-3 mb-14">{{ content.title }} 여행</h1>
          <p class="text-lg text-gray-200 ps-4" v-html="content.desc"></p>
        </div>
        <img
          :src="content.img"
          alt="Slide image"
          class="inline object-cover w-full h-full blur-md"
        />
        <img
          :src="content.img"
          alt="Slide image"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[45rem] max-w-[45rem] mask-radial-opacity"
        />
      </div>
    </div>
    <!-- 컨트롤 버튼 -->
    <button
      @click="prev"
      type="button"
      class="absolute bottom-5 end-24 z-30 flex items-center justify-center cursor-pointer group focus:outline-none"
      data-carousel-prev
      :disabled="isFirstContent"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none"
      >
        <svg
          class="w-4 h-4 text-white rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </span>
    </button>
    <button
      @click="next"
      type="button"
      class="absolute bottom-5 end-10 z-30 flex items-center justify-center cursor-pointer group focus:outline-none"
      data-carousel-next
      :disabled="isLastContent"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none"
      >
        <svg
          class="w-4 h-4 text-white rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </span>
    </button>
  </div>
</template>

<style scoped>
.mask-gradient {
  mask-image: linear-gradient(to left, rgba(0, 0, 0, 1), transparent);
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
}

.mask-radial-opacity {
  mask-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) 80%
  );
  -webkit-mask-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) 80%
  );
  mask-repeat: no-repeat;
  mask-size: cover;
}

@keyframes wave-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-wave {
  background-size: 200% 200%;
  animation: wave-animation 10s ease-in-out infinite;
}
</style>
