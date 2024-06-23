<script setup>
const moduleName = ref({
  singular: "Property",
  plural: "Properties",
});

const { t } = useI18n();
const route = useRoute();
const toast = useToast();
const localePath = useLocalePath();

const breadCrumbs = ref([
  {
    label: "Home",
    to: localePath("/"),
  },
  {
    label: "Properties",
  },
]);

// Filters
const search = ref("");

const page = ref(1);
const pageCount = ref(10);

// Fetch Data
const { data: module, error } = await useAsyncData(
  "properties",
  () =>
    $fetch("/api/property/properties", {
      method: "GET",
      params: {
        page: page.value,
        limit: pageCount.value,
        search: search.value,
        type: route.params.type ? route.params.type : route.query.type,
        city: route.params.city ? route.params.city : route.query.city,
        district: route.params.district
          ? route.params.district
          : route.query.district,
      },
    }),
  {},
);

// Pagination
useHead({
  title: moduleName.value.plural,
});
</script>

<template>
  <base-scroll>
    <loader />
    <pages-header title="Properties" :bread-crumbs="breadCrumbs" />
    <main v-if="module" class="bg-gray-100 py-20">
      <u-container>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <property-card
            :property="property"
            v-for="property in module.data?.module"
            :key="property.id"
          />
        </div>
      </u-container>
    </main>
  </base-scroll>
</template>
