<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

import { useUserStore } from "@/stores/user";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const { userInfo } = useUserStore();

// Props
const props = defineProps({
  author: {
    type: String,
    required: true,
  },
  comment: {
    type: Object,
    required: true,
  },
});

// Emits
const emit = defineEmits(["add-reply"]);

const isReplying = ref(false); // 대댓글 입력창 상태
const replyContent = ref(""); // 대댓글 내용

// 대댓글 입력창 열기/닫기
const onToggleReplyInput = () => {
  isReplying.value = !isReplying.value;
};

// 대댓글 작성 취소
const onCancelReply = () => {
  replyContent.value = "";
  isReplying.value = false;
};

// 대댓글 작성
const onSubmitReply = () => {
  if (replyContent.value.trim() === "") {
    alert("내용을 입력해주세요.");
    return;
  }

  // 부모 컴포넌트로 이벤트 전달
  emit("add-reply", {
    parentNo: props.comment.no,
    content: replyContent.value,
  });

  // 입력창 초기화
  replyContent.value = "";
  isReplying.value = false;
};

// 자식 댓글에서 발생한 이벤트 처리
const handleReply = (replyData) => {
  emit("add-reply", replyData); // 부모로 전달
};
</script>

<template>
  <li class="mb-2">
    <!-- 댓글 내용 -->
    <div class="p-3 mb-2 border border-gray-300 rounded-md whitespace-normal">
      <div class="flex justify-between">
        <div class="flex items-center">
          <svg
            class="w-8 h-8 mr-2 fill-gray-300"
            viewBox="-8 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
            />
          </svg>
          <div class="text-lg">
            {{ props.comment.userId }}
            <span class="text-sm text-main-400">
              {{ props.comment.userId === props.author ? "(작성자)" : "" }}
            </span>
          </div>
        </div>

        <div class="flex items-center self-start gap-3">
          <div class="text-gray-500 text-sm">
            <div class="text-gray-500 text-sm">
              {{
                props.comment.created
                  ? dayjs.utc(props.comment.created).format("YYYY-MM-DD HH:mm")
                  : "알 수 없음"
              }}
            </div>
          </div>
          <!-- <button
            class="text-sm text-gray-400"
            type="button"
            @click="onDeleteRepley"
          >
            삭제
          </button> -->
        </div>
      </div>
      <p class="text-gray-700 mt-2 pl-6 pr-8 break-words">
        {{ props.comment.content }}
      </p>

      <!-- 답글 버튼 -->
      <div class="text-end">
        <button
          class="text-sm text-blue-400 hover:underline mt-2"
          type="button"
          @click="onToggleReplyInput"
          v-if="props.comment.parentNo == null"
        >
          답글
        </button>
      </div>
    </div>

    <!-- 대댓글 입력창 -->
    <div v-if="isReplying" class="mt-2">
      <textarea
        v-model="replyContent"
        placeholder="답글을 입력하세요..."
        class="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-main-300 resize-none"
        rows="2"
      ></textarea>
      <div class="flex justify-end items-center">
        <button
          class="w-24 h-10 mx-1 text-sm font-medium text-white bg-main-400 rounded-lg hover:bg-main-500"
          type="button"
          @click="onSubmitReply"
        >
          작성하기
        </button>
        <button
          class="w-24 h-10 mx-1 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-red-500"
          type="button"
          @click="onCancelReply"
        >
          취소
        </button>
      </div>
    </div>

    <!-- 대댓글 목록 -->
    <ul class="ml-10 mt-2">
      <VCommentItem
        v-for="reply in props.comment.replies"
        :key="reply.no"
        :author="props.author"
        :comment="reply"
        @add-reply="handleReply"
      />
    </ul>
  </li>
</template>
