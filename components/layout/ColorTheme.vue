<script setup>
const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    },
})
</script>

<template>
    <u-button color="gray" variant="link" size="sm" @click.prevent="isDark = !isDark">
        <icon
            class="w-5 h-5"
            :name="isDark ? 'line-md:sunny-filled-loop-to-moon-filled-loop-transition' : 'line-md:sunny-filled-loop'"
        />
    </u-button>
</template>
