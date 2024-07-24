<script setup>
// Define component props
const props = defineProps({
  single: {
    type: Boolean,
    default: false,
  },
});

// Import required composable
const { handleFileInput, files } = useFileStorage();
const { t } = useI18n();
const toast = useToast();
const { user } = useAuth();

// Reactive references
const userId = ref(user.value?.id);
const fileInput = ref(null);
const page = ref(1);
const pageCount = ref(20);
const mediaModal = ref(false);
const activeMediaTab = ref("browse-file");

// Media tabs configuration
const mediaTabs = [
  {
    title: "mediaManager.selectImages",
    icon: "ic:round-image-search",
    slot: "browse-file",
  },
  {
    title: "mediaManager.uploadImages",
    icon: "ic:outline-drive-folder-upload",
    slot: "upload-file",
  },
];

// Fetch user files from the server
const {
  data: media,
  pending: pendingMedia,
  refresh: refreshMedia,
} = await useFetch("/api/public/media/user_files", {
  method: "POST",
  body: {
    user_id: userId.value,
  },
  params: {
    page: page,
    limit: pageCount,
  },
  watch: [page, pageCount],
});

// Function to open media modal
const browseMedia = async () => {
  mediaModal.value = true;
};

// Function to set active media tab
const setActiveMediaTab = (tab) => {
  activeMediaTab.value = tab;
};

// Function to clear selected files
const clearSelectedBrowseFile = () => {
  files.value = [];
  fileInput.value.value = null;
};

// Function to remove file before upload
const removeBeforeUpload = (index) => {
  files.value.splice(index, 1);
};

// Function to upload files to the server
const uploadFiles = async () => {
  await $fetch("/api/public/media/files", {
    method: "POST",
    body: {
      files: files.value,
      user_id: userId.value,
    },
    onResponse(context) {
      const statusCode = context.response._data.statusCode;
      if (statusCode === 200) {
        toast.add({
          title: t("toastMessages.success"),
          description: t("toastMessages.successfullyUploaded"),
          color: "teal",
        });
        refreshMedia();
        clearSelectedBrowseFile();
        activeMediaTab.value = "browse-file";
      } else {
        toast.add({
          title: t("toastMessages.error"),
          description: t("toastMessages.failedUpload"),
          color: "red",
        });
      }
    },
  });
};

// Function to remove file from the server
const removeFromServer = async (item) => {
  await $fetch(`/api/public/media/${item.id}`, {
    method: "DELETE",
    params: {
      id: item.id,
      user_id: userId.value,
      name: item.name,
    },
    onResponse(context) {
      const statusCode = context.response._data.statusCode;
      if (statusCode === 200) {
        toast.add({
          title: t("toastMessages.success"),
          description: t("toastMessages.successfullyDeleted"),
          color: "teal",
        });
        refreshMedia();
        selectedFiles.value = selectedFiles.value.filter(
          (file) => file.id !== item.id,
        );
      } else {
        toast.add({
          title: t("toastMessages.error"),
          description: t("toastMessages.errorDelete"),
          color: "red",
        });
      }
    },
  });
};

// Define model for selected files
const selectedFiles = defineModel();

// Function to clear selected media
const clearSelectedMedia = () => {
  selectedFiles.value = [];
};

// Function to add files to selected list
const addSelectedFiles = (file) => {
  if (props.single) {
    selectedFiles.value = [file];
    return;
  }

  if (!selectedFiles.value.find((f) => f.id === file.id)) {
    selectedFiles.value.push(file);
  }
};

// Function to remove file from selected list
const removeSelectedFiles = (item) => {
  selectedFiles.value = selectedFiles.value.filter((f) => f.id !== item.id);
};

// Function to remove file from selected media by index
const removeFromSelectedMedia = (index) => {
  selectedFiles.value.splice(index, 1);
};
</script>

<template>
  <section v-if="userId" ref="mediaGallery">
    <div class="mediaManager">
      <div class="relative border border-dashed bg-gray-50/50 p-4">
        <div
          class="mb-2 border flex flex-col lg:flex-row gap-2 items-center justify-between border-dashed p-2 media-toolbar"
        >
          <u-button-group>
            <u-button
              color="gray"
              icon="i-solar-album-linear"
              @click="browseMedia"
              >{{ $t("mediaManager.OpenMediaManager") }}
            </u-button>
            <u-button
              :disabled="selectedFiles.length === 0"
              color="gray"
              icon="i-solar-refresh-circle-broken"
              @click="clearSelectedMedia"
              >{{ $t("mediaManager.ClearSelectedMedia") }}
            </u-button>
          </u-button-group>
          <p class="text-xs flex gap-1">
            <span class="font-semibold underline">{{
              selectedFiles.length
            }}</span
            >{{ $t("mediaManager.selected") }}
          </p>
        </div>
        <div
          v-if="selectedFiles.length > 0"
          class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-8"
        >
          <div
            v-for="(file, index) in selectedFiles"
            :key="index"
            class="img-item relative flex h-28 w-full items-center overflow-hidden border border-gray-100 p-1 shadow-md shadow-gray-200 transition tag group"
          >
            <div
              class="absolute top-2 right-2 z-10 -translate-y-full opacity-0 transition-all delay-100 delete-button group-hover:translate-y-0 group-hover:opacity-100"
            >
              <u-button
                color="red"
                size="xs"
                variant="soft"
                @click="removeFromSelectedMedia(index)"
              >
                <icon class="h-4 w-4" name="material-symbols:close" />
              </u-button>
            </div>

            <img
              :src="`/uploads/${file.path}`"
              alt=""
              class="block h-full w-full object-cover object-center transition-all duration-300 group-hover:-rotate-3 group-hover:scale-125"
            />

            <div
              class="absolute inset-x-0 bottom-0 translate-y-full rounded-b-lg bg-gray-900 p-2 text-white transition-all opacity-0 group-hover:opacity-100 duration-500 group-hover:translate-y-0"
            >
              <span class="block truncate text-xs max-w-[150px]">{{
                useDateFormat(file.created_at, "ddd, DD MMM YYYY HH:mm").value
              }}</span>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="text-center my-10 bg-gray-50 dark:bg-gray-900 p-10">
            <icon class="w-6 h-6" name="solar:card-search-line-duotone" />
            <h3 class="font-semibold mb-1">
              {{ $t("mediaManager.selectImagesToDisplay") }}
            </h3>
            <p class="opacity-80 text-sm">
              {{ $t("mediaManager.OpenMediaManagerToSelect") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <u-modal v-model="mediaModal" :ui="{ width: 'sm:max-w-5xl' }">
      <div class="flex items-center justify-between px-5 pt-5">
        <heading is="h3" :total="media?.data?.total">{{
          $t("mediaManager.MediaManager")
        }}</heading>
        <u-button color="gray" variant="link" @click="mediaModal = false">
          <icon class="h-6 w-6" name="material-symbols:close-rounded" />
        </u-button>
      </div>
      <div class="flex border-b media-tabs">
        <a
          v-for="tab in mediaTabs"
          :class="{
            'text-primary border-b-primary font-semibold':
              tab.slot === activeMediaTab,
          }"
          class="flex items-center gap-2 border-transparent p-5 text-sm translate-y-0.5 border-b-[3px]"
          href="#"
          @click.prevent="setActiveMediaTab(tab.slot)"
        >
          <icon :name="tab.icon" class="h-5 w-5" />
          <span>{{ $t(tab.title) }}</span>
        </a>
      </div>

      <div v-if="activeMediaTab === 'browse-file'">
        <div class="p-8">
          <div
            v-if="media.data.module.length > 0"
            class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5"
          >
            <div
              v-for="item in media.data.module"
              :key="item.id"
              :class="{
                'ring-2 shadow-xl scale-105 relative ring-green-500':
                  selectedFiles.find((file) => item.id === file.id),
              }"
              class="img-item relative flex h-28 w-full items-center overflow-hidden border border-gray-100 p-1 shadow-md shadow-gray-200 transition group"
            >
              <div
                class="absolute top-2 right-2 z-10 -translate-y-full opacity-0 transition-all delay-100 delete-button group-hover:translate-y-0 group-hover:opacity-100"
              >
                <u-button
                  color="red"
                  size="xs"
                  variant="soft"
                  @click.exact="removeFromServer(item)"
                >
                  <icon class="h-4 w-4" name="ph:trash" />
                </u-button>
              </div>
              <u-button
                v-if="!selectedFiles.find((file) => item.id === file.id)"
                class="absolute bottom-2 left-2 z-10 opacity-0 transition-all delay-100 group-hover:opacity-100"
                size="xs"
                @click="addSelectedFiles(item)"
              >
                {{ $t("mediaManager.select") }}
              </u-button>
              <u-button
                v-else
                class="absolute bottom-2 left-2 z-10 opacity-0 transition-all delay-100 group-hover:opacity-100"
                color="green"
                size="xs"
                @click="removeSelectedFiles(item)"
              >
                {{ $t("mediaManager.deSelect") }}
              </u-button>

              <img
                :src="`/uploads/${item.path}`"
                alt=""
                class="block h-full w-full object-cover object-center transition-all duration-300 group-hover:-rotate-3 group-hover:scale-125"
              />
            </div>
          </div>
          <div v-else>
            <div class="text-center my-10 bg-gray-50 dark:bg-gray-900 p-10">
              <icon class="w-6 h-6" name="solar:card-search-line-duotone" />
              <h3 class="font-semibold mb-1">
                {{ $t("mediaManager.noMediaFound") }}
              </h3>
              <p class="opacity-80 text-sm">
                {{ $t("mediaManager.clickToStartUploading") }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-center rounded-b-lg bg-gray-100/80 p-5">
          <u-pagination
            v-model="page"
            :page-count="pageCount"
            :total="media?.data?.total"
            :ui="{
              wrapper: 'flex items-center gap-1',
              rounded: '!rounded-full',
              default: {
                activeButton: {
                  variant: 'outline',
                },
              },
            }"
            size="xs"
          />
        </div>
      </div>

      <div v-if="activeMediaTab === 'upload-file'">
        <div class="p-8">
          <div class="rounded border border-dashed p-4">
            <div
              :class="{
                'bg-green-50/50 border-green-200': files.length > 0,
              }"
              class="relative mb-4 flex h-52 items-center justify-center rounded border border-dashed bg-gray-50 input-container"
            >
              <div class="text-center space-y-1">
                <icon
                  :class="{ 'text-green-500': files.length > 0 }"
                  class="mb-2 h-10 w-10 text-gray-400"
                  name="iconoir:cloud-upload"
                />
                <div
                  v-if="files.length"
                  class="flex flex-col items-center gap-1"
                >
                  <p class="flex items-center gap-2 font-semibold">
                    <u-badge color="green" size="sm" variant="outline">{{
                      files.length
                    }}</u-badge>
                    {{ $t("mediaManager.selectedFiles") }}
                  </p>
                  <p class="text-sm">
                    {{ $t("mediaManager.startUploadingMessage ") }}
                  </p>
                </div>
                <div v-else class="flex flex-col items-center gap-1">
                  <p class="font-semibold">
                    {{ $t("mediaManager.noFilesSelected") }}
                  </p>
                  <p class="text-sm">
                    {{ $t("mediaManager.noFilesSelectedMessage") }}
                  </p>
                </div>
              </div>

              <input
                ref="fileInput"
                accept="image/*"
                class="absolute h-full w-full cursor-pointer opacity-0"
                multiple
                name="mediaUpload"
                type="file"
                @input="handleFileInput"
              />
            </div>

            <div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
              <div
                v-for="(file, fileIndex) in files"
                :key="fileIndex + '_file'"
                class="relative flex h-28 w-full items-center overflow-hidden border border-gray-100 p-1 shadow-md shadow-gray-200 transition group"
              >
                <div
                  class="absolute top-2 right-2 z-10 -translate-y-full opacity-0 transition-all delay-100 delete-button group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <u-button
                    color="red"
                    size="xs"
                    variant="soft"
                    @click="removeBeforeUpload(fileIndex)"
                  >
                    <icon class="h-4 w-4" name="material-symbols:close" />
                  </u-button>
                </div>
                <img
                  :src="file.content"
                  alt=""
                  class="block h-full w-full object-cover object-center transition-all duration-300 group-hover:-rotate-3 group-hover:scale-125"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 rounded-b-lg bg-gray-100/80 p-5">
          <u-button color="gray" @click="clearSelectedBrowseFile">{{
            $t("forms.clear")
          }}</u-button>
          <u-button
            :disabled="files.length === 0"
            :loading="pendingMedia"
            size="lg"
            @click="uploadFiles"
          >
            {{ $t("forms.startUploading") }}
          </u-button>
        </div>
      </div>
    </u-modal>
  </section>
</template>

<style></style>
