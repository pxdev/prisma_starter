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
    label: "Sale",
    value: "sale",
  },
  {
    label: "Rent",
    value: "rent",
  },
]);
const categories = ref([
  {
    label: "Apartment",
    value: "apartment",
  },
  {
    label: "Villa",
    value: "villa",
  },
  {
    label: "Townhouse",
    value: "townhouse",
  },
  {
    label: "Penthouse",
    value: "penthouse",
  },
  {
    label: "Office",
    value: "office",
  },
  {
    label: "Shop",
    value: "shop",
  },
  {
    label: "Warehouse",
    value: "warehouse",
  },
  {
    label: "Land",
    value: "land",
  },
]);
const cities = ref([
  {
    label: "Dubai",
    value: "dubai",
  },
  {
    label: "Abu Dhabi",
    value: "abu-dhabi",
  },
  {
    label: "Sharjah",
    value: "sharjah",
  },
  {
    label: "Ajman",
    value: "ajman",
  },
]);

const search = () => {
  router.push({
    path: localePath("/properties"),
    query: {
      city: form.value.city,
      district: form.value.district,
      category: form.value.category,
      propertyFor: form.value.propertyFor,
    },
  });
};
</script>

<template>
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

      <div class="bg-white p-6">
        <u-form :state="form" class="flex gap-4 items-end mb-4">
          <u-form-group class="flex-1" label="City">
            <u-select-menu
              v-model="form.city"
              :options="cities"
              placeholder="Select City"
              value-attribute="label"
              searchable
              size="xl"
            />
          </u-form-group>
          <u-form-group class="flex-1" label="District">
            <u-select-menu
              v-model="form.district"
              :options="cities"
              placeholder="Select District"
              value-attribute="label"
              searchable
              size="xl"
            />
          </u-form-group>
          <u-form-group class="flex-1" label="Property type">
            <u-select-menu
              v-model="form.category"
              :options="categories"
              value-attribute="label"
              placeholder="All Types"
              searchable
              size="xl"
            />
          </u-form-group>
          <u-form-group class="flex">
            <u-button
              @click.prevent="search"
              block
              class="w-32"
              color="primary"
              size="xl"
              >Search</u-button
            >
          </u-form-group>
        </u-form>

        <!--                <u-button trailing-icon="i-heroicons-arrow-long-right" variant="link">Advanced Search</u-button>-->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
