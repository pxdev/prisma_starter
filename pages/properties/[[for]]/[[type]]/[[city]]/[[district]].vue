<script setup>
const moduleName = ref({
  singular: "Property",
  plural: "Properties",
});

const {t} = useI18n();
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
const pageCount = ref(9);

// Fetch Data
const {data: module, error} = await useAsyncData(
    "items",
    () =>
        $fetch("/api/public/properties", {
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
    {
      watch: [page, search, pageCount],
    },
);

// Pagination
useHead({
  title: moduleName.value.plural,
});
</script>

<template>
  <base-scroll>
    <loader/>
    <pages-header :bread-crumbs="breadCrumbs" title="Properties"/>
    <main v-if="module" class="bg-gray-100 py-20">
      <u-container>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <property-card
              v-for="property in module.data?.module"
              :key="property.id"
              :property="property"
          />
        </div>


        <div class="mt-4 flex flex-wrap items-center justify-center rounded-lg p-4">
          <u-pagination v-model="page" :page-count="pageCount" :total="module.data?.total" :ui="{
    wrapper: 'flex items-center gap-1',
    rounded: '!rounded-full min-w-[32px] justify-center',
  }"/>
        </div>


      </u-container>
    </main>
  </base-scroll>
</template>
