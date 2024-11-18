<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import boardAPI from "@/api/board";
import { VMarkdownView } from "vue3-markdown";

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const { userInfo } = storeToRefs(store);

const post = ref(null);
const comments = ref([]);
const likeStatus = ref(null);
const mode = ref("light");
const isLoading = ref(true);

onMounted(() => {
  boardAPI.getPost(
    route.params.no,
    ({ data }) => {
      post.value = data.post;
      comments.value = data.comments;
      likeStatus.value = data.likeStatus;
      isLoading.value = false;
      console.log("게시판 세부 정보 불러오기 성공!");
    },
    () => {
      isLoading.value = false;
      console.log("게시판 세부 정보 불러오기 실패!");
    }
  );
});

const onUpdatePost = () => {
  router.push({ name: "board_write", params: { no: post.value.no } });
};

const onDeletePost = () => {
  boardAPI.deletePost(
    post.value.no,
    () => {
      router.replace({ name: "board" });
      alert("게시글이 삭제 되었습니다.");
    },
    () => {
      console.log("게시판 삭제 실패!");
    }
  );
};
</script>

<template>
  <div class="w-[80rem] mx-auto">
    <h1 class="text-2xl border-b-2 border-b-black">
      사진 공유 게시판
      <span class="text-lg text-gray-400 mx-3">글 상세보기</span>
    </h1>

    <div
      class="w-[64rem] mx-auto my-5 p-3 bg-white border border-gray-200 rounded-md"
    >
      <div v-if="isLoading" class="text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-teal-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else>
        <h1 class="text-2xl border-b p-3 border-b-gray-200">
          {{ post.no }}. {{ post.title }}
        </h1>

        <div class="flex w-full px-4 py-2 justify-between items-center">
          <div class="flex">
            <svg
              class="w-8 h-8 m-2"
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 494 511.5"
            >
              <path
                fill="#D9E9F0"
                fill-rule="nonzero"
                d="M246.999 0c139.846 0 247 118.492 247 255.749 0 137.286-107.146 255.751-247 255.751C107.136 511.5 0 393.041 0 255.749 0 119.253 106.347 0 246.999 0z"
              />
              <path
                fill="#194794"
                fill-rule="nonzero"
                d="M443.262 410.755c-44.365 60.337-114.245 100.375-195.179 100.731a485.973 485.973 0 01-10.864-.202c-77.469-3.082-144.112-42.601-186.864-101.048 14.588-29.09 45.279-46.423 76.205-50.56 31.076-4.154 56.937-8.371 67.876-45.937 2.831 2.48 5.803 4.983 8.835 7.677 28.308 25.167 60.205 26.261 87.478-.041 2.24-2.168 4.433-4.208 6.53-6.193 13.959 31.067 46.917 36.552 74.708 41.926 28.807 5.565 57.181 26.462 71.275 53.647z"
              />
              <path
                fill="#D2A75F"
                fill-rule="nonzero"
                d="M297.279 315.189c7.303 16.248 19.804 25.504 34.034 31.396-48.137 35.317-114.594 33.276-164.102 3.093 14.996-8.076 22.505-19.772 27.209-35.947 2.83 2.479 5.812 4.982 8.849 7.685 28.31 25.169 60.208 26.261 87.481-.04 2.24-2.168 4.432-4.209 6.529-6.187z"
              />
              <path
                fill="#DBB26F"
                fill-rule="nonzero"
                d="M249.676 372.686c-28.788.127-57.743-7.941-82.465-23.008 14.94-8.044 22.641-19.923 27.217-35.947 2.838 2.479 5.804 4.982 8.841 7.685 14.869 13.218 30.742 19.795 46.407 19.253v32.017z"
              />
              <path
                fill="#E9BE79"
                d="M149.695 229.121c3.736-10.692 12.422-7.254 24.8-2.737-4.944-22.418.89-39.929 18.442-52.069 37.446-25.908 54.37-3.733 94.957-36.414 23.316 11.743 44.177 31.595 33.547 93.617 11.252-8.527 27.477-7.732 22.374 11.156l-6.972 19.747c-1.667 4.726-2.782 6.44-8.754 6.119-2.64-.14-5.293-1.156-7.94-2.906 2.445 29.138-11.701 38.645-29.404 55.732-27.267 26.312-59.166 25.226-87.468.048-16.578-14.745-31.301-23.7-32.035-54.014-4.3 1.317-8.362 1.557-11.912-.461-7.072-4.025-9.648-15.739-10.035-23.243-.154-3.015-.026-11.503.4-14.575z"
              />
              <path
                fill="#F2CD8C"
                d="M149.696 229.121c3.739-10.693 12.419-7.251 24.799-2.737l-.111-.534.111.061c6.452-67.735 40.082-57.55 75.178-66.2v180.957c-15.661.548-31.528-6.024-46.398-19.254-16.577-14.745-31.301-23.697-32.031-54.012-4.297 1.314-8.364 1.555-11.911-.463-10.301-5.863-11.132-27.064-9.637-37.818z"
              />
              <path
                fill="#462917"
                d="M128.296 133.328c54.61-67.481 117.552-104.183 164.815-44.153 57.919 3.041 78.011 97.546 29.434 134.416 3.891-51.331-11.304-74.352-34.8-85.921-44.719 48.763-104.421-4.43-113.25 88.238l-21.432-11.162c-2.128-26.578 4.097-72.688-24.767-81.418z"
              />
            </svg>
            <div class="flex flex-col justify-center">
              <p>작성자: {{ post.userId }}</p>
              <p class="text-gray-500 text-sm">
                작성일:
                {{ post.created ? post.created.substr(0, 10) : "알 수 없음" }}
              </p>
            </div>
          </div>

          <div
            class="flex flex-col justify-centertext-gray-800 text-sm text-end"
          >
            <span class>조회수: {{ post.viewCount }}</span>
            <span class="ms-2">좋아요: {{ post.likeCount }}</span>
          </div>
        </div>

        <VMarkdownView :mode="mode" :content="post.content"></VMarkdownView>

        <div v-show="userInfo.id === post.userId" class="text-end">
          <button
            class="w-24 h-8 mt-2 ml-2 text-sm rounded-md bg-teal-400 hover:bg-teal-500 text-white"
            type="button"
            @click="onUpdatePost"
          >
            글 수정
          </button>
          <button
            class="w-24 h-8 mt-2 ml-2 text-sm rounded-md bg-red-400 hover:bg-red-500 text-white"
            type="button"
            @click="onDeletePost"
          >
            글 삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
