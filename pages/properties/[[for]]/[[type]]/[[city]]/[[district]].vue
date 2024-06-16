<script setup>


const moduleName = ref({
  singular: 'Property',
  plural: 'Properties',
})

const {t} = useI18n()
const route = useRoute()
const toast = useToast()
const localePath = useLocalePath()


// Filters
const search = ref('')

const page = ref(1)
const pageCount = ref(10)

// Fetch Data
const {
  data: module,
  pending,
  error,
  refresh: refreshRecords,
} = await useAsyncData('properties', () => $fetch('/api/property/properties', {
      method: 'GET',
      params: {
        page: page.value,
        limit: pageCount.value,
        search: search.value,
        type: route.params.type? route.params.type : route.query.type,
        city: route.params.city? route.params.city : route.query.city,
        district: route.params.district? route.params.district : route.query.district,
      },
    }),
    {}
)

// Pagination
useHead({
  title: moduleName.value.plural,
})

</script>

<template>
  <pre>
    {{ route.params }}
  </pre>

  <pre>{{module}}</pre>

</template>
