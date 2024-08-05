<script setup>
import { ref, onMounted } from 'vue';
import { Container, Draggable } from "vue-dndrop";

const menuItems = ref([]);
const newParentTitle = ref('');
const newChildTitles = ref({});
const editingItem = ref(null);
const isModalOpen = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

onMounted(async () => {
  await fetchMenuItems();
});

async function fetchMenuItems() {
  try {
    const { data } = await useFetch('/api/control/menu');
    menuItems.value = data.value.module || [];
  } catch (e) {
    console.error('Error fetching menu items:', e);
    errorMessage.value = 'Failed to load menu items. Please try again.';
  }
}

function onDrop(dropResult) {
  menuItems.value = applyDrag(menuItems.value, dropResult);
}

function onDropChild(parentIndex, dropResult) {
  if (parentIndex >= 0 && parentIndex < menuItems.value.length) {
    const newItems = [...menuItems.value];
    newItems[parentIndex].children = applyDrag(newItems[parentIndex].children || [], dropResult);
    menuItems.value = newItems;
  }
}

function applyDrag(arr, dragResult) {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
}

function getChildPayload(index) {
  return (childIndex) => {
    const parent = menuItems.value[index];
    return parent && parent.children ? parent.children[childIndex] : null;
  };
}

function getParentPayload() {
  return (index) => menuItems.value[index];
}

function addParentMenu() {
  if (newParentTitle.value.trim() === '') return;

  const newParent = {
    id: `new-parent-${Date.now()}`,
    title: newParentTitle.value,
    active: true,
    slug: `/${newParentTitle.value.toLowerCase().replace(/ /g, '-')}`,
    order: menuItems.value.length,
    parent_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    children: []
  };

  menuItems.value.push(newParent);
  newParentTitle.value = '';
}

function addChildMenu(parentIndex) {
  if (parentIndex < 0 || parentIndex >= menuItems.value.length) {
    console.error('Invalid parent index');
    return;
  }
  const parent = menuItems.value[parentIndex];
  if (!parent || !parent.id) {
    console.error('Parent item is undefined or missing id');
    return;
  }
  const parentId = parent.id;
  if (!newChildTitles.value[parentId] || newChildTitles.value[parentId].trim() === '') {
    console.error('New child title is empty');
    return;
  }

  const newChild = {
    id: `new-child-${Date.now()}`,
    title: newChildTitles.value[parentId],
    active: true,
    slug: `${parent.slug}/${newChildTitles.value[parentId].toLowerCase().replace(/ /g, '-')}`,
    order: parent.children ? parent.children.length : 0,
    parent_id: parentId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (!parent.children) {
    parent.children = [];
  }
  parent.children.push(newChild);
  newChildTitles.value[parentId] = '';
}

function deleteParentMenu(index) {
  if (index < 0 || index >= menuItems.value.length) {
    console.error('Invalid index for deleteParentMenu');
    return;
  }
  menuItems.value.splice(index, 1);
}

function deleteChildMenu(parentIndex, childIndex) {
  if (parentIndex < 0 || parentIndex >= menuItems.value.length) {
    console.error('Invalid parent index for deleteChildMenu');
    return;
  }
  const parent = menuItems.value[parentIndex];
  if (!parent || !parent.children || childIndex < 0 || childIndex >= parent.children.length) {
    console.error('Invalid child index or parent has no children');
    return;
  }
  parent.children.splice(childIndex, 1);
}

function startEditing(item) {
  editingItem.value = {...item};
  isModalOpen.value = true;
}

function saveEdit() {
  if (!editingItem.value || !editingItem.value.id) {
    console.error('Editing item is undefined or missing id');
    return;
  }
  const index = menuItems.value.findIndex(item => item && item.id === editingItem.value.id);
  if (index !== -1) {
    menuItems.value[index] = {...editingItem.value};
  } else {
    // Check if it's a child item
    let found = false;
    menuItems.value.forEach(parent => {
      if (!parent || !parent.children) return;
      const childIndex = parent.children.findIndex(child => child && child.id === editingItem.value.id);
      if (childIndex !== -1) {
        parent.children[childIndex] = {...editingItem.value};
        found = true;
      }
    });
    if (!found) {
      console.error('Could not find item to edit');
      return;
    }
  }
  closeModal();
}

function cancelEdit() {
  closeModal();
}

function closeModal() {
  editingItem.value = null;
  isModalOpen.value = false;
}

async function saveMenuStructure() {
  errorMessage.value = '';
  successMessage.value = '';
  try {
    const { data, error } = await useFetch('/api/control/menu', {
      method: 'POST',
      body: menuItems.value
    });

    if (error.value) {
      throw error.value;
    }

    successMessage.value = 'Menu structure saved successfully';
    console.log('Save response:', data.value);
  } catch (e) {
    console.error('Error saving menu structure:', e);
    errorMessage.value = 'Failed to save menu structure. Please try again.';
  }
}
</script>

<template>
  <div class="p-4">
    <UAlert v-if="errorMessage" color="red" class="mb-4">{{ errorMessage }}</UAlert>
    <UAlert v-if="successMessage" color="green" class="mb-4">{{ successMessage }}</UAlert>

    <UCard class="mb-4">
      <template #header>
        <h3 class="text-lg font-semibold">Add New Parent Menu</h3>
      </template>
      <UForm @submit.prevent="addParentMenu">
        <UFormGroup label="Parent Menu Title">
          <UInput v-model="newParentTitle" placeholder="Enter parent menu title"/>
        </UFormGroup>
        <UButton type="submit" color="primary" class="mt-2">Add Parent Menu</UButton>
      </UForm>
    </UCard>

    <Container @drop="onDrop" :get-child-payload="getParentPayload()">
      <Draggable v-for="(item, index) in menuItems" :key="item?.id">
        <UCard class="mb-4">
          <template #header>
            <div class="flex justify-between items-center">
              <h4 class="text-lg font-semibold">{{ item?.title }}</h4>
              <div>
                <UButton color="primary" size="sm" @click="startEditing(item)" icon="i-heroicons-pencil-square"/>
                <UButton color="danger" size="sm" @click="deleteParentMenu(index)" icon="i-heroicons-trash" class="ml-2"/>
              </div>
            </div>
          </template>

          <Container group-name="menu" @drop="(dropResult) => onDropChild(index, dropResult)"
                     :get-child-payload="getChildPayload(index)">
            <Draggable v-for="(child, childIndex) in item?.children" :key="child?.id">
              <div class="flex justify-between items-center p-2 bg-gray-100 rounded mb-2">
                <span>{{ child?.title }}</span>
                <div>
                  <UButton color="primary" size="xs" @click="startEditing(child)" icon="i-heroicons-pencil-square"/>
                  <UButton color="danger" size="xs" @click="deleteChildMenu(index, childIndex)" icon="i-heroicons-trash" class="ml-2"/>
                </div>
              </div>
            </Draggable>
          </Container>

          <template #footer>
            <UForm @submit.prevent="() => addChildMenu(index)" class="mt-4">
              <UFormGroup label="Add Child Menu">
                <UInput v-model="newChildTitles[item?.id]" placeholder="Enter child menu title"/>
              </UFormGroup>
              <UButton type="submit" color="primary" size="sm" class="mt-2">Add Child Menu</UButton>
            </UForm>
          </template>
        </UCard>
      </Draggable>
    </Container>

    <UButton color="success" @click="saveMenuStructure" class="mt-4">Save Menu Structure</UButton>

    <UModal v-model="isModalOpen">
      <UCard v-if="editingItem">
        <template #header>
          <h3 class="text-lg font-semibold">Edit Menu Item</h3>
        </template>
        <UForm @submit.prevent="saveEdit">
          <UFormGroup label="Title">
            <UInput v-model="editingItem.title"/>
          </UFormGroup>
          <UFormGroup label="Slug">
            <UInput v-model="editingItem.slug"/>
          </UFormGroup>
          <UFormGroup label="Active">
            <USwitch v-model="editingItem.active"/>
          </UFormGroup>
          <div class="flex justify-end space-x-2 mt-4">
            <UButton color="gray" @click="cancelEdit">Cancel</UButton>
            <UButton type="submit" color="primary">Save</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>