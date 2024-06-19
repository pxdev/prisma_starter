<script setup>
definePageMeta({
  middleware: ["auth"],
});

const localePath = useLocalePath();

const moduleName = ref({
  singular: "property",
  plural: "properties",
});

const breadCrumbs = ref([
  {
    label: "Home",
    to: localePath("/"),
  },
  {
    label: "Properties",
    to: localePath("/"),
  },
  {
    label: "Add",
  },
]);
</script>

<template>
  <pages-header
    :bread-crumbs="breadCrumbs"
    :title="$t('Add New') + ' ' + $t(moduleName.singular)"
  />
  <main class="py-12">
    <u-container>
      <div class="flex gap-4">
        <control-navigation />
        <property-form />
      </div>
    </u-container>
  </main>
</template>

<style scoped></style>
