<template>
  <main>
    <ul>
      <ListItem v-for="item in categories" :key="item">{{ item }}</ListItem>
    </ul>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class CategoriesPage extends Vue {
  created() {
    // TODO: should init on app initial not page
    this.$accessor.categories.initialiseStore()
  }

  get categories() {
    return this.$accessor.categories.list
  }
}
</script>
