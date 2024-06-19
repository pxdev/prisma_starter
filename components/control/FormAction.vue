<script setup lang="ts"></script>

<template>
  <div
    class="fixed inset-x-0 rtl:right-16 bottom-0 ltr:left-16 z-10 border-t bg-white py-6 form-actions dark:border-t-gray-800"
  >
    <u-container class="flex justify-between gap-2">
      <slot />
    </u-container>
  </div>
</template>

<style scoped></style>
