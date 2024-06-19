<script setup>
const localePath = useLocalePath();
</script>

<template>
  <nuxt-link :to="localePath('/')" class="flex items-center text-2xl font-bold"
    >Prisma</nuxt-link
  >
</template>

<style scoped></style>
