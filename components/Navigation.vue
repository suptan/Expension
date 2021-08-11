<template>
  <nav>
    <Menu>
      <MenuItem v-for="menu in menus"
                :key="menu.name"
                :active="menu.path === path"
                @click="handleClick(menu.path)"
      >
        {{ menu.name }}
      </MenuItem>
    </Menu>
  </nav>
</template>

<script lang="ts">
import { useRouter } from '@nuxtjs/composition-api'
import { defineComponent, reactive, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const router = useRouter()
    const menus = reactive(
      [{
        name: 'Expense',
        path: '/',
      },{
        name: 'Category',
        path: '/categories',
      }]
    )
    const path = ref(router.currentRoute.path)
    
    function handleClick(nextPath: string) {
      router.push(nextPath)
      path.value = nextPath
    }
    
    return {
      menus,
      path,
      handleClick,
    }
  },
})
</script>