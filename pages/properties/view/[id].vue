<script setup>
import PropertyGallery from "~/components/modules/properties/PropertyGallery.vue";

const {t} = useI18n();
const route = useRoute();
const toast = useToast();
const localePath = useLocalePath();

const id = route.params.id;

const {data: module, error} = await useAsyncData(id, () => $fetch("/api/public/properties/view",
    {
      method: "GET",
      params: {id}
    }
));

const breadCrumbs = ref([
  {
    label: "Home",
    to: localePath("/"),
  },
  {
    label: "Properties",
    to: localePath("/properties"),
  },
  {
    label: module.value?.data?.title,
  },
])

const showPhone = ref(false)

</script>

<template>
  <base-scroll>
    <loader/>
    <pages-header :bread-crumbs="breadCrumbs" :title="module?.data?.title"/>
    <main class="bg-gray-100 py-20">
      <u-container>

            <heading is="h1" class="text-2xl mb-2">{{ module.data.title }}</heading>

            <div class="grid gap-4 py-6 items-start lg:grid-cols-12">
              <div class="lg:col-span-8">

                <!-- // gallery -->
                <property-gallery :media="module?.data?.media" />


                <u-card class="features mb-6">
                  <features
                      :beds="module.data.bedroom_count"
                      :baths="module.data.bathroom_count"
                      :area="module.data.area"
                      :garage="module.data.garage_count"
                      :year="module.data.year_built"
                  />
                </u-card>

                <u-card class="description mb-6">
                  <template #header>
                    <heading is="h3">{{ $t('Description') }}</heading>
                  </template>
                  <p class="text-sm text-gray-500">{{ module.data.description }}</p>
                </u-card>

                <u-card class="Fixtures mb-6">
                  <template #header>
                    <heading is="h3">{{ $t('Fixtures and Fittings') }}</heading>
                  </template>
                  <div class="flex flex-wrap gap-2">
<!--                    <u-badge variant="outline" v-for="(fixture, index) in property.data.fixtures" :key="index">-->
<!--                      {{ $t(fixture.fixture_fitting.name) }}-->
<!--                    </u-badge>-->


                  </div>
                </u-card>

              </div>
              <div class="lg:col-span-4">

                <div class="sticky top-28">
                  <u-card class="shadow">
                    <div class="price">
                      <p>{{ $t('Price') }}</p>
                      <p><span class="text-primary-500 font-semibold text-2xl">{{ useFormatPrice(module.data.price) }}</span></p>
                    </div>

                    <div class="flex gap-4 py-6">
                      <div class="h-16 w-16 rounded border bg-gray-50 flex items-center justify-center">
                        <icon name="solar:user-bold-duotone" class="w-8 h-8"/>
                      </div>
                      <div class="flex flex-col justify-center">
                        <p class="text-xs opacity-60 mb-2">{{ $t('Listed by') }}</p>
                        <p class="font-semibold">{{ module.data.owner.name + ' ' + module.data.owner.surname  }}</p>
                      </div>
                    </div>


                    <div v-if="showPhone"
                         class="p-4 border border-dashed text-center text-xl border-green-500 mb-4 rounded bg-green-500/10 text-green-500">
                      {{ module.data.owner.phone }}
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                      <u-button @click="showPhone= true" class="flex-1 flex justify-center" color="primary" size="xl">
                        <icon name="basil:phone-solid" class="w-6 h-6"/>
                        {{ $t('Call') }}
                      </u-button>
                      <u-button target="_blank"
                                :to="`https://api.whatsapp.com/send?phone=${module.data.owner.phone}&text=${url}`"
                                class="flex-1 flex justify-center" color="green" variant="outline" size="xl">
                        <icon name="basil:whatsapp-outline" class="w-6 h-6"/>
                        {{ $t('Whatsapp') }}
                      </u-button>
                    </div>
                  </u-card>

                </div>

              </div>
            </div>


      </u-container>
    </main>
  </base-scroll>
</template>

<style scoped>

</style>
