<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Props
const props = defineProps({
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
const toggleReplyInput = () => {
  isReplying.value = !isReplying.value;
};

// 대댓글 작성 취소
const cancelReply = () => {
  replyContent.value = "";
  isReplying.value = false;
};

// 대댓글 작성
const submitReply = () => {
  if (replyContent.value.trim() === "") {
    alert("내용을 입력해주세요.");
    return;
  }

  console.log("Reply Data:", {
    parentNo: props.comment.no,
    content: replyContent.value,
  });

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
    <div class="p-4 border border-gray-300 rounded-md whitespace-normal">
      <div class="flex justify-between">
        <span class="text-lg text-main-400">
          {{ props.comment.userId }}
        </span>
        <span class="text-gray-500 text-sm">
          {{
            props.comment.created
              ? (() => {
                  return dayjs
                    .tz(props.comment.created, "Asia/Seoul")
                    .format("YYYY-MM-DD HH:mm");
                })()
              : "알 수 없음"
          }}
        </span>
      </div>
      <p class="mt-2 break-words">{{ props.comment.content }}</p>

      <!-- 답글 버튼 -->
      <div class="text-end">
        <button
          class="text-sm text-blue-400 hover:underline mt-2"
          @click="toggleReplyInput"
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
          class="w-24 h-10 mx-1 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400"
          type="button"
          @click="submitReply"
        >
          작성하기
        </button>
        <button
          class="w-24 h-10 mx-1 text-sm font-medium text-white bg-red-300 rounded-lg hover:bg-red-400"
          type="button"
          @click="cancelReply"
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
        :comment="reply"
        @add-reply="handleReply"
      />
    </ul>
  </li>
</template>
