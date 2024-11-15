<script setup>
import { ref, onMounted } from "vue";

// 데이터 상태 관리
const posts = ref([]);

// 서버에서 데이터를 가져와 posts에 저장하는 함수
const fetchPosts = async () => {
  try {
    const response = await fetch("http://localhost:8080/board/posts.do");
    const data = await response.json();
    posts.value = data.results;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
};

// 컴포넌트가 마운트될 때 데이터 가져오기
onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <div>
    <h1 class="text-3xl text-center">이곳은 사진 게시판 페이지입니다.</h1>
    
    <!-- 게시글 등록 버튼 -->
    <a href="postTest.html" class="post-button">게시글 등록</a>

    <!-- 카드 컨테이너 -->
    <div class="card-container">
      <!-- 포스트 반복 렌더링 -->
      <div v-for="post in posts" :key="post.no" class="card">
        <a :href="`http://localhost:8080/board/post.do?postNo=${post.no}`" style="text-decoration: none; color: black;">
          <!-- 이미지 -->
          <img :src="post.thumbnailUrl" :alt="post.title" />
          
          <!-- 카드 내용 -->
          <div class="card-content">
            <!-- 제목 -->
            <h3 class="card-title">{{ post.title }}</h3>
            <!-- 작성자 정보 -->
            <p class="card-info">작성자: {{ post.userId }}</p>
            <!-- 통계 정보 -->
            <div class="card-stats">
              <span>조회수: {{ post.viewCount }}</span>
              <span>좋아요: {{ post.likeCount }}</span>
              <span>싫어요: {{ post.dislikeCount }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 기본 스타일 */
body {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background-color: #f4f4f4;
}

/* 게시글 등록 버튼 스타일 */
.post-button {
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.post-button:hover {
  background-color: #45a049;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  padding: 20px;
}
.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s;
}
.card:hover {
  transform: translateY(-5px);
}
.card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.card-content {
  padding: 15px;
}
.card-title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0 5px;
}
.card-info {
  font-size: 14px;
  color: #666;
}
.card-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  font-size: 13px;
  color: #888;
}
</style>