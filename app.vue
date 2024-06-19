<script setup>
const { appConfig } = useAppConfig();
const nuxtApp = useNuxtApp();
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
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}

.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}
</style>
