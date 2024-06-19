<script setup>
const props = defineProps({
  property: Object,
});

const localePath = useLocalePath();
</script>

<template>
  <debug>{{ props.property }}</debug>

  <div class="bg-white p-4 group">
    <div class="property-thumb relative overflow-hidden h-48 bg-gray-50">
      <div class="absolute z-10 flex gap-2 text-xs left-3 top-3">
        <div class="text-xs px-2 py-1 bg-white">
          {{ props.property.for_sale ? $t("For Sale") : $t("For Rent") }}
        </div>
        <div
          v-if="props.property.is_featured"
          class="text-xs px-2 py-1 bg-rose-500 text-white"
        >
          {{ $t("Featured") }}
        </div>
      </div>
      <img
        class="w-full h-full object-cover transition-all duration-500 delay-100 ease-in-out group-hover:rotate-2 group-hover:scale-110"
        :src="`/uploads${props.property?.images[0]?.path}`"
        alt="property image"
      />
    </div>

    <div class="py-6">
      <div class="mb-4">
        <p class="text-sm text-gray-400">
          {{ props.property.city }}-{{ props.property.district }}
        </p>
        <h2 class="text-lg font-semibold">{{ props.property.title }}</h2>
      </div>

      <div class="flex items-center text-sm justify-between">
        <div class="flex gap-2">
          <icon class="h-5 w-5" name="hugeicons:bed-single-01" />
          <p class="text-gray-500">
            {{ props.property.bedroom_count }} {{ $t("Beds") }}
          </p>
        </div>
        <div class="flex gap-2">
          <icon class="h-5 w-5" name="hugeicons:bathtub-01" />
          <p class="text-gray-500">
            {{ props.property.bathroom_count }} {{ $t("Baths") }}
          </p>
        </div>
        <div class="flex gap-2">
          <icon class="h-5 w-5" name="iconoir:ruler-arrows" />
          <p class="text-gray-500">{{ props.property.size }}</p>
        </div>
      </div>
    </div>

    <div class="flex border-t border-dashed py-4 justify-between items-center">
      <p class="text-2xl">${{ useFormatPrice(props.property.price) }}</p>
      <u-button><icon name="mdi:arrow-top-right" class="w-5 h-5" /></u-button>
    </div>
  </div>
</template>

<style scoped></style>
