<script setup>
const props = defineProps({
    color: {
        type: String,
        default: 'gray',
    },
    clickable: {
        type: Boolean,
        default: true,
    },
})
</script>

<template>
    <u-button class="tag" size="xs" color="white" :disabled="!clickable">
        <span class="max-w-[150px] truncate"><slot name="default" /></span>
    </u-button>
</template>

<style scoped></style>
