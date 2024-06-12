<script setup lang="ts">
import { useNetwork } from '@vueuse/core'
const { isOnline } = useNetwork()
</script>

<template>
    <div v-if="!isOnline" class="connection-status fixed right-0 bottom-0 z-50">
        <div class="flex items-center gap-4 max-w-[400px] m-2 p-4 bg-primary">
            <div>
                <h3 class="text-xl font-semibold">{{ $t('Connection Lost') }}</h3>
                <p class="opacity-60">{{ $t('Please check your internet connection and try again.') }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
