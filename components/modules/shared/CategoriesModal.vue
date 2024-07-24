<script setup>
const props = defineProps({
  categoriesModal: {
    default: true,
    type: Boolean,
  },

  endPoint: {
    default: null,
    type: String,
  },

  categoryName: {
    default: null,
    type: String,
  },
});
const emit = defineEmits(["close"]);

const close = () => {
  emit("close", false);
};

import { z } from "zod";

const { t, locale } = useI18n();
const toast = useToast();
const formRef = ref(null);

const form = ref({
  name: undefined,
  icon: undefined,
  mediaId: [],
});

// Fetch Data
const {
  data: mainCategories,
  refresh,
  error,
} = await useAsyncData(props.categoryName, () =>
  $fetch(`/api/${props.endPoint}`, {
    method: "GET",
  }),
);

// form validation
const schema = z.object({
  name: z.string({
    required_error: t("Required Field"),
  }),
});

const onError = async (event) => {
  const element = document.getElementById(event.errors[0].id);
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const activeEditId = ref(null);

const setActiveEditRecord = (id) => {
  activeEditId.value = id;
};

const editRecord = async (category) => {
  try {
    await $fetch(`/api/${props.endPoint}`, {
      method: "PATCH",
      params: {
        id: category.id,
      },
      body: {
        name: category.name,
      },
    });

    activeEditId.value = null;
    refresh();
    toast.add({
      title: `${t("Notification")} `,
      icon: "i-heroicons-check-badge",
      description: `${t("successfully updated")} `,
      color: "teal",
    });
  } catch (e) {
    toast.add({
      title: `${t("Notification")} `,
      icon: "i-heroicons-exclamation-circle",
      description: `${t(e.message)}`,
      color: "red",
    });
  }
};

const handleSubmit = async () => {
  if (!form.value.name) return;

  try {
    await $fetch(`/api/${props.endPoint}`, {
      method: "POST",
      body: JSON.stringify(form.value),
    });

    toast.add({
      title: `${t("Notification")} `,
      icon: "i-heroicons-check-badge",
      description: `${t("successfully added")} `,
      color: "teal",
    });
    refresh();
    form.value = {
      name: undefined,
      icon: undefined,
    };
  } catch (e) {
    toast.add({
      title: `${t("Notification")} `,
      icon: "i-heroicons-exclamation-circle",
      description: `${t("Something went wrong")}`,
      color: "red",
    });
    refresh();
  }
};

const deleteRecord = async (id) => {
  try {
    await $fetch(`/api/${props.endPoint}`, {
      method: "DELETE",
      params: {
        id: id,
      },
    });

    toast.add({
      title: `${t("Notification")} `,
      icon: "i-heroicons-check-badge",
      description: `${t("successfully deleted")} `,
      color: "teal",
    });
    refresh();
  } catch (e) {
    toast.add({
      title: `${t("Notification")} `,
      icon: "i-heroicons-exclamation-circle",
      description: `${t("Something went wrong")}`,
      color: "red",
    });
  }
};
</script>

<template>
  <lazy-u-modal v-model="props.categoriesModal" :ui="{ width: 'sm:max-w-4xl' }">
    <div class="flex items-center p-6 dark:border-gray-700">
      <heading is="h3" :total="mainCategories?.data?.total">
        {{ $t("Categories") }}
      </heading>

      <u-button
        class="rtl:mr-auto ltr:ml-auto"
        color="gray"
        variant="link"
        @click="close"
      >
        <icon class="h-6 w-6" name="material-symbols:close-rounded" />
      </u-button>
    </div>
    <div class="grid grid-cols-2">
      <u-form
        ref="formRef"
        :schema="schema"
        :state="form"
        class="bg-gray-50/30 p-6 dark:bg-gray-950/60"
        @error="onError"
        @submit="handleSubmit"
      >
        <u-form-group
          :label="$t('Name')"
          class="w-full flex-1"
          name="name"
          required
        >
          <u-input
            :placeholder="$t('Enter name')"
            v-model="form.name"
            class="w-full flex-1"
            size="md"
          />
        </u-form-group>

        <u-form-group
          :label="$t('Icon')"
          class="w-full flex-1"
          name="icon"
          required
        >
          <u-input
            :placeholder="$t('Enter Icon Name')"
            v-model="form.icon"
            class="w-full flex-1"
            size="md"
          />
        </u-form-group>

        <u-form-group
          :label="$t('Image')"
          class="w-full flex-1"
          name="icon"
          required
        >
          <lazy-base-media-management single v-model="form.mediaId" />
        </u-form-group>

        <u-button
          color="black"
          icon="i-heroicons-plus"
          size="lg"
          @click="handleSubmit"
          >{{ $t("Add") }}</u-button
        >
      </u-form>
      <div class="flex-1 bg-gray-50 overflow-y-auto">
        <div v-if="mainCategories.data" class="p-6 space-y-2">
          <div
            v-for="category in mainCategories.data.module"
            class="flex bg-white items-center justify-between gap-2 rounded border border-dashed p-2 dark:border-gray-700 dark:bg-gray-800/50"
          >
            <pre>
             {{ category }}
           </pre
            >
            <div
              class="flex-1 text-sm"
              :class="{ 'bg-yellow-50': activeEditId === category.id }"
            >
              <u-input
                v-if="activeEditId === category.id"
                v-model="category.name"
                class="w-full flex-1"
                color="gray"
                size="sm"
                variant="none"
              />
              <p v-else class="px-2">{{ category.name }}</p>
            </div>
            <div class="flex gap-2 p-1">
              <div class="flex">
                <u-button
                  v-if="activeEditId === category.id"
                  color="green"
                  variant="link"
                  @click="editRecord(category)"
                >
                  <icon class="h-5 w-5" name="solar:check-read-outline" />
                </u-button>
                <u-button
                  v-else
                  color="gray"
                  variant="link"
                  @click="setActiveEditRecord(category.id)"
                >
                  <icon class="h-5 w-5" name="solar:pen-2-outline" />
                </u-button>

                <u-popover :popper="{ arrow: true }">
                  <u-button color="red" variant="link">
                    <icon
                      class="h-5 w-5"
                      name="solar:trash-bin-trash-outline"
                    />
                  </u-button>
                  <template #panel="{ close }">
                    <div class="px-4">
                      <h3
                        class="mb-4 border-b py-4 text-sm font-bold text-red-600 dark:border-b-gray-800"
                      >
                        {{ $t("Delete Confirmation") }}
                      </h3>
                      <p class="text-sm">
                        {{ $t("Are you sure you want to delete") }}
                        <span class="text-red-600 underline">{{
                          category.name
                        }}</span>
                      </p>
                      <div class="flex justify-center gap-2 py-4">
                        <u-button
                          class="font-semibold"
                          color="red"
                          @click="
                            deleteRecord(category.id);
                            close();
                          "
                          >{{ $t("Yes, Delete") }}
                        </u-button>
                        <u-button
                          color="gray"
                          variant="soft"
                          @click="close()"
                          >{{ $t("No, Cancel") }}</u-button
                        >
                      </div>
                    </div>
                  </template>
                </u-popover>
              </div>
            </div>
          </div>
        </div>

        <table-empty-state
          v-else
          :description="`${t('Start by adding a new')}`"
          :title="`${t('No Results to display')}`"
          icon="solar:card-search-line-duotone"
        />
      </div>
    </div>
  </lazy-u-modal>
</template>

<style scoped></style>
