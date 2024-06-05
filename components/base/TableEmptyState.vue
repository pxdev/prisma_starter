<script setup>
const props = defineProps({
    icon: {
        type: String,
    },
    title: {
        type: String,
    },
    color: {
        type: String,
    },
    description: {
        type: String,
    },
})
</script>

<template>
    <div class="text-center p-10 rounded-lg my-10 bg-gray-50 dark:bg-gray-900">
        <icon name="solar:4k-bold" class="w-6 h-6"></icon>
        <h3 class="font-semibold mb-1">
            {{ title }}
        </h3>
        <p class="opacity-80 text-sm">
            {{ description }}
        </p>
    </div>
</template>

<style scoped></style>
