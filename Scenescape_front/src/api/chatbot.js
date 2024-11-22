import axios from "axios";

// 기본 API URL 설정 (필요에 따라 변경하세요)
const API_BASE_URL = "http://localhost:8080"; // 서버의 실제 URL로 변경

/**
 * 챗봇 추천 요청을 보내는 함수
 * @param {Object} params - 요청에 필요한 파라미터 객체 (예: { sceneTitle: "도깨비", region: "대전" })
 * @param {Function} success - 요청이 성공했을 때 호출되는 콜백 함수
 * @param {Function} fail - 요청이 실패했을 때 호출되는 콜백 함수
 */
export const getChatBotRecommend = (params, success, fail) => {
  const queryParams = new URLSearchParams();
  for (const key in params) {
    if (params[key]) {
      queryParams.append(key, params[key]);
    }
  }

  console.log(`GET /chats?${queryParams.toString()}`); // 요청 URL 로그 출력

  axios
    .get(`${API_BASE_URL}/chats?${queryParams.toString()}`)
    .then((response) => {
      success(response.data);
    })
    .catch((error) => {
      fail(error);
    });
};

export default {
  getChatBotRecommend,
};
