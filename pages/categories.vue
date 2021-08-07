<template>
  <main>
    <ul>
      <ListItem v-for="(item, index) in categories"
                :key="item"
                :removeable="index > 3"
                @remove="handleRemove(item)">
        {{ item }}
      </ListItem>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: 'Please input the name!' }] }]"
          />
        </a-form-item>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit">
              Add
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </ul>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

type FormState = {
  name: string
}

type FormStateError = {
  name: {
    error: Error[]
  }
}

@Component
export default class CategoriesPage extends Vue {

  data() {
    return {
    formLayout: 'horizontal',
    form: this.$form.createForm(this, { name: 'coordinated' })
    }
  }

  get categories() {
    return this.$accessor.categories.list
  }

  created() {
    // TODO: should init on app initial not page
    this.$accessor.categories.initialiseStore()
  }

  handleSubmit(e: Event) {
    e.preventDefault()
    this.$data.form.validateFields((error: FormStateError, values: FormState) => {
      if (error) {
        return
      }
      const { name } = values

      this.$accessor.categories.addCategory(name)
      this.$data.form.resetFields(['name'])
    });
  }

  handleRemove(name: string) {
    this.$accessor.categories.removeCategory(name)
  }
}
</script>
