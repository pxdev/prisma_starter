<script setup>
  import {useFormatPrice} from "../../../composables/useFormatPrice";

  const props = defineProps({
    property: Object
  })



</script>

<template>

<div class="bg-white">

  <div class="property-thumb relative overflow-hidden h-60 bg-gray-50 ">
    <img class="w-full h-full object-cover" :src="`uploads/${props.property.images[0].path}`" alt="property image">
  </div>

  <div class="py-6">
    <div>
    <p class="text-sm text-gray-400">{{ props.property.city }}-{{ props.property.district }}</p>
    <h2 class="text-lg font-semibold">{{ props.property.title }}</h2>
  </div>

  <div class="flex items-center py-6 justify-between">
    <div class="flex gap-2">
      <icon class="h-5 w-5" name="hugeicons:bed-single-01" />
      <p class="text-gray-500">4 Beds</p>
    </div>
    <div class="flex gap-2">
      <icon class="h-5 w-5" name="hugeicons:bathtub-01" />
      <p class="text-gray-500">4 Baths</p>
    </div>
    <div class="flex gap-2">
      <icon class="h-5 w-5" name="iconoir:ruler-arrows" />
      <p class="text-gray-500">440</p>
    </div>
  </div>
  </div>

  <div class="flex border-t border-dashed border-b py-6 justify-between items-center">
    <p class="text-2xl">${{ useFormatPrice(props.property.price) }}</p>
    <u-button><icon name="mdi:arrow-top-right" class="w-5 h-5" /></u-button>
  </div>


  </div>
</template>

<style scoped>

</style>