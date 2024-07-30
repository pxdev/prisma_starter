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
  <div class="flex items-center gap-4 text-sm justify-between">

    <u-tooltip :text="$t('property.beds')" v-if="props.beds">
      <div class="flex gap-2 items-center" >
        <icon class="h-5 w-5" name="hugeicons:bed-single-01"/>
        <div class="text-gray-500">
          <p class="block font-semibold">{{ props.beds }} </p>
          <p class="block text-xs text-gray-400">{{$t('property.beds')}}</p>
        </div>


      </div>
    </u-tooltip>

    <u-tooltip :text="$t('property.baths')" v-if="props.baths">
    <div class="flex gap-2 items-center" v-if="props.baths">
      <icon class="h-5 w-5" name="hugeicons:bathtub-01"/>
      <div class="text-gray-500">
        <p class="block font-semibold">{{ props.baths }}</p>
        <p class="block text-xs text-gray-400">{{$t('property.baths')}}</p>
      </div>
    </div>
    </u-tooltip>

    <u-tooltip :text="$t('property.area')" v-if="props.area">
    <div class="flex gap-2 items-center" v-if="props.area">
      <icon class="h-5 w-5" name="iconoir:ruler-arrows"/>
      <div class="text-gray-500">
        <p class="block font-semibold">{{ props.area }} <span class="text-xs font-normal">{{$t("property.sqft")}}</span></p>
        <p class="block text-xs text-gray-400">{{$t('property.area')}}</p>
      </div>

     </div>
    </u-tooltip>

    <u-tooltip :text="$t('property.garages')" v-if="props.garage">
    <div class="flex gap-2 area" v-if="props.garage">
      <icon class="h-5 w-5" name="ph:car-light"/>
      <div class="text-gray-500">
        <p class="block font-semibold">{{ props.garage }}</p>
        <p class="block text-xs text-gray-400">{{$t('property.garages')}}</p>
      </div>
    </div>
    </u-tooltip>

    <u-tooltip :text="$t('property.yearBuilt')" v-if="props.year">
    <div class="flex gap-2 area" v-if="props.year">
      <icon class="h-5 w-5" name="cil:calendar"/>
      <div class="text-gray-500">
        <p class="block font-semibold">{{ props.year }}</p>
        <p class="block text-xs text-gray-400">{{$t('property.yearBuilt')}}</p>
      </div>
     </div>
    </u-tooltip>

  </div>


</template>

<style scoped>

</style>
