<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

import boardAPI from "@/api/board";
import commentAPI from "@/api/comment";

import { VMarkdownView } from "vue3-markdown";

import VCommentItem from "@/components/VPost/VCommentItem.vue";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const post = ref(null);
const comments = ref([]);
const commentsCount = ref(0);
const likeStatus = ref(null);
const mode = ref("light");
const isLoading = ref(true);
const newComment = ref("");

onMounted(() => {
  isLoading.value = true;
  boardAPI.getPost(
    route.params.no,
    ({ data }) => {
      post.value = data.post;
      comments.value = data.comments;
      commentsCount.value = comments.value.length;
      likeStatus.value = data.likeStatus;
      isLoading.value = false;
      console.log(data);
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
      alert("게시글이 삭제 되었습니다.");
      router.replace({ name: "board" });
    },
    () => {
      console.log("게시글 삭제 실패!");
    }
  );
};

const pushLikeButton = (value) => {
  if (!userStore.userInfo.id) {
    alert("로그인 후 이용 가능합니다.");
    userStore.setRedirectPath({
      name: router.currentRoute.value.name,
      params: { no: route.params.no },
    });
    router.push({ name: "login" });
    return;
  }

  boardAPI.likePost(
    post.value.no,
    value,
    () => {
      if (value == 1) {
        post.value.likeCount++;
      }
      likeStatus.value = value;
    },
    () => {}
  );
};

const submitComment = ({ content, parentNo }) => {
  if (!userStore.userInfo.id) {
    alert("로그인 후 이용 가능합니다.");
    userStore.setRedirectPath({
      name: router.currentRoute.value.name,
      params: { no: route.params.no },
    });
    router.push({ name: "login" });
    return;
  }

  // 댓글 생성 API 호출
  commentAPI.createComment(
    {
      postNo: post.value.no,
      userId: userStore.userInfo.id,
      content: content,
      parentNo,
    },
    ({ data }) => {
      comments.value.push(data); // 새 댓글(또는 대댓글) 추가
      console.log("createComment: ");
      console.log(data);
      console.log(comments);
      commentsCount.value++;
      newComment.value = ""; // 입력 필드 초기화
      parentNo && (parentNo = null); // 대댓글이면 parentNo 초기화
      console.log("댓글 작성 성공!");
    },
    (error) => {
      console.log(error);
      alert("댓글 작성에 실패했습니다.");
    }
  );
};

const commentTree = computed(() => {
  if (!comments.value || comments.value.length === 0) {
    // comments가 없거나 빈 배열인 경우 빈 배열 반환
    return [];
  }

  const commentMap = {};
  const roots = [];

  comments.value.forEach((comment) => {
    commentMap[comment.no] = { ...comment, replies: [] };
  });

  // 대댓글을 부모 댓글에 연결
  comments.value.forEach((comment) => {
    if (comment.parentNo) {
      const parent = commentMap[comment.parentNo];
      if (parent) {
        parent.replies.push(commentMap[comment.no]);
      }
    } else {
      roots.push(commentMap[comment.no]);
    }
  });

  return roots;
});
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
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-main-600"
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
        <div class="flex flex-col justify-center">
          <p class="text-sm text-main-400" :title="post.sceneTitle">
            {{ post.sceneTitle }} > {{ post.attractionTitle }}
          </p>
          <h1 class="text-2xl border-b py-2 border-b-gray-200">
            {{ post.no }}. {{ post.title }}
          </h1>
        </div>

        <div class="flex w-full px-2 py-2 justify-between items-center">
          <div class="flex">
            <svg
              class="w-9 h-9 mt-1 mr-2 fill-gray-300"
              viewBox="-8 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
              />
            </svg>

            <div class="flex flex-col justify-center">
              <p>작성자: {{ post.userId }}</p>
              <p class="text-gray-500 text-sm">
                작성일:
                {{
                  post.created
                    ? (() => {
                        return dayjs
                          .tz(post.created, "Asia/Seoul")
                          .format("YYYY-MM-DD HH:mm");
                      })()
                    : "알 수 없음"
                }}
              </p>
            </div>
          </div>

          <div class="flex justify-center items-center gap-3">
            <div class="flex justify-center items-center gap-1">
              <svg
                class="w-4 h-4 fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                />
              </svg>
              <p class="pt-1">{{ post.viewCount }}</p>
            </div>

            <div class="flex justify-center items-center gap-1">
              <svg
                class="w-4 h-4 fill-blue-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z"
                />
              </svg>
              <p class="pt-1">{{ post.likeCount }}</p>
            </div>
          </div>
        </div>

        <VMarkdownView :mode="mode" :content="post.content" />

        <div class="flex justify-center items-center m-3">
          <!--좋아요 버튼-->
          <div class="flex flex-col items-center">
            <button
              class="w-16 h-16 m-2 rounded-2xl"
              :class="
                likeStatus === 1
                  ? 'bg-blue-300 text-white'
                  : 'bg-gray-200 text-black'
              "
              :disabled="likeStatus !== 0"
              @click="pushLikeButton(1)"
            >
              <div class="flex justify-center items-center">
                <svg
                  class="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z"
                  />
                </svg>
              </div>
            </button>
            <p class="text-sm">좋아요</p>
          </div>

          <!--싫어요 버튼-->
          <div class="flex flex-col items-center">
            <button
              class="w-16 h-16 m-2 rounded-2xl"
              :class="
                likeStatus === -1
                  ? 'bg-red-300 text-white'
                  : 'bg-gray-200 text-black'
              "
              :disabled="likeStatus !== 0"
              @click="pushLikeButton(-1)"
            >
              <div class="flex justify-center items-center">
                <svg
                  class="w-8 h-8 transform scale-y-[-1]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z"
                  />
                </svg>
              </div>
            </button>
            <p class="text-sm">싫어요</p>
          </div>
        </div>

        <div v-show="userInfo.id === post.userId" class="text-end">
          <button
            class="w-24 h-10 mx-1 text-sm rounded-md bg-main-300 hover:bg-main-400 text-white"
            type="button"
            @click="onUpdatePost"
          >
            글 수정
          </button>
          <button
            class="w-24 h-10 mx-1 text-sm rounded-md bg-red-300 hover:bg-red-400 text-white"
            type="button"
            @click="onDeletePost"
          >
            글 삭제
          </button>
        </div>

        <div>
          <div class="flex items-center gap-2">
            <svg
              class="w-4 h-4 fill-main-300 mb-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"
              />
            </svg>
            <h1 class="text-xl">댓글 ({{ commentsCount }})</h1>
          </div>

          <!-- 댓글 입력 영역 -->
          <div class="flex items-center space-x-3 mb-4">
            <textarea
              class="flex-1 p-3 border border-gray-300 rounded-md outline-none focus:border-main-300 resize-none"
              placeholder="댓글을 입력하세요..."
              rows="3"
              v-model="newComment"
            ></textarea>
            <button
              class="w-24 h-10 text-sm rounded-md bg-main-300 hover:bg-main-400 text-white"
              @click="submitComment({ content: newComment })"
              :disabled="newComment.length === 0"
            >
              작성
            </button>
          </div>

          <!-- 댓글 목록 -->
          <ul>
            <VCommentItem
              v-for="comment in commentTree"
              :key="comment.no"
              :author="post.userId"
              :comment="comment"
              @add-reply="(data) => submitComment(data)"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.markdown-body {
  white-space: wrap;
}
</style>
