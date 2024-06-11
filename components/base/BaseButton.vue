<script setup>
const localePath = useLocalePath()

const props = defineProps({
    to: {
        type: String,
        default: '#'
    }
})
</script>

<template>
    <div>
        <div class="relative z-10" dir="ltr">
            <nuxt-link :to="localePath(props.to)"
                       class="group inline-flex relative items-center gap-x-6 text-xl hover:translate-x-4 transition ease-out duration-300 pl-6 -ml-6">
            <span class="text-white text-lg group-hover:text-primary-700 transition ease-out duration-300 delay-300"><slot
                name="default" /></span>
                <span class="flex items-center justify-center bg-white text-gray-700   h-12 w-12">
                    <icon class="w-6 h-6" name="iconoir:arrow-right" />
                  </span>
                <span
                    class="absolute right-0 -z-10 bg-white h-full w-12  transition-[width] duration-300 ease-out group-hover:w-full delay-150 "></span>
            </nuxt-link>
        </div>
    </div>
</template>

<style scoped>

</style>
