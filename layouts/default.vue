<script setup>
const { t, localeProperties } = useI18n()
const head = useLocaleHead({ addSeoAttributes: true })
onMounted(() => {
    useSmoothScroll()
})
</script>
<template>
    <Html :dir="localeProperties.dir" :lang="head.htmlAttrs.lang" class="h-full font-cairo">
        <Body class="bg-primary-950">
            <div class="content">
                <app-head />
                <slot />
            </div>
        </Body>
    </Html>
</template>
<style scoped></style>
