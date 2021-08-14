<template>
  <a-form layout="inline" :form="form" @submit.prevent="handleSubmit">
    <a-form-item>
      <a-input
        v-decorator="['name', nameConfig]"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="danger" @click="$emit('cancel', $event)">
        Cancel
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">
        Save
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { useStore } from '@nuxtjs/composition-api'
import { defineComponent, PropType } from '@vue/composition-api'
import { CategoriesAction } from '~/store/modules/categories/action-types'
import { CategoriesUpdatePayload, Category, Store } from '~/types'

type FormState = {
  name: string
}

export default defineComponent({
  name: 'CategoryUpdateForm',
  props: {
    item: {
      type: Object as PropType<Category>,
      default: () => ({}),
    }
  },
  setup(props, context) {
    const store = useStore<Store>()
    const updateCategory = (payload: CategoriesUpdatePayload) => {
      try {
        store.dispatch(CategoriesAction.UPDATE, payload)
      } catch (error) {
        console.log(error)
      }
    }
    const nameConfig = {
      initialValue: props.item.name,
      rules: [
        { transform: (value: string) => value.trim() },
        { required: true, message: 'Please input the name!' },
      ],
    }

    return {
      nameConfig,
      updateCategory,
      closeForm() {
        context.emit('postupdated')
      },
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
    handleSubmit() {
      this.form.validateFields((error: Error[], values: FormState) => {
        if (error) {
          return
        }
        const { name } = values
        const normailizeName = name.trim()

        this.updateCategory({ oldValue: this.$props.item.name, newValue: normailizeName })
        this.closeForm()
      })
    },
  }
})
</script>
