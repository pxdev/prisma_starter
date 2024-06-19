<script setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <u-button
    color="white"
    size="sm"
    variant="link"
    @click.prevent="isDark = !isDark"
  >
    <icon
      :name="
        isDark
          ? 'line-md:sunny-filled-loop-to-moon-filled-loop-transition'
          : 'line-md:sunny-filled-loop'
      "
      class="w-5 h-5 text-yellow-500"
    />
  </u-button>
</template>
