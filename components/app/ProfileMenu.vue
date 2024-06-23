<script setup>
const props = defineProps({
  name: String,
  email: String,
});

const localePath = useLocalePath();

const {  signOut  } = useAuth()

</script>

<template>
   <div>
    <u-popover v-if="props.name" :popper="{ placement: 'bottom-start' }">
      <div class="flex items-center gap-2">
        <u-avatar :alt="props.name" />
        <div>
          <p class="text-xs opacity-70">{{ props.name }}</p>
        </div>
      </div>
      <template #panel>
        <div class="p-4">
          <p class="text-xs">{{ $t("Signed in as") }} {{ props.name }}</p>
          <u-button @click="signOut">{{ $t('Logout') }}</u-button>
        </div>
      </template>
    </u-popover>
  </div>
</template>

<style scoped></style>
