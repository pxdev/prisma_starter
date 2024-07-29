<script setup>
const props = defineProps({
  beds: Number,
  baths: Number,
  area: Number,
  garage: Number,
  year: Number,
});
</script>

<template>
  <div class="flex items-center text-sm justify-between">

    <u-tooltip :text="$t('property.beds')" v-if="props.beds">
      <div class="flex gap-2 beds" >
        <icon class="h-5 w-5" name="hugeicons:bed-single-01"/>
        <p class="text-gray-500">
          {{ props.beds }} {{ $t("property.beds") }}
        </p>
      </div>
    </u-tooltip>

    <u-tooltip :text="$t('property.baths')" v-if="props.baths">
    <div class="flex gap-2 baths" v-if="props.baths">
      <icon class="h-5 w-5" name="hugeicons:bathtub-01"/>
      <p class="text-gray-500">
        {{ props.baths }} {{ $t("property.baths") }}
      </p>
    </div>
    </u-tooltip>

    <u-tooltip :text="$t('property.area')" v-if="props.area">
    <div class="flex gap-2 area" v-if="props.area">
      <icon class="h-5 w-5" name="iconoir:ruler-arrows"/>
      <p class="text-gray-500">{{ props.area }} {{$t("property.sqft")}}</p>
    </div>
    </u-tooltip>

    <u-tooltip :text="$t('property.garages')" v-if="props.garage">
    <div class="flex gap-2 area" v-if="props.garage">
      <icon class="h-5 w-5" name="ph:car-light"/>
      <p class="text-gray-500">{{ props.garage }}</p>
    </div>
    </u-tooltip>

    <u-tooltip :text="$t('property.yearBuilt')" v-if="props.year">
    <div class="flex gap-2 area" v-if="props.year">
      <icon class="h-5 w-5" name="cil:calendar"/>
      <p class="text-gray-500">{{ props.year }}</p>
    </div>
    </u-tooltip>

  </div>


</template>

<style scoped>

</style>
