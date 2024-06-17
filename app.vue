<script setup>
const { appConfig } = useAppConfig()

useHead({
    title: appConfig.name,
    titleTemplate: `%s - ${appConfig.name}`,
})
 
</script>
<template>
    <nuxt-layout>
        <base-network />
        <nuxt-loading-indicator color="#6950F3" />
          <NuxtPage />
     </nuxt-layout>
    <u-notifications />
</template>
