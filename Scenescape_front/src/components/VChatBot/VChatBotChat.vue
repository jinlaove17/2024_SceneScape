<script setup>
import { ref, onMounted, nextTick } from "vue";

import attractionAPI from "@/api/attraction";
import chatBotAPI from "@/api/chatbot";

import { VMarkdownView } from "vue3-markdown";

// 상태 관리
const isLoading = ref(false); // 로딩 상태
const messages = ref([]); // 채팅 메시지 내역

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

// 채팅 내역 요소
const chatHistory = ref(null);

onMounted(() => {
  console.log("오남운트");

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
        content: "죄송합니다. 컨텐츠 목록을 로드하는 데 실패했습니다.",
      });
    }
  );

  // 초기 인사 메시지 추가
  addMessage("bot", {
    type: "text",
    content:
      "안녕하세요! SceneScape 챗 봇입니다. 아래 컨텐츠 중 흥미로운 컨텐츠가 있나요?",
  });
});

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
const sendRecommendation = async (sceneTitle, region) => {
  try {
    isLoading.value = true;
    addMessage("bot", {
      type: "text",
      content: "추천 장소를 가져오는 중입니다...",
    });

    await chatBotAPI.getChatBotRecommend(
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
  } catch (error) {
    console.error("추천 장소를 가져오는 중 오류 발생:", error);
    addMessage("bot", {
      type: "text",
      content: "죄송합니다. 추천 장소를 가져오는데 실패했습니다. T.T",
    });
  } finally {
    isLoading.value = false;
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
        type: "text",
        content: "이 중 떠나고 싶은 지역이 있으신가요?",
      });
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

// 대화 초기화 함수
const resetChat = () => {
  messages.value = [];
  addMessage("bot", {
    type: "text",
    content:
      "안녕하세요! SceneScape 챗 봇입니다. 아래 컨텐츠 중 흥미로운 컨텐츠가 있나요?",
  });
  fetchRandomDramas();
};

const mode = ref("light");
</script>

<template>
  <div
    class="flex flex-col fixed w-96 h-[36rem] z-30 bottom-10 right-24 bg-white border rounded-xl shadow-lg whitespace-normal"
  >
    <div class="relative">
      <div class="absolute top-2 left-2 select-none">
        <div><span class="text-main-300">S</span>CENE</div>
        <div class="leading-3"><span class="text-main-300">S</span>CAPE</div>
      </div>

      <h1 class="text-center text-2xl bg-gray-200 rounded-t-lg py-3">
        챗 봇과의 대화
      </h1>

      <button class="absolute top-4 right-3" @click="resetChat">
        <svg
          class="w-6 h-6 fill-main-300 hover:fill-main-400"
          viewBox="0 0 1920 1920"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
            fill-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <div
      class="flex flex-col flex-grow overflow-y-auto py-2 px-4"
      ref="chatHistory"
    >
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="p-3"
        :class="[
          'message',
          message.sender === 'bot' ? 'self-start' : 'text-end self-end',
        ]"
      >
        <div v-if="message.sender === 'bot'" class="flex items-center">
          <div
            class="flex w-8 h-8 justify-center items-center bg-white rounded-full p-1 m-1 border-2 border-main-200"
          >
            <svg
              class="w-full h-full fill-white stroke-main-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <circle cx="12" cy="5" r="2" />
              <path d="M12 7v4" />
              <line x1="8" y1="16" x2="8" y2="16" />
              <line x1="16" y1="16" x2="16" y2="16" />
            </svg>
          </div>

          <div class="text-lg">{{ message.sender }}</div>
        </div>

        <div class="p-2 bg-gray-100 rounded-xl">
          <div v-if="message.type === 'text'">
            <VMarkdownView :mode="mode" :content="message.content" />
          </div>
          <div v-else-if="message.type === 'options'">
            <button
              v-for="option in message.options"
              :key="option"
              class="h-10 p-2 m-1 bg-main-300 text-white text-sm rounded-lg hover:bg-main-400"
              @click="handleOptionClick(option)"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="loading">로딩 중...</div>
    </div>
  </div>
</template>

<style scoped>
.markdown-body {
  background-color: RGB(243, 244, 246);
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
