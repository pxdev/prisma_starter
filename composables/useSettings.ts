import { ref } from "vue";

const settingsEndpoint = "/api/public/settings/settings";

export const useSettings = () => {
  const settings = ref(null);
  const { data } = useAsyncData("settings", () => $fetch(settingsEndpoint));

  if (data.value) {
    settings.value = data.value?.data.module[0];
  }

  return settings;
};
