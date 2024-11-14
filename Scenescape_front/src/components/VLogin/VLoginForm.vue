<script setup></script>

<template>
  <div class="flex flex-col items-center my-10">
    <div class="flex items-center">
      <div class="text-4xl">LOGIN</div>
    </div>

    <form
      class="w-[26rem] mx-auto border-2 rounded-md px-10 py-8"
      @submit.prevent
    >
      <div class="relative z-0 w-full mb-8">
        <div class="relative z-0 w-full mb-8">
          <input
            type="text"
            name="userId"
            id="userId"
            class="block pt-2 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main-300 peer"
            placeholder=""
            required
          />
          <label
            for="userId"
            class="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            ID
          </label>
        </div>
        <p
          class="text-sm"
          :class="isValidId ? 'text-main-400' : 'text-red-500'"
        >
          {{ idInfo }}
        </p>
      </div>

      <div class="relative z-0 w-full mb-8">
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

      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value="remember"
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
            required
          />
        </div>
        <label for="remember" class="ms-2 text-md font-medium text-gray-900">
          아이디 기억하기
        </label>
      </div>

      <div class="flex justify-center">
        <button
          type="submit"
          class="w-24 px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400 mr-3"
        >
          아이디 찾기
        </button>
        <button
          type="submit"
          class="w-24 px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400 mr-3"
        >
          비밀번호 찾기
        </button>
        <button
          type="submit"
          class="w-24 px-3 py-2 text-sm font-medium text-white bg-main-300 rounded-lg hover:bg-main-400 mr-3"
        >
          로그인
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
