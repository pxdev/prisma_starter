<script setup>
  const props = defineProps({
    title: String,
    breadCrumbs: Array,
    background: String,
  })
</script>

<template>
  <div class="bg-primary-900 relative py-32">
    <u-container>
      <div class="relative flex flex-col items-center z-20">
        <h1 class="text-6xl text-center text-white">{{ $t(props.title) }}</h1>
        <u-breadcrumb divider="/" :links="props.breadCrumbs" :ui="{
             li: 'text-gray-100 dark:text-gray-100 text-base',
             inactive: ' hover:text-gray-200 dark:hover:text-gray-200',
         }"/>
      </div>
    </u-container>
    <div class="absolute inset-0 z-10 flex justify-between bg-gradient-to-t from-primary-950 to-primary-950/30"></div>
    <img class="absolute inset-0 h-full w-full object-cover" :src="props.background ? background : '/images/cozy-modern-loft-b.webp' " alt="">
  </div>
</template>

<style scoped>

</style>