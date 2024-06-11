<script setup>
const categories = ref([
    {
        label: 'Apartment',
        value: 'apartment'
    },
    {
        label: 'Villa',
        value: 'villa'
    },
    {
        label: 'Townhouse',
        value: 'townhouse'
    },
    {
        label: 'Penthouse',
        value: 'penthouse'
    },
    {
        label: 'Office',
        value: 'office'
    },
    {
        label: 'Shop',
        value: 'shop'
    },
    {
        label: 'Warehouse',
        value: 'warehouse'
    },
    {
        label: 'Land',
        value: 'land'
    }
])
const cities = ref([
    {
        label: 'Dubai',
        value: 'dubai'
    },
    {
        label: 'Abu Dhabi',
        value: 'abu-dhabi'
    },
    {
        label: 'Sharjah',
        value: 'sharjah'
    },
    {
        label: 'Ajman',
        value: 'ajman'
    }
])

const city = ref('')
const district = ref('')
const category = ref('')
</script>

<template>
    <div>
        <div class="relative p-10 z-10">

            <div class="property-for bg-primary-100 mb-10 w-60  p-1 ">
                <ul class="grid grid-cols-2">
                    <li class="text-center"><a class="block p-1.5 bg-white text-primary-500 font-medium  "
                                               href="#">{{ $t('Sale') }}</a></li>
                    <li class="text-center"><a class="block p-1.5  " href="#">{{ $t('Rent') }}</a></li>
                </ul>
            </div>


            <div>
                <u-form class="flex gap-4 items-end mb-4 ">
                    <u-form-group class="flex-1  min-w-[200px]" label="City">
                        <u-select-menu v-model="city" :options="cities" placeholder="Select City" searchable
                                       size="xl" />
                    </u-form-group>
                    <u-form-group class="flex-1   min-w-[260px]" label="District">
                        <u-select-menu v-model="district" :options="cities" placeholder="Select District" searchable
                                       size="xl" />
                    </u-form-group>
                    <u-form-group class="flex-1  min-w-[200px]" label="Property type">
                        <u-select-menu v-model="category" :options="categories" placeholder="All Types" searchable
                                       size="xl" />
                    </u-form-group>
                    <u-form-group>
                        <u-button block class="w-32" color="primary" size="xl">Search</u-button>
                    </u-form-group>

                </u-form>

                <u-button color="rose" variant="underline">Advanced Search</u-button>

            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
