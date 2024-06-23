<script setup>
import { z } from "zod";

definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const toast = useToast();

const { t } = useI18n();
const localePath = useLocalePath();

const isSubmitting = ref(false);

const formRef = ref(null);

const form = ref({
  name: undefined,
  surname: undefined,
  email: undefined,
  phone: undefined,
  password: undefined,
  is_item_owner: false,
});

const schema = z.object({
  name: z.string({
    required_error: t("validation.requiredError"),
  }),

  email: z
    .string({
      required_error: t("validation.requiredError"),
    })
    .email(),

  password: z.string({
    required_error: t("validation.requiredError"),
  }),

  phone: z.string({
    required_error: t("validation.requiredError"),
  }),

  surname: z.string({
    required_error: t("validation.requiredError"),
  }),
});

const handleSubmit = async () => {
  isSubmitting.value = true;
  await useAsyncData("login", () =>
    $fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(form.value),
      onResponse(context) {
        const response = context.response._data;
        if (response.success) {
          toast.add({
            title: "Success",
            description: response.statusMessage,
            color: "teal",
          });

          navigateTo(localePath("/auth/login"));
        } else {
          toast.add({
            title: "Error",
            description: response.statusMessage,
            color: "red",
          });
        }
        isSubmitting.value = false;
      },
    }),
  );
};

const onError = async (event) => {
  const element = document.getElementById(event.errors[0].id);
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};
</script>

<template>
  <div class="flex h-screen w-full flex-col items-center md:flex-row">
    <div
      class="flex h-screen w-full items-center justify-center md:mx-auto md:w-1/2 md:max-w-md lg:max-w-full lg:px-16 xl:w-1/3 xl:px-12"
    >
      <div
        class="mx-auto flex h-full w-full max-w-xs flex-col items-center justify-between py-8"
      >
        <div class="mx-auto flex w-full max-w-xs items-center justify-between">
          <nuxt-link
            class="text-xs underline text-primary"
            :to="localePath('/')"
            variant="soft"
            >{{ $t("Home") }}</nuxt-link
          >
          <div class="flex items-center gap-2">
            <color-theme />
          </div>
        </div>

        <div class="w-full login">
          <heading is="h2">
            {{ $t("Create an Account") }}
          </heading>
          <p class="mb-6 text-xs text-gray-400">
            {{ $t("Create an account to continue.") }}
          </p>

          <u-form
            ref="formRef"
            :schema="schema"
            :state="form"
            @error="onError"
            @submit="handleSubmit"
          >
            <div class="gap-4 space-y-4">
              <u-form-group :label="$t('forms.name')" name="name" required>
                <u-input v-model="form.name" size="lg" />
              </u-form-group>
              <u-form-group
                :label="$t('forms.surname')"
                name="surname"
                required
              >
                <u-input v-model="form.surname" size="lg" />
              </u-form-group>
              <u-form-group :label="$t('forms.email')" name="email" required>
                <u-input v-model="form.email" size="lg" />
              </u-form-group>
              <u-form-group
                name="password"
                :label="$t('forms.password')"
                required
              >
                <u-input v-model="form.password" size="lg" type="password" />
              </u-form-group>
              <u-form-group name="phone" :label="$t('forms.phone')" required>
                <u-input v-model="form.phone" size="lg" />
              </u-form-group>
              <u-form-group
                :label="$t('auth.propertyOwner')"
                class="flex items-center justify-between gap-2"
                name="is_item_owner"
              >
                <u-toggle v-model="form.is_item_owner" />
              </u-form-group>
            </div>
            <!--Submit-->
            <div class="block mt-6 w-full">
              <u-button :loading="isSubmitting" block size="lg" type="submit">{{
                $t("auth.register")
              }}</u-button>
              <u-button
                :to="localePath('/auth/login')"
                block
                size="lg"
                variant="link"
              >
                {{ $t("auth.haveAnAccount") }}
              </u-button>
            </div>
          </u-form>
        </div>
        <app-copyrights />
      </div>
    </div>
  </div>
</template>
