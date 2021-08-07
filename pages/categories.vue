<template>
  <main>
    <List>
      <ListItem v-for="(item, index) in categories"
                :key="item"
                :removeable="index > 3"
                @remove="handleRemove(item)"
      >
        {{ item }}
      </ListItem>
    </List>
    <StyledCategoriesFooter>
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
    </StyledCategoriesFooter>
    <a-modal v-model="displayConfirmRemove"
             okText="Confirm"
             :closable="false"
             @ok="handleRemoveConfirm"
    >
      <strong>
        <List listStyle="disc">
          <li>{{ selectedItem }} will be removed</li>
          <li>All expense with this category will also be removed</li>
        </List>
        <br />
        <p>
            Do you really want to remove?
        </p>
      </strong>
    </a-modal>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { StyledCategoriesFooter } from "../styled-components/CategoriesFooter"

type FormState = {
  name: string
}

type FormStateError = {
  name: {
    error: Error[]
  }
}

@Component({
  components: {
    StyledCategoriesFooter,
  },
})
export default class CategoriesPage extends Vue {

  data() {
    return {
      displayConfirmRemove: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      selectedItem: null,
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
    this.$data.selectedItem = name
    this.$data.displayConfirmRemove = true
  }

  handleRemoveConfirm() {
    this.$accessor.categories.removeCategory(this.$data.selectedItem)
    this.$data.displayConfirmRemove = false
  }
}
</script>
