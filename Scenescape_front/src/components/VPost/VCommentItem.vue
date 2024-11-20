<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

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


  console.log("Reply Data:", { parentNo: props.comment.no, content: replyContent.value });

  // 부모 컴포넌트로 이벤트 전달
  emit("add-reply", { parentNo: props.comment.no, content: replyContent.value });

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
  <li class="mb-4">
    <!-- 댓글 내용 -->
    <div class="p-4 border border-gray-300 rounded-md">
      <div class="flex justify-between">
        <span class="text-teal-700 font-semibold">{{ props.comment.userId }}</span>
        <span class="text-gray-500 text-sm">
          {{ props.comment.created 
          ? (() => {
              const date = new Date(props.comment.created);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const hours = String(date.getHours()).padStart(2, '0');
              const minutes = String(date.getMinutes()).padStart(2, '0');
              // 시간 출력 형식 지정
              return `${year}-${month}-${day} ${hours}:${minutes}`;
            })()
          : "알 수 없음" }} 
        </span>
      </div>
      <p class="mt-2">{{ props.comment.content }}</p>
      
      <!-- 답글 버튼 -->
      <button
        class="text-blue-500 hover:underline mt-2"
        @click="toggleReplyInput"
        v-if="props.comment.parentNo == null"
      >
        답글
      </button>
    </div>



    <!-- 대댓글 입력창 -->
    <div v-if="isReplying" class="mt-2">
      <textarea
        v-model="replyContent"
        placeholder="답글을 입력하세요..."
        class="w-full border border-gray-300 p-2 rounded"
        rows="2"
      ></textarea>
      <div class="flex space-x-2 mt-2">
        <button
          class="bg-teal-500 text-white px-4 py-2 rounded"
          @click="submitReply"
        >
          답글 작성
        </button>
        <button
          class="bg-gray-500 text-white px-4 py-2 rounded"
          @click="cancelReply"
        >
          취소
        </button>
      </div>
    </div>

    <!-- 대댓글 목록 -->
    <ul class="ml-6 mt-2">
      <VCommentItem
        v-for="reply in props.comment.replies"
        :key="reply.no"
        :comment="reply"
        @add-reply="handleReply"
      />
    </ul>
  </li>
</template>