<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const store = useUserStore();
const { updateUser, deleteUser } = store;
const { userInfo } = storeToRefs(store);

const inputParams = ref({
  pwd: "",
  pwdCheck: "",
  nickname: userInfo.value.nickname,
  email: userInfo.value.email,
});
const showPwd = ref(false);

// 비밀번호 유효성 검사
const isValidPwd = ref(false);
const isValidPwdCheck = ref(false);
const pwdInfo = ref("");
const pwdCheckInfo = ref("");
const checkValidPwd = () => {
  if (inputParams.value.pwd.length < 8 || inputParams.value.pwd.length > 16) {
    pwdInfo.value = "비밀번호는 8자 이상 16자 이하여야 합니다!";
    isValidPwd.value = false;
  } else {
    pwdInfo.value = "";
    isValidPwd.value = true;
  }
};
const checkValidPwdCheck = () => {
  if (inputParams.value.pwd != inputParams.value.pwdCheck) {
    pwdCheckInfo.value = "비밀번호가 일치하지 않습니다.";
    isValidPwdCheck.value = false;
  } else {
    pwdCheckInfo.value = "";
    isValidPwdCheck.value = true;
  }
};

// 닉네임 유효성 검사
const isValidNickname = ref(false);
const nicknameInfo = ref("");
const checkValidNickname = () => {
  const regex = /^[가-힣a-zA-Z0-9]+$/;

  if (
    inputParams.value.nickname.length < 2 ||
    inputParams.value.nickname.length > 8
  ) {
    nicknameInfo.value = "닉네임은 2자 이상 8자 이하여야 합니다!";
    isValidNickname.value = false;
  } else if (!regex.test(inputParams.value.nickname)) {
    nicknameInfo.value = "닉네임은 한글, 영문, 숫자로만 구성되어야 합니다.";
    isValidNickname.value = false;
  } else {
    nicknameInfo.value = "";
    isValidNickname.value = true;
  }
};

const isValid = () => {
  return isValidPwd.value && isValidPwdCheck.value && isValidNickname.value;
};

const onUpdateUser = () => {
  updateUser(
    { id: userInfo.value.id, ...inputParams.value },
    () => {
      alert("회원 정보가 수정되었습니다.");
    },
    () => {
      console.log("회원 정보를 수정하지 못했습니다.");
    }
  );
};
const onDeleteUser = () => {
  deleteUser(
    () => {
      alert("회원 탈퇴가 완료되었습니다.");
    },
    () => {
      console.log("회원 탈퇴를 수행하지 못했습니다.");
    }
  );
};

watch(
  () => inputParams.value.pwd,
  () => {
    checkValidPwd();
  }
);

watch(
  () => inputParams.value.pwdCheck,
  () => {
    checkValidPwdCheck();
  }
);

watch(
  () => inputParams.value.nickname,
  () => {
    checkValidNickname();
  }
);
</script>

<template>
  <div class="text-3xl mb-3">마이페이지</div>
  <form
    class="w-[24rem] mx-auto border-2 rounded-lg p-8"
    @submit.prevent="onUpdateUser"
  >
    <div class="relative z-0 w-full mb-5">
      <input
        class="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer pointer-events-none"
        type="text"
        name="userId"
        id="userId"
        placeholder=""
        readonly
        :value="userInfo.id"
      />
      <label
        for="userId"
        class="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
      >
        아이디
      </label>
    </div>

    <div class="relative z-0 w-full mb-5">
      <input
        class="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer"
        :type="showPwd ? 'text' : 'password'"
        name="userPwd"
        id="userPwd"
        placeholder=""
        required
        autocomplete="off"
        v-model.lazy="inputParams.pwd"
      />
      <label
        for="userPwd"
        class="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
      >
        비밀번호
      </label>
      <svg
        v-show="!showPwd"
        class="absolute top-3 right-2 w-5 h-5 fill-gray-300 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        @click="showPwd = !showPwd"
      >
        <path
          d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
        />
      </svg>
      <svg
        v-show="showPwd"
        class="absolute top-3 right-2 w-5 h-5 fill-gray-300 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        @click="showPwd = !showPwd"
      >
        <path
          d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
        />
      </svg>
      <p
        v-show="!isValidPwd"
        class="text-sm"
        :class="isValidPwd ? 'text-main-400' : 'text-red-500'"
      >
        {{ pwdInfo }}
      </p>
    </div>

    <div class="relative z-0 w-full mb-5">
      <input
        class="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer"
        :class="isValid"
        type="password"
        name="userPwdCheck"
        id="userPwdCheck"
        placeholder=""
        required
        autocomplete="off"
        v-model.lazy="inputParams.pwdCheck"
      />
      <label
        for="userPwdCheck"
        class="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
      >
        비밀번호 확인
      </label>
      <p
        v-show="!isValidPwdCheck"
        class="text-sm"
        :class="isValidPwdCheck ? 'text-main-400' : 'text-red-500'"
      >
        {{ pwdCheckInfo }}
      </p>
    </div>

    <div class="relative z-0 w-full mb-5">
      <input
        class="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer"
        type="text"
        name="userNickname"
        id="userNickname"
        placeholder=""
        required
        v-model.lazy="inputParams.nickname"
      />
      <label
        for="userNickname"
        class="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
      >
        닉네임
      </label>
      <p
        v-show="!isValidNickname"
        class="text-sm"
        :class="isValidNickname ? 'text-main-400' : 'text-red-500'"
      >
        {{ nicknameInfo }}
      </p>
    </div>

    <div class="relative z-0 w-full mb-5">
      <input
        class="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer"
        type="email"
        name="userEmail"
        id="userEmail"
        placeholder=""
        required
        v-model.lazy="inputParams.email"
      />
      <label
        for="userEmail"
        class="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
      >
        이메일
      </label>
    </div>

    <div class="text-center">
      <button
        class="w-24 mx-2 mt-3 px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400"
      >
        수정하기
      </button>
      <button
        class="w-24 mx-2 mt-3 px-3 py-2 text-sm font-medium text-white bg-red-300 rounded-lg hover:bg-red-400"
        type="button"
        @click="onDeleteUser"
      >
        회원탈퇴
      </button>
    </div>
  </form>
</template>

<style scoped></style>
