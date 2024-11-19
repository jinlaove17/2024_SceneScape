<script setup>
import { RouterView } from "vue-router";
import VHeader from "@/components/VHeader.vue";
import VFooter from "@/components/VFooter.vue";
</script>

<template>
  <div class="w-[120rem] min-h-[67.5rem] mx-auto flex flex-col">
    <header>
      <VHeader />
    </header>

    <main class="flex-grow">
      <RouterView />
    </main>

    <footer>
      <VFooter />
    </footer>
  </div>
</template>

<style scoped></style>
