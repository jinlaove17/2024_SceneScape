<script setup>
import { RouterView } from "vue-router";
import VHeader from "@/components/VHeader.vue";
import VFooter from "@/components/VFooter.vue";
</script>

<template>
  <div class="flex justify-center">
    <div class="flex flex-col flex-grow">
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
  </div>
</template>

<style scoped></style>
