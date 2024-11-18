<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import boardAPI from "@/api/board";

const router = useRouter();
const store = useUserStore();
const { userInfo } = storeToRefs(store);
const posts = ref([]);

const pickPost = (postNo) => {
  router.push({
    name: "board_detail",
    params: { no: postNo },
  });
};

const onWritePost = () => {
  if (userInfo.value.id === "") {
    alert("로그인 후 이용 가능합니다.");
    router.push({ name: "login" });
    return;
  }

  router.push({ name: "board_write" });
};

onMounted(() => {
  boardAPI.getPosts(
    ({ data }) => {
      posts.value = data.results;
      console.log("게시판 목록 불러오기 성공!");
    },
    () => {
      console.log("게시판 목록 불러오기 실패!");
    }
  );
});
</script>

<template>
  <div class="w-[80rem] mx-auto">
    <h1 class="text-2xl border-b-2 border-b-black">사진 공유 게시판</h1>

    <div class="text-end mx-5 my-2">
      <span class="cursor-pointer" @click="onWritePost">🖉 글 작성</span>
    </div>

    <div class="w-[68rem] grid grid-cols-4 gap-3 mx-auto my-5">
      <div
        class="w-64 mx-auto bg-white border-2 border-gray-200 rounded-md shadow-md border-transparent hover:cursor-pointer hover:border-teal-300 hover:scale-[1.02]"
        v-for="post in posts"
        :key="post.no"
        @click="pickPost(post.no)"
      >
        <img
          class="w-64 h-48 object-cover rounded-t-md"
          :src="post.thumbnailUrl"
        />
        <div class="p-2">
          <h1 class="text-lg">{{ post.title }}</h1>
          <p class="text-sm text-gray-800">작성자: {{ post.userId }}</p>
          <div class="flex justify-between text-gray-800 text-sm text-end">
            <p>{{ post.created ? post.created.substr(0, 10) : "" }}</p>
            <div>
              <span class="ms-2">조회수: {{ post.viewCount }}</span>
              <span class="ms-2">좋아요: {{ post.likeCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
