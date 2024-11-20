import { useUserStore } from "@/stores/user";
import { localAxios } from "@/utils/http-commons";

const commentAPI = localAxios();

const createComment = (comment, success, fail) => {
    commentAPI.post("/comments", comment).then(success).catch(fail);
};

export default {
    createComment,
};