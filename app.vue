<script setup>
import {useSettings} from "~/composables/useSettings";

const { appConfig } = useAppConfig();
const nuxtApp = useNuxtApp();
const settings = useSettings()

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});

useHead({
  title: appConfig.name,
  titleTemplate: `%s - ${appConfig.name}`,
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=1",
    },
  ],
});
</script>
<template>
  <nuxt-layout>
    <base-network />
    <NuxtPage />
  </nuxt-layout>
  <u-notifications />
</template>
<style>

</style>
