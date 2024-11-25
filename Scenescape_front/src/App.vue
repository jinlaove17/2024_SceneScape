<script setup>
import { RouterView } from "vue-router";

import { useLayoutStore } from "./stores/layout";

import VHeader from "@/components/VHeader.vue";
import VFooter from "@/components/VFooter.vue";
import VChatBotButton from "./components/VChatBot/VChatBotButton.vue";
import { storeToRefs } from "pinia";

const layoutStore = useLayoutStore();
const { isFooterVisible } = storeToRefs(layoutStore);
</script>

<template>
  <div class="min-w-screen max-w-[120rem] min-h-screen mx-auto flex flex-col">
    <header>
      <VHeader />
    </header>

    <main class="flex-grow">
      <RouterView />
    </main>

    <footer v-if="isFooterVisible">
      <VFooter />
    </footer>

    <VChatBotButton />
  </div>
</template>

<style scoped></style>
