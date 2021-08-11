<template>
  <ListItem v-if="isEdit">
      <a-form layout="inline" :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            v-decorator="['name', { initialValue: item.name, rules: [{ required: true, message: 'Please input the name!' }] }]"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="danger" @click="handleDiscard">
            Cancel
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            Save
          </a-button>
        </a-form-item>
      </a-form>
  </ListItem>
  <ListItem v-else
            :draggable="true"
            :clickable="true"
            @dragstart="$emit('dragstart', $event)"
            @dragenter="$emit('dragenter', $event)"
  >
    <span @click="handleEdit">{{ item.name }}</span>
    <CrossOutlined v-if="!item.isMain" @click="$emit('remove', item)" />
  </ListItem>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useStore,
} from '@nuxtjs/composition-api'
import { CategoriesAction } from '~/store/modules/categories/action-types'
import { CategoriesUpdatePayload, Category, Store } from '~/types'

type FormState = {
  name: string
}

export default defineComponent({
  name: 'CategoryItem',
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
    const handleDiscard = () => {
      isEdit.value = false
    }

    return {
      isEdit,
      updateCategory,
      handleEdit,
      handleDiscard,
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, {
        name: 'editCategory',
      }),
    }
  },
  methods: {
    handleSubmit(e: Event) {
      e.preventDefault()
      this.form.validateFields((error: Error[], values: FormState) => {
        if (error) {
          return
        }
        const { name } = values

        this.updateCategory({ oldValue: this.$props.item.name, newValue: name })
        this.isEdit = false
      })
    },
  }
})
</script>
