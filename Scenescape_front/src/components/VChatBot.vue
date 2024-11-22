<template>
  <div class="chatbot-container">
    <div class="chat-history" ref="chatHistory">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.sender]"
      >
        <div v-if="message.type === 'text'">{{ message.content }}</div>
        <div v-else-if="message.type === 'options'">
          <button
            v-for="option in message.options"
            :key="option"
            class="option-button"
            @click="handleOptionClick(option)"
          >
            {{ option }}
          </button>
        </div>
      </div>
      <div v-if="loading" class="loading">로딩 중...</div>
    </div>
    <div class="input-area">
      <!-- 리셋 버튼 추가 -->
      <button v-if="showResetButton" @click="resetChat" class="reset-button">
        대화 초기화
      </button>
    </div>

    <!-- scene scape 로고 -->
    <div class="absolute top-1 left-1">
      <div><span class="text-main-300">S</span>CENE</div>
      <div class="leading-3"><span class="text-main-300">S</span>CAPE</div>
    </div>

    <!-- 닫기 버튼 -->
    <button
      @click="emitClose"
      class="absolute top-1 right-1"
      aria-label="챗봇 닫기"
    >
      ×
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import attractionAPI from "@/api/attraction";
import chatBotAPI from "@/api/chatbot";

// 이벤트 정의
const emit = defineEmits(["close"]);

// 상태 관리
const messages = ref([]); // 채팅 메시지 내역
const loading = ref(false); // 로딩 상태

// 전체 컨텐츠 목록
const sceneTitleList = ref([]);
// 선택 가능한 지역 목록
const regions = [
  "서울",
  "경기도",
  "강원도",
  "경상도",
  "충청도",
  "전라도",
  "제주도",
];

// 참조: 채팅 내역 요소
const chatHistory = ref(null);

// 리셋 버튼 표시 여부
const showResetButton = ref(false);

// 메시지를 추가하는 함수
const addMessage = (sender, message) => {
  messages.value.push({ sender, ...message });
  scrollToBottom();
};

// 채팅 내역을 가장 아래로 스크롤하는 함수
const scrollToBottom = () => {
  nextTick(() => {
    if (chatHistory.value) {
      chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
    }
  });
};

// 랜덤으로 n개의 드라마 제목을 선택하는 함수
const getRandomDramas = (dramas, n) => {
  const shuffled = dramas.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n).map((item) => item.title);
};

// 랜덤 드라마 제목을 선택하여 옵션으로 추가하는 함수
const fetchRandomDramas = () => {
  const totalDramas = sceneTitleList.value;
  const selectedDramas = getRandomDramas(totalDramas, 10);
  addMessage("bot", {
    type: "options",
    options: selectedDramas,
  });
};

// 추천 내용을 요청하는 함수
const sendRecommendation = (sceneTitle, region) => {
  try {
    loading.value = true;
    addMessage("bot", {
      type: "text",
      content: "추천 장소를 가져오는 중입니다...",
    });

    chatBotAPI.getChatBotRecommend(
      {
        sceneTitle: sceneTitle,
        region: region,
      },
      ({ recommend }) => {
        addMessage("bot", {
          type: "text",
          content: recommend,
        });

        console.log(recommend);
      },
      (error) => {
        console.log(error);
      }
    );

    // 추천 후 리셋 버튼 표시
    showResetButton.value = true;
  } catch (error) {
    console.error("추천 내용을 가져오는 중 오류 발생:", error);
    addMessage("bot", {
      type: "text",
      content: "죄송합니다. 추천 내용을 가져오는 데 실패했습니다.",
    });
  } finally {
    loading.value = false;
  }
};

// 옵션을 클릭했을 때 처리하는 함수
const handleOptionClick = (option) => {
  const lastMessage = messages.value[messages.value.length - 1];
  if (lastMessage && lastMessage.type === "options") {
    if (lastMessage.options.length === 10) {
      // 드라마 선택 후 지역 선택 단계로 이동
      addMessage("user", { type: "text", content: option });
      addMessage("bot", {
        type: "options",
        options: regions,
      });
    } else if (regions.includes(option)) {
      // 지역 선택 후 추천 요청 단계
      addMessage("user", { type: "text", content: option });
      const selectedDrama = messages.value.find(
        (msg) => msg.sender === "user" && msg.type === "text"
      )?.content;
      if (selectedDrama) {
        sendRecommendation(selectedDrama, option);
      }
    }
  }
};

// 닫기 버튼 클릭 시 호출되는 함수
const emitClose = () => {
  emit("close");
};

// 대화 초기화 함수
const resetChat = () => {
  messages.value = [];
  showResetButton.value = false;
  addMessage("bot", {
    type: "text",
    content:
      "안녕하세요! Scene Scape 챗 봇입니다. 감명 깊게 감상한 드라마를 선택해주세요.",
  });
  fetchRandomDramas();
};

// 초기화: 컴포넌트가 마운트되면 실행
onMounted(() => {
  // 초기 인사 메시지 추가
  addMessage("bot", {
    type: "text",
    content:
      "안녕하세요! Scene Scape 챗 봇입니다. 감명 깊게 감상한 드라마를 선택해주세요.",
  });

  // 전체 드라마 제목을 로드
  attractionAPI.getSceneTitles(
    ({ data }) => {
      sceneTitleList.value = data;
      fetchRandomDramas();
    },
    () => {
      console.log("SceneTitles 로드 실패");
      addMessage("bot", {
        type: "text",
        content: "죄송합니다. 드라마 목록을 로드하는 데 실패했습니다.",
      });
    }
  );
});
</script>

<style scoped>
.chatbot-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;
}

.chat-history {
  flex: 1;
  flex-wrap: wrap;
  margin-top: 45px;
  padding: 10px;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.message {
  margin-bottom: 10px;
}

.message.bot {
  text-align: left;
}

.message.user {
  text-align: right;
}

.option-button {
  display: inline-block;
  margin: 5px 5px 0 0;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.option-button:hover {
  background-color: #0056b3;
}

.input-area {
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
}

.reset-button {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-button:hover {
  background-color: #c82333;
}

.loading {
  text-align: center;
  color: #888;
}

/* 닫기 버튼 스타일 */
.chatbot-container > button {
  position: absolute;
  top: 10px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;
}

.chatbot-container > button:hover {
  color: #555;
}
</style>
