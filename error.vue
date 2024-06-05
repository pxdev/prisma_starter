<script lang="ts" setup>
const props = defineProps({
    error: Object,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <div class="min-h-screen p-6">
        <h2 class="text-4xl mb-6">
            {{ error.statusMessage }}
            <span class="font-bold">{{ error.statusCode }}</span>
        </h2>

        <div class="text-red-600 rounded text-sm border bg-gray-100 p-4 mb-6">Error Stack: {{ error.stack }}</div>

        <pre class="h-96 w-full rounded overflow-auto text-xs p-4 mb-6 bg-gray-900 text-white">{{ error.message }}</pre>

        <u-button @click="handleError">Clear errors</u-button>
    </div>
</template>
