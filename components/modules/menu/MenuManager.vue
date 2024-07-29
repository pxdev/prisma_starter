<script setup>
import { useSortable } from '@vueuse/integrations/useSortable'
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

const animation = 200

const { option } = useSortable(el, menuItems, {
  animation
})

// You can use the option method to set and get the option of Sortable
option('animation', animation)


</script>
<template>

  <br><br><br><br><br><br><br><br><br><br>

  <div ref="el">
    <div class="border bg-gray-50 p-3 mb-2 transition-all ease-in-out" v v-for="item in menuItems" :key="item.id">
      {{ item.title }}
    </div>
  </div>

  <pre>
    {{menuItems}}
  </pre>

   <div class="menu-manager">
   </div>

</template>
