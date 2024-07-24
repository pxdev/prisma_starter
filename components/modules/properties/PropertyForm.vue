<script setup>
import { z } from "zod";
const { t } = useI18n();
const props = defineProps({
  id: {
    default: null,
    type: String,
  },
  moduleName: {
    default: null,
    type: Object,
  },
});
const localePath = useLocalePath();
const toast = useToast();
const formRef = ref(null);
const form = ref({
  images: [],
});

const resetForm = () => {
  Object.keys(form.value).forEach((key) => {
    form.value[key] = undefined;
  });
};
const loadingData = ref(true);
const isSubmitting = ref(false);

const loadEditData = async () => {
  if (props.id) {
    form.value = data.value.data;
    loadingData.value = false;
  }
};

loadEditData();
const schema = z.object({
  name: z.string({
    required_error: t("validation.requiredError"),
  }),
});
const onError = async (event) => {
  const element = document.getElementById(event.errors[0].id);
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};
const handleSubmit = async () => {
  try {
    if (props.id) {
      toast.add({
        title: `${t("Notification")} `,
        icon: "i-heroicons-check-badge",
        description: `${t("successfully updated")} `,
        color: "green",
      });
    } else {
      toast.add({
        title: `${t("Notification")} `,
        icon: "i-heroicons-check-badge",
        description: `${t("successfully created")} `,
        color: "green",
      });
    }
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
  <div class="flex-1">
    <u-form
      ref="formRef"
      :schema="schema"
      :state="form"
      @error="onError"
      @submit="handleSubmit"
    >
      <u-card  class="mb-6">
        <template #header>
          <heading is="h4">{{ $t("headers.propertyInformation") }}</heading>
        </template>
        <div class="pb-4 space-y-6">
          <u-form-group :label="$t('forms.title')" name="name" required>
            <u-input v-model="form.name" placeholder="" size="lg" />
          </u-form-group>
          <u-form-group
            :label="$t('forms.description')"
            name="description"
            required
          >
            <u-textarea v-model="form.description" placeholder="" size="lg" />
          </u-form-group>
          <u-form-group :label="$t('forms.price')" name="price" required>
            <u-input v-model="form.price" placeholder="" size="lg" />
          </u-form-group>
          <u-form-group :label="$t('forms.address')" name="address" required>
            <u-input v-model="form.address" placeholder="" size="lg" />
          </u-form-group>
          <u-form-group
            :label="$t('forms.bedrooms')"
            name="bedroomCount"
            required
          >
            <u-input v-model="form.bedroom_count" placeholder="" size="lg" />
          </u-form-group>
          <u-form-group
            :label="$t('forms.bathrooms')"
            name="bathroomCount"
            required
          >
            <u-input v-model="form.bathroom_count" placeholder="" size="lg" />
          </u-form-group>
          <u-form-group :label="$t('forms.garage')" name="garageCount" required>
            <u-input v-model="form.garage_count" placeholder="" size="lg" />
          </u-form-group>
          <u-form-group :label="$t('forms.area')" name="area" required>
            <u-input v-model="form.area" placeholder="" size="lg" />
          </u-form-group>
          <u-form-group
            :label="$t('forms.yearBuilt')"
            name="yearBuilt"
            required
          >
            <u-input v-model="form.year_built" placeholder="" size="lg" />
          </u-form-group>
          <u-form-group
            :label="$t('forms.yearBuilt')"
            name="yearBuilt"
            required
          >
            <u-input v-model="form.year_built" placeholder="" size="lg" />
          </u-form-group>
          <u-form-group
            :label="$t('forms.mediaManager')"
            name="mediaManager"
            required
          >
            <base-media-management v-model="form.images" />
          </u-form-group>
        </div>
      </u-card>
      <form-action>
        <u-button
          color="gray"
          variant="outline"
          size="lg"
          class="px-8"
          :to="localePath(`/`)"
        >
          {{ $t("Cancel") }}
        </u-button>
        <div class="flex gap-2">
          <u-button
            class="px-8"
            color="black"
            size="lg"
            variant="outline"
            @click="resetForm"
            >{{ $t("Reset") }}
          </u-button>
          <u-button
            :loading="isSubmitting"
            class="px-8"
            color="black"
            size="lg"
            type="submit"
            variant="solid"
            @submit="handleSubmit"
          >
            {{ $t("Save") }}
          </u-button>
        </div>
      </form-action>
    </u-form>
  </div>
</template>

<style scoped></style>
