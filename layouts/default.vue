<script setup>
import { onMounted, ref } from 'vue';
import { useNuxtApp } from '#app';

const { t, localeProperties } = useI18n()

const head = useLocaleHead({ addSeoAttributes: true })

const scrollContainer = ref(null);

onMounted(() => {
  const { $scrollbar } = useNuxtApp();
  if (scrollContainer.value) {
    $scrollbar.init(scrollContainer.value);
  }
});
</script>
<template>
    <Html :dir="localeProperties.dir" :lang="head.htmlAttrs.lang" class="h-full font-cairo">
        <Body>
        <div>
           <app-head />
         <slot />
        </div>
          </Body>
    </Html>
</template>
