<template>
  <li class="mb-4">
    <!-- 댓글 내용 -->
    <div class="p-4 border border-gray-300 rounded-md">
      <div class="flex justify-between">
        <span class="text-teal-700 font-semibold">{{ comment.userId }}</span>
        <span class="text-gray-500 text-sm">
          {{ comment.created ? comment.created.substr(0, 10) : "알 수 없음" }}
        </span>
      </div>
      <p class="mt-2">{{ comment.content }}</p>
    </div>

    <!-- 대댓글 목록 -->
    <ul class="ml-6 mt-2">
      <VCommentItem
        v-for="reply in comment.replies"
        :key="reply.no"
        :comment="reply"
      />
    </ul>
  </li>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>
