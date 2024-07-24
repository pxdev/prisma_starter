<script setup>
const localePath = useLocalePath();
const { signOut } = useAuth();

const navigation = ref([
  {
    name: "Dashboard",
    href: "/control",
    icon: "ic:sharp-monitor",
  },
  {
    name: "My Properties",
    href: "/control/properties",
    icon: "ic:outline-other-houses",
  },
  {
    name: "Favourite",
    href: "/users/favourite",
    icon: "ic:baseline-favorite-border",
  },
  {
    name: "My Account",
    href: "/users/profile/edit",
    icon: "ic:outline-manage-accounts",
  },
  {
    name: "Logout",
    click: () => {
      signOut();
    },
    icon: "ic:round-lock-open",
  },
]);
</script>

<template>
  <div class="">
    <nuxt-link
      v-for="item in navigation"
      :key="item.name"
      :to="item.href && localePath(item.href)"
      @click="item.click && item.click()"
      class="flex cursor-pointer gap-2 p-2 items-center transition text-primary-500 hover:text-white hover:bg-primary-500"
    >
      <icon :name="item.icon" class="w-5 h-5" />
      <span>{{ $t(item.name) }}</span>
    </nuxt-link>
  </div>
</template>

<style scoped></style>
