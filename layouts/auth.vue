<script setup>
const { t, localeProperties } = useI18n();
const head = useLocaleHead({ addSeoAttributes: true });
</script>
<template>
  <Html
    :dir="localeProperties.dir"
    :lang="head.htmlAttrs.lang"
    class="h-full font-cairo"
  >
    <Body>
      <div class="content">
        <slot />
      </div>
    </Body>
  </Html>
</template>
<style scoped></style>
