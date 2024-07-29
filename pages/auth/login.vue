<script setup>
import {z} from "zod";

definePageMeta({
  layout: "auth",
});

const {t} = useI18n();
const {signIn} = useAuth();

const toast = useToast();

const isSubmitting = ref(false);

const error = ref(null);

const onError = async (event) => {
  const element = document.getElementById(event.errors[0].id);
  element?.scrollIntoView({behavior: "smooth", block: "center"});
};

const localePath = useLocalePath();

const form = ref({
  email: "admin@admin.com",
  password: "p123321",
});

const schema = z.object({
  email: z
      .string({
        required_error: t("validation.requiredError"),
      })
      .email(),
});

const login = async (email, password) => {
  isSubmitting.value = true;
  try {

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: localePath("/"),
    });

    toast.add({
      title: t("toastMessages.success"),
      description: t("toastMessages.successLogin"),
      variant: "soft",
      color: "green",
    });

  } catch (error) {
    toast.add({
      title: t("toastMessages.error"),
      description: t("toastMessages.failedLogin"),
      variant: "soft",
      color: "red",
    });

  } finally {
    isSubmitting.value = false;
  }

};
</script>

<template>
  <div class="flex h-screen w-full flex-col items-center md:flex-row">

    <div class="bg-gray-100 relative dark:bg-gray-900 hidden h-screen w-full md:w-1/2 lg:block xl:w-2/3">
      <div class="mx-auto w-full h-full flex items-center justify-center overflow-hidden relative">
        <div class="absolute grid grid-cols-6 -translate-x-4 -translate-y-4 object-cover w-[180%] h-[180%] z-10" >
          <div class="border-4 border-black" v-for="n in 30">
              <div class="h-full w-full bg-lime-300" v-if="n === 10">xxx</div>
          </div>
        </div>
        <video autoplay class="absolute object-cover w-full h-screen" loop src="/video/login_vid.mp4" />
      </div>
    </div>

    <div class="flex h-screen w-full items-center justify-center md:mx-auto md:w-1/2 md:max-w-md lg:max-w-full lg:px-16 xl:w-1/3 xl:px-12">
      <div class="mx-auto flex h-full w-full max-w-xs flex-col items-center justify-between py-8">
        <div class="mx-auto flex w-full max-w-xs items-center justify-between">
          <nuxt-link
              :to="localePath('/')"
              class="text-xs underline text-primary"
              variant="soft"
          >{{ $t("headers.home") }}
          </nuxt-link
          >
          <div class="flex items-center gap-2">
            <color-theme/>
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
              @submit="login"
          >
            <div class="space-y-4">
              <u-form-group :label="$t('forms.email')" name="email">
                <u-input v-model="form.email" size="lg"/>
              </u-form-group>
              <u-form-group :label="$t('forms.password')" name="password">
                <u-input v-model="form.password" size="lg" type="password"/>
              </u-form-group>
            </div>

            <!--Submit-->
            <div class="mt-6">
              <u-button
                  :loading="isSubmitting"
                  block
                  size="lg"
                  @click="login(form.email, form.password)"
              >{{ $t("auth.login") }}
              </u-button
              >
              <u-button
                  :to="localePath('/auth/register')"
                  block
                  size="lg"
                  variant="link"
              >
                {{ $t("auth.createAccount") }}
              </u-button>
            </div>
          </u-form>
        </div>
        <!-- login form -->
        <app-copyrights/>
      </div>
    </div>
  </div>
</template>
