<script setup>
const { t, localeProperties } = useI18n()
const head = useLocaleHead({ addSeoAttributes: true })
onMounted(() => {
    useSmoothScroll()
})
</script>
<template>
    <Html :dir="localeProperties.dir" :lang="head.htmlAttrs.lang" class="h-full font-cairo">
        <Body>
            <div class="content">
                <app-head />
                <slot />
            </div>
        </Body>
    </Html>
</template>
<style scoped></style>
