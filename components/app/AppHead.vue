<script setup>
const localePath = useLocalePath();
const { data } = useAuth();

const pageY = ref(0);
const mobileMenuOpen = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    pageY.value = window.scrollY;
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", () => {
    pageY.value = window.scrollY;
  });
});

const isFixedHeader = computed(() => {
  return pageY.value > 75;
});

const navLinks = [
  {
    id: 1,
    name: "Properties",
    to: "/properties",
  },
  {
    id: 2,
    name: "Join Us",
    to: "/auth/register",
  },
  {
    id: 3,
    name: "Contact Us",
    to: "/contact",
  },
];
</script>

<template>
  <u-slideover v-model="mobileMenuOpen">
    <div class="h-screen flex flex-col bg-primary-950 text-white">
      <div class="flex items-center justify-between p-6 z-100">
        <base-logo class="w-24" />
        <u-button color="black" variant="soft" @click="mobileMenuOpen = false">
          <span class="sr-only">Close menu</span>
          <icon
            aria-hidden="true"
            class="text-white w-8 h-8"
            name="ri-close-line"
          />
        </u-button>
      </div>
      <div class="flex-1 p-6 h-full overflow-y-auto">
        <div class="divide-y">
          <div class="space-y-2 py-6 flex flex-col">
            <a
              v-for="nav in navLinks"
              :key="nav.id"
              :href="localePath(nav.to)"
              class="p-2 rounded"
              target="_self"
              @click="mobileMenuOpen = false"
              >{{ $t(nav.name) }}</a
            >
          </div>
        </div>
      </div>
      <div class="flex p-6 bg-primary-900/20 justify-between items-center">
        <profile-menu />
        <u-button :to="localePath('/auth/login')">{{ $t("Login") }} </u-button>

        <div class="flex">
          <color-theme />
        </div>
      </div>
    </div>
  </u-slideover>

  <header
    :class="{ 'bg-primary-950/95 backdrop-blur': isFixedHeader }"
    class="fixed z-30 text-white inset-x-0 top-0 transition duration-700"
  >
    <u-container class="mx-auto flex py-4 items-center justify-between">
      <div class="flex">
        <base-logo class="w-[120px]" />
      </div>
      <nav class="hidden lg:flex gap-2 mx-auto text-[16px]">
        <a
          v-for="nav in navLinks"
          :key="nav.id"
          :href="localePath(nav.to)"
          class="group transition ease-in-out relative overflow-hidden py-2 mx-3 after:absolute after:transition-all after:right-1/2 after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full hover:after:left-0 hover:after:right-0"
          target="_self"
          >{{ $t(nav.name) }}</a
        >
      </nav>
      <div class="flex lg:hidden">
        <u-button color="white" variant="link" @click="mobileMenuOpen = true">
          <span class="sr-only">Open</span>
          <icon class="h-6 w-6" name="ri-menu-line" />
        </u-button>
      </div>

      <div class="hidden lg:flex items-center gap-6">
        <div class="flex items-center">
          <color-theme />
          <profile-menu v-if="data" :name="data.user.name" />
          <u-button v-else :to="localePath('/auth/login')">{{
            $t("Login")
          }}</u-button>
        </div>
      </div>
    </u-container>
  </header>
</template>

<style scoped></style>
