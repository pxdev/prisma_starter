<script setup>
import {useSettings} from "~/composables/useSettings";

const {t} = useI18n();
const route = useRoute();
const router = useRouter()
const toast = useToast();
const settings = useSettings()
const config = useRuntimeConfig()
const localePath = useLocalePath();
const id = route.params.id;

const currentRoute = ref(config.public.authJs.baseUrl+router.currentRoute.value.fullPath)


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
    label: module.value?.data?.city,
    to: localePath("/properties?city="+module.value?.data?.city),
  },
  {
    label: module.value?.data?.district,
    to: localePath("/properties?district="+module.value?.data?.district),
  },

  {
    label: module.value?.data?.title,
  },
])

const showPhone = ref(false)

</script>

<template>
  <debug>{{ module?.data }}</debug>

    <loader/>
    <pages-header :bread-crumbs="breadCrumbs" :title="module?.data?.title"/>
    <main class="bg-gray-100 py-10">
      <u-container>
        <div class="mb-2">
          <heading is="h1" class="text-2xl mb-1">{{ module.data.title }}</heading>
          <p class="text-gray-500">{{ module.data.address }}</p>
        </div>


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


                <u-card class="features mb-6" v-if="module.data.longitude && module.data.latitude">
                  <template #header>
                    <heading is="h3">{{ $t('Description') }}</heading>
                  </template>
                  <map-viewer :location_lang="module?.data?.longitude" :location_lat="module?.data?.latitude" :location_zoom="module?.data?.zoom" />
                </u-card>


              </div>
              <div class="lg:col-span-4">

                <div class="sticky top-28">
                  <u-card class="shadow">
                    <div class="price">
                      <p>{{ $t('Price') }}</p>
                      <p>
                        <span class="text-primary-500 font-semibold text-2xl">
                          {{settings.currency_symbol}}
                          {{ useFormatPrice(module.data.price) }}
                        </span>
                      </p>
                    </div>

                    <div class="flex gap-4 py-6">

                      <u-avatar size="xl" class="bg-gray-200" :src="module?.data?.owner?.avatar" :alt="module.data.owner.name + ' ' + module.data.owner.surname" />

                       <div class="flex flex-col justify-center">
                        <p class="text-xs text-gray-500">{{ $t('Listed by') }}</p>
                        <p class="font-semibold">{{ module.data.owner.name + ' ' + module.data.owner.surname  }}</p>
                      </div>
                    </div>


                    <div v-if="showPhone"
                         class="p-4 border border-dashed text-center text-xl border-green-500 mb-4 rounded bg-green-500/10 text-green-500">
                      {{ module.data.owner.phone }}
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                      <u-button @click="showPhone= true" class="flex-1 flex justify-center" variant="soft" size="xl">
                        <icon name="basil:phone-solid" class="w-6 h-6"/>
                        {{ $t('Call') }}
                      </u-button>
                      <u-button target="_blank"
                                :to="`https://api.whatsapp.com/send?phone=${module.data.owner.phone}&text=${currentRoute}`"
                                class="flex-1 flex justify-center" color="green" variant="soft"  size="xl">
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

</template>

<style scoped>

</style>
