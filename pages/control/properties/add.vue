<script setup>
definePageMeta({ middleware: "auth" });

const localePath = useLocalePath();

const moduleName = ref({
  singular: "property",
  plural: "properties",
});

const showCategoriesModal = ref(false);

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
  <base-scroll>
    <loader />

    <categories-modal
      :categories-modal="showCategoriesModal"
      @close="showCategoriesModal = false"
      category-name="properties"
      end-point="control/properties/categories/categories"
    />

    <pages-header
      :bread-crumbs="breadCrumbs"
      :title="$t('Add New') + ' ' + $t(moduleName.singular)"
    />
    <main class="py-12">
      <u-container>
        <div class="flex items-start gap-8">
          <div class="sticky top-24 w-60">
            <control-navigation />
          </div>
          <div class="flex-1">
            <div class="heading flex items-center mb-4 justify-between">
              <heading is="h2">{{ $t("Properties") }}</heading>

              <u-button size="lg" @click="showCategoriesModal = true">{{
                $t("showCategories")
              }}</u-button>
            </div>
            <property-form />
          </div>
        </div>
      </u-container>
    </main>
  </base-scroll>
</template>

<style scoped></style>
