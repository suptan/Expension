<template v-else>
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
  <ListItem v-else @dragstart="$emit('dragstart', $event)" @dragenter="$emit('dragenter', $event)">
    <span @click="handleEdit">{{ item.name }}</span>
    <CrossOutlined v-if="clickable" @click="$emit('remove', item)" />
</ListItem>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Category } from '~/types'

type FormState = {
  name: string
}

type FormStateError = {
  name: {
    error: Error[]
  }
}

@Component
export default class CategoriesItem extends Vue {
  @Prop({ default: {} })
  item!: Category

  data() {
    return {
      clickable: !this.item.isMain,
      form: this.$form.createForm(this, {
        name: 'editCategory',
      }),
      isEdit: false,
    }
  }

  handleEdit() {
    this.$data.isEdit = true
  }

  handleSubmit(e: Event) {
    e.preventDefault()
    this.$data.form.validateFields((error: FormStateError, values: FormState) => {
      if (error) {
        return
      }
      const { name } = values

      this.$accessor.categories.update({ oldValue: this.$props.item.name, newValue: name })
      this.$data.isEdit = false
    });
  }

  handleRemove(name: string) {
    this.$data.selectedItem = name
    this.$data.displayConfirmRemove = true
  }

  handleRemoveConfirm() {
    this.$accessor.categories.remove(this.$data.selectedItem)
    this.$data.displayConfirmRemove = false
  }

  handleDiscard() {
    this.$data.isEdit = false
  }
}
</script>
