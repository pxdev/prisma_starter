<script setup>
const { locale, locales, setLocaleCookie } = useI18n();
const switchLocalePath = useSwitchLocalePath();

watch(locale, (newLocale) => {
  setLocaleCookie(newLocale);
});
</script>

<template>
  <u-popover :popper="{ arrow: true }">
    <u-button color="white" size="sm" variant="link">
      <icon class="w-5 h-5" name="ph:globe-simple" />
      <span>{{
        locales.find((item) => item.code === locale).name
      }}</span></u-button
    >
    <template #panel="{ close }">
      <div class="text-gray-600 p-1 gap-2">
        <nuxt-link
          v-for="lang in locales"
          :key="lang.code"
          :class="[
            locale === lang.code ? 'bg-primary-50/50 font-semibold' : '',
          ]"
          :to="switchLocalePath(lang.code)"
          class="relative hover:bg-primary-500/5 min-w-[150px] flex rounded gap-2 px-4 py-2 text-sm items-center"
          @click="close"
        >
          <icon :name="lang.flag" class="w-6 h-6" />
          {{ lang.name }}
          <icon
            v-if="locale === lang.code"
            class="absolute w-5 h-5 top-1/2 -translate-y-1/2 ltr:right-1.5 rtl:left-1.5 text-primary-500"
            name="solar:check-circle-bold"
          />
        </nuxt-link>
      </div>
    </template>
  </u-popover>
</template>
