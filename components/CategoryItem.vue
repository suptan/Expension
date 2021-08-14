<template>
  <ListItem v-if="isEdit">
    <CategoryUpdatedForm :item="item"
                         @postupdated="handlePostUpdated"
                         @cancel.stop="handlePostUpdated"
    />
  </ListItem>
  <ListItem v-else
            :draggable="true"
            :clickable="true"
            @click="handleEdit"
            @dragstart="$emit('dragstart', $event)"
            @dragenter="$emit('dragenter', $event)"
  >
    <span>{{ item.name }}</span>
    <CrossOutlined v-if="!item.isMain" @click="$emit('remove', $event)" />
  </ListItem>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useStore,
} from '@nuxtjs/composition-api'
import CategoryUpdatedForm from './CategoryUpdatedForm.vue'
import { CategoriesAction } from '~/store/modules/categories/action-types'
import { CategoriesUpdatePayload, Category, Store } from '~/types'

export default defineComponent({
  name: 'CategoryItem',
  components: { CategoryUpdatedForm },
  props: {
    item: {
      type: Object as PropType<Category>,
      default: () => ({}),
    }
  },
  setup(props) {
    const store = useStore<Store>()
    const isEdit = ref(false)
    const { item } = props
    const updateCategory = (payload: CategoriesUpdatePayload) => {
      try {
        store.dispatch(CategoriesAction.UPDATE, payload)
      } catch (error) {
        console.log(error)
      }
    }
    const handleEdit = () => {
      if (item.isMain) {
        return
      }

      isEdit.value = true
    }
    const handlePostUpdated = () => {
      isEdit.value = false
    }

    return {
      isEdit,
      updateCategory,
      handleEdit,
      handlePostUpdated,
    }
  },
})
</script>
