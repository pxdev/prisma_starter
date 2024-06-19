<script setup>
const props = defineProps({
  tag: {
    type: Array,
    default: [],
  },
  color: {
    type: String,
    default: "gray",
  },
});
</script>

<template>
  <div class="tags flex flex-wrap py-1 gap-1">
    <u-button
      v-for="(value, index) in props.tag"
      :key="index"
      class="tag"
      color="white"
      size="xs"
    >
      <span class="max-w-[150px] truncate">{{ value }}</span>
    </u-button>
  </div>
</template>

<style scoped></style>
