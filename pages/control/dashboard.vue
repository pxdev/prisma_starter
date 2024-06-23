<script setup>
const localePath = useLocalePath();
definePageMeta({ middleware: "auth" });

const breadCrumbs = ref([
  {
    label: "Home",
    to: localePath("/"),
  },
  {
    label: "Dashboard",
  },
]);
</script>

<template>
  <pages-header :bread-crumbs="breadCrumbs" title="Dashboard" />
  <main class="py-12">
    <u-container>
      <control-navigation />
    </u-container>
  </main>
</template>

<style scoped></style>
