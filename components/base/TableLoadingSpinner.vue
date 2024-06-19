<script setup lang="ts"></script>

<template>
  <div
    class="flex absolute inset-0 z-10 items-center justify-center gap-2 bg-white/70 dark:bg-gray-800/20"
  >
    <div
      class="dark:bg-gray-900 rounded text-center p-8 border dark:border-gray-800"
    >
      <icon name="svg-spinners:3-dots-fade" class="w-8 h-8" />
      <p class="text-xs">{{ "Fetching data" }}...</p>
    </div>
  </div>
</template>

<style scoped></style>
