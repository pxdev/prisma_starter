<script setup>
import Features from "~/components/modules/properties/Features.vue";

const props = defineProps({
  property: Object,
});

const localePath = useLocalePath();
</script>

<template>
<!--  <pre>{{ props.property }}</pre>-->

  <div class="bg-white p-4 group">
    <div class="property-thumb relative overflow-hidden h-60 bg-gray-50">
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


      <img v-if="props.property.media.length > 0"
        class="w-full h-full object-cover transition-all duration-500 delay-100 ease-in-out group-hover:rotate-2 group-hover:scale-110"
        :src="`/uploads${props.property?.media[0]?.path}`"
        alt="property image"
      />

      <div v-else class="bg-gray-100 flex items-center justify-center  object-cover h-full w-full">
          <icon name="material-symbols:android-camera-outline" class="w-12 h-12 text-gray-300"></icon>
      </div>

    </div>

    <div class="py-6">
      <div class="mb-4">
        <p class="text-sm text-gray-400">
          {{ props.property.city }}-{{ props.property.district }}
        </p>
        <h2 class="text-lg font-semibold"><nuxt-link :to="localePath(`/properties/view/${props.property.id}`)">{{ props.property.title }}</nuxt-link></h2>
      </div>


      <features
          :beds="props.property.bedroom_count"
          :baths="props.property.bathroom_count"
          :area="props.property.area"
      ></features>


    </div>

    <div class="flex border-t border-dashed py-4 justify-between items-center">
      <p class="text-2xl">${{ useFormatPrice(props.property.price) }}</p>
      <u-button :to="localePath(`/properties/view/${props.property.id}`)"><icon name="mdi:arrow-top-right" class="w-5 h-5" /></u-button>
    </div>
  </div>
</template>

<style scoped></style>
