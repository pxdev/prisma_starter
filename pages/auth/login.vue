<script setup>
import { z } from "zod";

definePageMeta({
  middleware: ["not-auth"],
  layout: "auth",
});

const { t } = useI18n();
const toast = useToast();

const isSubmitting = ref(false);

const error = ref(null);

const onError = async (event) => {
  const element = document.getElementById(event.errors[0].id);
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const localePath = useLocalePath();

const form = ref({
  email: "drpxdev@gmail.com",
  password: "p123321",
});

const schema = z.object({
  email: z
    .string({
      required_error: t("validation.requiredError"),
    })
    .email(),
});

const handleSubmit = async () => {
  isSubmitting.value = true;
  await useAsyncData("login", () =>
    $fetch(`/api/auth/login`, {
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

          navigateTo(localePath("/"));
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
            {{ $t("auth.welcomeBack") }}
          </heading>
          <p class="mb-6 text-xs text-gray-400">
            {{ $t("auth.signInToYourAccount") }}
          </p>

          <u-alert
            v-if="error"
            :description="error.message"
            :title="error.name"
            class="mb-4"
            color="red"
            variant="soft"
          />

          <u-form
            :schema="schema"
            :state="form"
            class="login-form"
            @error="onError"
            @submit="handleSubmit"
          >
            <div class="space-y-4">
              <u-form-group :label="$t('auth.email')" name="email">
                <u-input v-model="form.email" size="lg" />
              </u-form-group>
              <u-form-group :label="$t('auth.password')" name="password">
                <u-input v-model="form.password" size="lg" type="password" />
              </u-form-group>
            </div>

            <!--Submit-->
            <div class="mt-6">
              <u-button
                :loading="isSubmitting"
                block
                size="lg"
                @click="handleSubmit"
                >{{ $t("auth.login") }}</u-button
              >
              <u-button
                block
                size="lg"
                variant="link"
                :to="localePath('/auth/register')"
              >
                {{ $t("auth.createAccount") }}
              </u-button>
            </div>
          </u-form>
        </div>
        <!-- login form -->

        <app-copyrights />
      </div>
    </div>
  </div>
</template>
