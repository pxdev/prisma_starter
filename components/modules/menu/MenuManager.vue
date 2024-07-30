<script setup>
import {Container, Draggable} from "vue-dndrop";

const el = ref(null)
const menuItems = ref([])

onMounted(async () => {
  await fetchMenuItems()
})

async function fetchMenuItems() {
  try {
    const response = await $fetch('/api/control/menu', {
      method: 'GET'
    })
    menuItems.value = response.data.module
  } catch (e) {
    console.log(e)
  }
}

const MyEvent = (event) => {
  console.log(event)
 }


</script>
<template>

  <u-container class="bg-red-100">
    <br><br><br><br><br><br><br><br><br><br>


    <container>
      <draggable v-for="item in menuItems" :key="item.id">
        <div class="draggable-item border mb-1 p-2 bg-white">
          {{ item.title }}
        </div>
        <div class="mx-4">
          <container>
            <draggable v-for="child in item.children" :key="child.id">
              <div class="draggable-item border mb-1 p-2 bg-white">
                {{ child.title }}
              </div>
            </draggable>
          </container>
        </div>
      </draggable>
    </container>

    <pre>{{ menuItems }}</pre>


  </u-container>
</template>
