import { localAxios } from "@/utils/http-commons";

const areaAPI = localAxios();

const getAreas = (success, fail) => {
  areaAPI.get("/areas").then(success).catch(fail);
};

export default {
  getAreas,
};
