<script setup>
import { RouterView } from "vue-router";
import VHeader from "@/components/VHeader.vue";
import VFooter from "@/components/VFooter.vue";
</script>

<template>
  <div class="w-screen min-h-screen flex flex-col">
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
