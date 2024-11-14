<script setup>
import { ref, watch } from "vue";

const userInput = ref({
  id: "",
  pwd: "",
  pwdCheck: "",
  nickname: "",
  email: "",
});

const idInfo = ref("");
const isValidId = ref(false);

watch(
  () => userInput.value.id,
  () => {
    if (userInput.value.id.length < 2 || userInput.value.id.length > 16) {
      idInfo.value = "아이디는 2자 이상 16자 이하여야 합니다!";
      isValidId.value = false;
    } else {
      idInfo.value = "사용 가능한 아이디입니다!";
      isValidId.value = true;
    }
  }
);
</script>

<template>
  <div class="flex flex-col items-center my-10">
    <div class="flex items-center">
      <div class="text-4xl">SIGN UP</div>
    </div>

    <form
      class="w-[26rem] mx-auto border-2 rounded-md px-10 py-8"
      @submit.prevent
    >
      <div class="relative z-0 w-full mb-5">
        <input
          type="text"
          name="userId"
          id="userId"
          class="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer"
          placeholder=""
          required
          v-model.lazy="userInput.id"
        />
        <label
          for="userId"
          class="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          ID
        </label>
        <p
          v-show="userInput.id.length() > 0"
          class="text-sm"
          :class="isValidId ? 'text-main-400' : 'text-red-500'"
        >
          {{ idInfo }}
        </p>
      </div>

      <div class="relative z-0 w-full mb-5">
        <input
          type="password"
          name="userPwd"
          id="userPwd"
          class="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer"
          placeholder=""
          required
        />
        <label
          for="userPwd"
          class="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>

      <div class="relative z-0 w-full mb-5">
        <input
          type="password"
          name="userPwdCheck"
          id="userPwdCheck"
          class="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer"
          placeholder=""
          required
        />
        <label
          for="userPwdCheck"
          class="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Password Check</label
        >
      </div>

      <div class="relative z-0 w-full mb-5">
        <input
          type="text"
          name="nickname"
          id="nickname"
          class="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer"
          placeholder=""
          required
        />
        <label
          for="nickname"
          class="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Nickname</label
        >
      </div>

      <div class="relative z-0 w-full mb-8">
        <input
          type="email"
          name="email"
          id="email"
          class="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer"
          placeholder=""
          required
        />
        <label
          for="email"
          class="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Email</label
        >
      </div>
      <button
        type="submit"
        class="w-24 px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400"
      >
        회원 가입
      </button>
    </form>

    <!-- <form
      class="flex flex-col items-center w-80 border-2 mx-auto rounded-md py-5"
      @submit.prevent
    >
      <div class="mb-5">
        <label class="text-sm" for="userId">아이디<br /></label>
        <input
          class="w-56 h-8 border-2 rounded-md px-3"
          type="text"
          name="userId"
          id="userId"
          v-model.lazy="userInput.id"
        />
        <p
          class="text-sm"
          :class="isValidId ? 'text-main-400' : 'text-red-500'"
        >
          {{ idInfo }}
        </p>
      </div>
      <div class="mb-5">
        <label class="text-sm" for="userPwd">비밀번호<br /></label>
        <input
          class="w-56 h-8 border-2 rounded-md px-3"
          type="password"
          name="userPwd"
          id="userPwd"
          v-model.lazy="userInput.pwd"
        />
      </div>
      <div class="mb-5">
        <label class="text-sm" for="userPwdCheck">비밀번호 확인<br /></label>
        <input
          class="w-56 h-8 border-2 rounded-md px-3"
          type="password"
          name="userPwdCheck"
          id="userPwdCheck"
          v-model.lazy="userInput.pwdCheck"
        />
      </div>
      <div>
        <label class="text-sm" for="nickname">닉네임<br /></label>
        <input
          class="w-56 h-8 border-2 rounded-md mb-5 px-3"
          type="text"
          name="nickname"
          id="nickname"
          v-model.lazy="userInput.nickname"
        />
      </div>
      <div>
        <label class="text-sm" for="email">이메일<br /></label>
        <input
          class="w-56 h-8 border-2 rounded-md mb-5 px-3"
          type="email"
          name="email"
          id="email"
          v-model.lazy="userInput.email"
        />
      </div>
      <button
        type="button"
        class="inline-flex items-end px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400"
      >
        회원가입
      </button>
    </form> -->
  </div>
</template>

<style scoped></style>
