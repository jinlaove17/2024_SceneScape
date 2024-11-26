<script setup>
import { ref } from "vue";
import userAPI from "@/api/user";

const inputParams = ref({
  id: "",
  email: "",
});
const isSended = ref(false);
const errorMsg = ref("");

const onFindPassword = () => {
  isSended.value = true;
  setTimeout(() => {
    isSended.value = false;
  }, 3_000);
  userAPI.findPassword(
    inputParams.value,
    () => {
      alert("해당 이메일로 임시 비밀번호가 발급 되었습니다.");
    },
    (error) => {
      console.log(error.response.data);
      errorMsg.value = error.response.data;
    }
  );
};
</script>

<template>
  <div class="text-3xl mb-3">비밀번호 찾기</div>
  <form
    class="w-[24rem] mx-auto border-2 rounded-lg p-8"
    @submit.prevent="onFindPassword"
  >
    <div>
      <div class="relative z-0 w-full mb-5">
        <input
          class="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-400 peer"
          type="text"
          name="userId"
          id="userId"
          placeholder=""
          required
          v-model.lazy="inputParams.id"
        />
        <label
          for="userId"
          class="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
        >
          아이디
        </label>
      </div>

      <div class="relative z-0 w-full mb-5">
        <input
          class="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-400 peer"
          type="email"
          name="userEmail"
          id="userEmail"
          placeholder=""
          required
          v-model.lazy="inputParams.email"
        />
        <label
          for="userEmail"
          class="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
        >
          이메일
        </label>
        <p class="text-sm text-red-500">
          {{ errorMsg }}
        </p>
      </div>

      <div class="text-end">
        <button
          class="w-24 mx-2 mt-3 px-3 py-2 text-sm font-medium text-white bg-main-400 rounded-lg hover:bg-main-500"
          @click="onFindPassword"
          :disabled="isSended"
        >
          비밀번호 찾기
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
