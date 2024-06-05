<script setup>
const { appConfig } = useAppConfig()
</script>

<template>
    <div class="text-center">
        <p class="text-xs text-gray-400">
            &copy; {{ new Date().getFullYear() }} {{ appConfig.name }}.
            {{ $t('All rights reserved.') }}
        </p>
    </div>
</template>

<style scoped></style>
