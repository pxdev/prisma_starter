<script setup>
const router = useRouter();
const localePath = useLocalePath();
const form = ref({
  propertyFor: "sale",
  city: undefined,
  district: undefined,
  category: undefined,
});

const forTypes = ref([
  {
    label: "forms.sale",
    value: "sale",
  },
  {
    label: "forms.rent",
    value: "rent",
  },
]);

const { data: cities } = await useLazyAsyncData("cities", () =>
  $fetch("/api/public/cities"),
);
const { data: categories } = await useLazyAsyncData(
  "propertiesCategories",
  () => $fetch("/api/public/properties/categories"),
);

const districts = ref([]);

const getDistricts = async (id) => {
  districts.value = [];
  form.value.district = undefined;
  const { data } = await useAsyncData(() => $fetch(`/api/public/cities/${id}`));
  if (data) {
    districts.value = data.value?.data?.module;
  } else {
    districts.value = [];
  }
};

const search = () => {
  router.push({
    path: localePath("/properties"),
    query: {
      city: form.value.city.name,
      district: form.value.district.name,
      category: form.value.category.name,
      propertyFor: form.value.propertyFor,
    },
  });
};
</script>

<template>
  <debug>{{ form }}</debug>

  <div>
    <div class="relative p-10 z-10">
      <div class="property-for bg-primary-950/80 mb-2 w-60">
        <ul class="grid grid-cols-2">
          <li v-for="item in forTypes" class="text-center">
            <a
              :class="{
                'bg-white text-primary-800 font-medium':
                  form.propertyFor === item.value,
              }"
              class="block transition-all ease-in-out duration-500 text-sm text-gray-400 p-1.5"
              href="#"
              @click.prevent="form.propertyFor = item.value"
              >{{ $t(item.label) }}</a
            >
          </li>
        </ul>
      </div>

      <div class="bg-white p-6" v-if="cities">
        <u-form :state="form" class="flex gap-4 items-end mb-4">
          <u-form-group class="flex-1" label="City">
            <u-select-menu
              v-model="form.city"
              :options="cities?.data?.module"
              option-attribute="name"
              placeholder="Select City"
              searchable
              size="xl"
              @change="getDistricts(form.city.id)"
            />
          </u-form-group>
          <u-form-group class="flex-1" label="District">
            <u-select-menu
              v-model="form.district"
              :options="districts"
              option-attribute="name"
              placeholder="Select District"
              searchable
              size="xl"
            />
          </u-form-group>
          <u-form-group class="flex-1" label="Property type">
            <u-select-menu
              v-model="form.category"
              :options="categories?.data?.module"
              placeholder="All Types"
              searchable
              size="xl"
              option-attribute="name"
            >
              <template #option="{ option: item }">
                <icon class="w-4 h-4" :name="item.icon" />
                {{ item.name }}
              </template>
            </u-select-menu>
          </u-form-group>
          <u-form-group class="flex">
            <u-button
              block
              class="w-32"
              color="primary"
              size="xl"
              @click.prevent="search"
              >Search
            </u-button>
          </u-form-group>
        </u-form>

        <!--                <u-button trailing-icon="i-heroicons-arrow-long-right" variant="link">Advanced Search</u-button>-->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
