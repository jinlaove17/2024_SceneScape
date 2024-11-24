<script setup>
import { onMounted, ref, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import attractionAPI from "@/api/attraction";
import boardAPI from "@/api/board";

import { VMarkdownEditor } from "vue3-markdown";

const route = useRoute();
const router = useRouter();
const sceneTitleList = ref([]);
const attractionList = ref([]);
const selectedAttraction = ref(null);

const inputParams = ref({
  postNo: "",
  title: "",
  content: "",
  category: "SCENE",
  sceneTitle: "",
  thumbnailUrl: "",
  attractionNo: "",
  attractionTitle: "",
});
const editorRef = ref(null); // VMarkdownEditor DOM 요소를 참조할 ref

// 글 수정인 경우
onMounted(() => {
  if (route.params.no) {
    inputParams.value.postNo = route.params.no;
    boardAPI.getPost(
      inputParams.value.postNo,
      ({ data }) => {
        inputParams.value.title = data.result.title;
        inputParams.value.content = data.result.content;
        inputParams.value.category = data.result.category;
        inputParams.value.sceneTitle = data.result.sceneTitle;
        console.log("게시판 세부 정보 불러오기 성공!");
      },
      () => {
        console.log("게시판 세부 정보 불러오기 실패!");
      }
    );
  }
  attractionAPI.getSceneTitles(
    ({ data }) => {
      sceneTitleList.value = data;
      console.log(sceneTitleList);
    },
    () => {
      console.log("SceneTitles 로드 실패");
    }
  );
});

const getAttractionsBySceneTitle = (sceneTitle) => {
  attractionAPI.searchByFilter(
    { sceneTitle: sceneTitle, pageSize: 400 },
    ({ data }) => {
      console.log(data);
      attractionList.value = data.items;
      console.log(attractionList);
    },
    (error) => {
      console.log(error);
    }
  );
};
// watch로 SCENE 변경 감지
watch(
  () => inputParams.value.sceneTitle,
  (newSceneTitle) => {
    if (newSceneTitle) {
      getAttractionsBySceneTitle(newSceneTitle);
    } else {
      attractionList.value = []; // SCENE 선택이 초기화되면 촬영지도 초기화
    }
  }
);

// watch를 통해 inputParams 업데이트
watch(selectedAttraction, (newValue) => {
  if (newValue) {
    inputParams.value.attractionNo = newValue.attractionNo;
    inputParams.value.attractionTitle = newValue.attractionTitle;
    console.log(
      inputParams.value.attractionNo,
      inputParams.value.attractionTitle
    );
  } else {
    inputParams.value.attractionNo = "";
    inputParams.value.attractionTitle = "";
  }
});

// 이미지 업로드 함수
const handleImageUpload = async (file) => {
  try {
    // 임시 게시글 번호가 없으면 서버에서 생성
    if (inputParams.value.postNo == "") {
      const tempPostResponse = await boardAPI.createTempPost();
      inputParams.value.postNo = tempPostResponse.data;
      console.log("임시 게시글 번호 생성: ", inputParams.value);
    }

    // 이미지 업로드
    const formData = new FormData();
    formData.append("image", file);
    formData.append("postNo", inputParams.value.postNo);

    const response = await boardAPI.uploadImage(formData);
    const imageUrl = response.data;

    console.log("이미지 업로드 성공: ", imageUrl);

    // 업로드된 이미지 URL 반환
    return imageUrl;
  } catch (error) {
    console.error("이미지 업로드 실패: ", error);
    return null;
  }
};

// 드래그 앤 드롭 이벤트 핸들러 추가
const addDragAndDropListeners = (textareaElement) => {
  console.log("drag & drop event handler added");
  textareaElement.addEventListener("dragover", (event) => {
    event.preventDefault();
    console.log("drag event");
    textareaElement.style.backgroundColor = "#f0f0f0"; // 드래그 중 스타일 변경
  });

  textareaElement.addEventListener("dragleave", () => {
    textareaElement.style.backgroundColor = ""; // 드래그 중지 시 원래 스타일로
  });

  textareaElement.addEventListener("drop", async (event) => {
    event.preventDefault();
    textareaElement.style.backgroundColor = "";
    console.log("drop event");

    const file = event.dataTransfer.files[0];
    if (file) {
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        // 현재 커서 위치에 이미지 마크다운 삽입
        const markdownText = `\n![image description](${imageUrl})\n`;
        inputParams.value.content += markdownText;
        inputParams.value.thumbnailUrl = imageUrl;
      }
    }
  });
};

// DOM 요소에 이벤트 리스너 추가
onMounted(async () => {
  await nextTick(); // DOM 렌더링 완료 대기
  const textareaElement =
    editorRef.value?.$el.querySelector(".vmd-body textarea");
  if (textareaElement) {
    addDragAndDropListeners(textareaElement);
  } else {
    console.error("Textarea element not found");
  }
});

// 게시글 작성
const onCreatePost = () => {
  boardAPI.createPost(
    inputParams.value,
    () => {
      router.replace({ name: "board" });
      alert("게시글이 등록 되었습니다.");
    },
    () => {
      console.log("게시글 등록 실패!");
    }
  );
};

// 게시글 수정
const onUpdatePost = () => {
  boardAPI.updatePost(
    inputParams.value,
    () => {
      alert("게시글이 수정 되었습니다.");
      router.replace({ name: "board" });
    },
    () => {
      console.log("게시글 수정 실패!");
    }
  );
};
</script>

<template>
  <div class="w-[80rem] mx-auto">
    <h1 class="text-2xl border-b-2 border-b-black">
      사진 공유 게시판
      <span v-if="!route.params.no" class="text-lg text-gray-400 mx-3">
        글 작성하기
      </span>
      <span v-else class="text-lg text-gray-400 mx-3">글 수정하기</span>
    </h1>
    <div class="w-[80rem] mx-auto my-2">
      <div class="flex flex-col justify-center mb-3">
        <div class="flex items-center text-center">
          <label class="basis-12 mr-3" for="posttitle">글 제목</label>
          <input
            class="flex-grow h-8 my-3 px-2 rounded-md border outline-none focus:border-main-300 border-gray-300"
            type="text"
            name="posttitle"
            id="posttitle"
            placeholder="제목을 입력하세요..."
            v-model.lazy="inputParams.title"
          />
        </div>

        <div class="flex items-center text-center mb-3">
          <label class="basis-12 mr-3" for="postscenetitle">SCENE</label>
          <select
            class="w-72 h-8 px-2 rounded-md border border-gray-300 focus:border-main-300"
            name="postscenetitle"
            id="postscenetitle"
            v-model="inputParams.sceneTitle"
          >
            <option value="" disabled selected>--SCENE을 선택해주세요--</option>
            <option
              v-for="(scene, index) in sceneTitleList"
              :key="index"
              :value="scene.title"
            >
              {{ scene.title }}
            </option>
          </select>
        </div>

        <div class="flex items-center text-center mb-3">
          <label class="basis-12 mr-3" for="postattraction">촬영지</label>
          <select
            class="w-72 h-8 px-2 rounded-md border border-gray-300 focus:border-main-300"
            name="postattraction"
            id="postattraction"
            v-model="selectedAttraction"
          >
            <option value="" disabled selected>--SCENE을 선택해주세요--</option>
            <option
              v-for="(attraction, index) in attractionList"
              :key="index"
              :value="{
                attractionNo: attraction.no,
                attractionTitle: attraction.title,
              }"
            >
              {{ attraction.title }}
            </option>
          </select>
        </div>
        <VMarkdownEditor v-model="inputParams.content" ref="editorRef" />
      </div>
    </div>
    <div class="text-end">
      <button
        v-if="!route.params.no"
        class="w-24 h-10 mx-1 text-sm rounded-md bg-main-300 hover:bg-main-400 text-white"
        type="button"
        @click="onCreatePost"
      >
        작성하기
      </button>
      <button
        v-else
        class="w-24 h-10 mx-1 text-sm rounded-md bg-main-300 hover:bg-main-400 text-white"
        type="button"
        @click="onUpdatePost"
      >
        수정하기
      </button>
    </div>
  </div>
</template>

<style scoped>
.vmd-box {
  height: 24rem;
  font-family: "GangwonEdu_OTFBoldA";
  white-space: nowrap;
}

.vmd-body textarea {
  font-family: "GangwonEdu_OTFBoldA";
}
</style>
