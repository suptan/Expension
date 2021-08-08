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
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  data() {
    const { path } = this.$router.currentRoute
    const menus = [{
      name: 'Expense',
      path: '/expense',
    },{
      name: 'Category',
      path: '/categories',
    }]
    
    return {
      menus,
      path,
    }
  },
  methods: {
    handleClick(path: string) {
      this.$router.push(path)
      this.path = path
    }
  }
})
</script>