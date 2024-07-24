<script setup>
const localePath = useLocalePath();
const { signOut, user } = useAuth();
const toast = useToast();

const logout = async () => {
  await signOut();
  toast.add({
    title: "Success",
    description: "You have successfully logged out",
    color: "teal",
  });
};
</script>

<template>
  <div>
    <u-popover :popper="{ placement: 'bottom-start' }">
      <div class="flex items-center gap-2">
        <u-avatar :alt="user.name" :src="user.avatar" />
        <div>
          <p class="text-xs opacity-70">{{ user.name }}</p>
        </div>
      </div>
      <template #panel>
        <div class="text-sm w-44 p-2">
           <control-navigation />
        </div>
       </template>
    </u-popover>
  </div>
</template>

<style scoped></style>
