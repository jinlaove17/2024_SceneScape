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
    if (filter[key]) {
      if (Array.isArray(filter[key])) {
        // 배열인 경우 각 요소를 개별적으로 추가
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
