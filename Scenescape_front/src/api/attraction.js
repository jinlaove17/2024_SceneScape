import { localAxios } from "@/utils/http-commons";

const attractionAPI = localAxios();

const getAttractions = (success, fail) => {
  attractionAPI.get("/attractions").then(success).catch(fail);
};

const getSceneTitles = (success, fail) => {
  attractionAPI.get("/attractions/titles").then(success).catch(fail);
};

const searchBySceneTitle = (sceneTitle, success, fail) => {
  attractionAPI.get(`/attractions/${sceneTitle}`).then(success).catch(fail);
};

export default {
  getAttractions,
  getSceneTitles,
  searchBySceneTitle,
};
