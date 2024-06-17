<script setup>


const localePath = useLocalePath()
const route = useRoute()
const pageSlug = route.params.slug

const {
  data: module,
  error,
} = await useAsyncData(pageSlug, () => $fetch(`/api/page/${pageSlug}`, {
  method: 'GET',
}))

const breadCrumbs = ref([
  {
    label: 'Home',
    to: localePath('/')
  },
  {
    label: module.value?.data?.title,
  }
])


</script>

<template>
  <loader/>

 <page-not-found v-if="error" />

  <main v-else >

    <pages-header :bread-crumbs="breadCrumbs" :title="module.data.title"   />

    <div class=" bg-red-200">
      
      <section v-for="(component, index) in module.data?.page_sections" :key="index+'section'">
        <component :is="`Lazy${component.component_name}`" />
      </section>

      <pre>{{module}}</pre>



    </div>
  </main>





</template>

<style scoped>

</style>