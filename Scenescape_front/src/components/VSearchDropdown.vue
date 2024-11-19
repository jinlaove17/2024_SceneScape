<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    require: true,
  },
  items: Array,
});
const emit = defineEmits(["requireSubItems"]);

// State
const isOpen = ref(false);
const isSearching = ref(false);

const searchTerm = ref("");
const selectedItem = ref("");

// Computed
const filteredItems = computed(() => {
  const search = searchTerm.value.toLowerCase();
  return props.items.filter((item) => item.toLowerCase().includes(search));
});

const onOpenSelect = () => {
  isOpen.value = true;
};
const onCloseSelect = () => {
  if (isSearching.value) {
    return;
  }

  isOpen.value = false;
};
const onFocusInInput = () => {
  isSearching.value = true;
};
const onFocusOutInput = () => {
  isSearching.value = false;
};
const onSelectItem = (title) => {
  emit("requireSubItems", title);
  selectedItem.value = title;
};
</script>

<template>
  <div
    class="flex items-center justify-center w-full mx-auto my-3"
    @focusin="onOpenSelect"
    @focusout="onCloseSelect"
  >
    <div class="relative group w-full">
      <p class="block text-sm text-gray-500 group-focus-within:text-main-300">
        {{ props.title }}
      </p>
      <!-- Dropdown Button -->
      <button
        class="inline-flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-main-300"
      >
        <p class="text-sm">{{ selectedItem }}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 ml-2 -mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div
        v-show="isOpen"
        class="absolute flex flex-col h-56 z-20 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-3 space-y-1 overflow-y-scroll"
      >
        <!-- Search Input -->
        <input
          class="w-full px-4 py-2 text-gray-800 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-main-300"
          type="text"
          placeholder="검색어를 입력하세요..."
          autocomplete="off"
          v-model="searchTerm"
          @mousedown="onFocusInInput"
          @focusout="onFocusOutInput"
        />

        <!-- Dropdown Content -->
        <a
          v-for="item in filteredItems"
          :key="item"
          class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
          @mousedown="onSelectItem(item)"
        >
          {{ item }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
