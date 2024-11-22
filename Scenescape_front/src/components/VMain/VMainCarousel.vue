<script setup>
import { ref, computed } from "vue";
import imageLoader from "@/utils/imageLoader";

const carouselContents = ref([
  {
    title: "강릉 주문진",
    desc: `
    "너와 함께한 모든 시간이 눈부셨다.<br />
    날이 좋아서, 날이 좋지 않아서, 날이 적당해서.<br />
    모든 날이 좋았다."<br />
    <p class="text-end">- 드라마 <도깨비> -</p>`,
    img: "Guardian.jpg",
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
    img: "MrSunshine.jpg",
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
  <div class="relative h-[30rem] mx-auto mb-12 overflow-hidden select-none">
    <div
      class="h-full flex transition-transform duration-1000"
      :style="{ transform: `translateX(-${100 * curIndex}%)` }"
    >
      <div class="relative min-w-full overflow-hidden">
        <img
          src="@/assets/img/Traveller.jpg"
          class="w-full h-full object-cover blur-md animate-zoom"
        />
        <img
          src="@/assets/img/Traveller.jpg"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[45rem] max-w-[45rem] mask-radial-opacity"
        />

        <div class="w-max">
          <h1
            class="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-black pr-5 text-5xl font-bold"
          >
            Hello World
          </h1>
        </div>

        <div
          class="absolute top-24 left-1/2 transform -translate-x-1/2 z-10 w-max"
        >
          <h1
            class="text-3xl text-black animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-black px-14"
          >
            당신의 여정이 영화가 되는 곳&nbsp;
            <span class="text-5xl text-white">SCENE SCAPE&nbsp;</span>에서
            당신만의 한 장면을 담아보세요.
          </h1>
        </div>
      </div>

      <div
        v-for="content in carouselContents"
        :key="content.title"
        class="relative min-w-full overflow-hidden"
      >
        <img
          :src="imageLoader.getImageUrl(content.img)"
          class="w-full h-full object-cover blur-md animate-zoom"
        />
        <img
          :src="imageLoader.getImageUrl(content.img)"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[45rem] max-w-[45rem] mask-radial-opacity"
        />
        <div class="absolute left-32 top-24">
          <p class="text-2xl text-white">이곳은 어떠세요?</p>
          <h1 class="text-5xl mt-3 mb-14">{{ content.title }} 여행</h1>
          <p class="text-lg text-gray-300 ps-4" v-html="content.desc"></p>
        </div>
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
.mask-radial-opacity {
  mask-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 45%,
    rgba(0, 0, 0, 0) 75%
  );
  -webkit-mask-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 45%,
    rgba(0, 0, 0, 0) 75%
  );
  mask-repeat: no-repeat;
  mask-size: cover;
}

@keyframes zoom-in-out {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.animate-zoom {
  animation: zoom-in-out 20s ease-in-out infinite;
}
</style>
