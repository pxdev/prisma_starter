<script setup lang="ts"></script>

<template>
  <section class="bg-primary-900 relative py-32">
    <u-container>
      <div class="relative flex flex-col text-white items-center z-20">
        <strong class="font-bold text-4xl">Error!</strong>
      </div>
      <div
        class="absolute inset-0 z-10 flex justify-between bg-gradient-to-t from-primary-950 to-primary-950/30"
      ></div>
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="/images/cozy-modern-loft-b.webp"
        alt=""
      />
    </u-container>
  </section>

  <div>{ $t('Page Not found') }}</div>
</template>

<style scoped></style>
