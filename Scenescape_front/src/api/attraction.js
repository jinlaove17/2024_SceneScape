import { localAxios } from "@/utils/http-commons";

const attractionAPI = localAxios();

const getAttractions = (success, fail) => {
  attractionAPI.get("/attractions").then(success).catch(fail);
};

const getSceneTitles = (success, fail) => {
  attractionAPI.get("/attractions/titles").then(success).catch(fail);
};

const searchByFilter = (filter, success, fail) => {
  const queryParams = new URLSearchParams();

  // filter 객체의 각 속성을 순회하며 쿼리 파라미터에 추가
  for (const key in filter) {
    if (
      filter[key] !== null &&
      filter[key] !== undefined &&
      filter[key] !== ""
    ) {
      if (key === "sceneTitle") {
        queryParams.append(key, encodeURIComponent(filter[key]));
      } else if (Array.isArray(filter[key])) {
        // 배열인 경우 각 요소를 개별적으로 추가
        // ex) 사용자가 관광지 구분(음식점, 관광지, 축제 등)을 여러개 선택
        filter[key].forEach((value) => {
          queryParams.append(key, value);
        });
      } else {
        queryParams.append(key, filter[key]);
      }
    }
  }
  console.log(queryParams.toString());
  attractionAPI
    .get("/attractions?" + queryParams.toString())
    .then(success)
    .catch(fail);
};

export default {
  getAttractions,
  getSceneTitles,
  searchByFilter,
};
