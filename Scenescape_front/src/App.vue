<script setup>
import VHeader from "@/components/VHeader.vue";
import VFooter from "@/components/VFooter.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="w-screen">
      <VHeader />
    </header>

    <main class="w-screen flex-grow">
      <RouterView />
    </main>

    <footer class="w-screen">
      <VFooter />
    </footer>
  </div>
</template>

<style scoped></style>
