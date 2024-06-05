<script setup>
const props = defineProps({
    label: String,
})
</script>

<template>
    <span class="text-xs mb-2 font-semibold block lg:hidden">{{ props.label }}:</span>
</template>

<style scoped></style>
