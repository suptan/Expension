<template>
  <main>
    <List @drop="handleDrop($event)">
      <CategoryItem v-for="item in categories"
                    :key="item.order"
                    :item="item"
                    @dragstart="startDrag($event, item)"
                    @dragenter="handleDragEnter($event, item)"
                    @remove="handleRemove(item.name)"
      />
    </List>
    <StyledCategoriesFooter>
      <a-form layout="horizontal" :form="form" @submit="handleSubmit">
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
          <li>&#8220;{{ selectedItem }}&#8221; will be removed</li>
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
import { Category } from '~/types'
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
      dragItem: null,
      dropItem: null,
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

      this.$accessor.categories.add(name)
      this.$data.form.resetFields(['name'])
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

  startDrag(evt: DragEvent, item: Category) {
    if (!evt.dataTransfer) {
      return
    }

    evt.dataTransfer.dropEffect = 'move'
    evt.dataTransfer.effectAllowed = 'move'

    this.$data.dragItem = item;
  }

  handleDragEnter(evt: DragEvent, item: Category) {
    evt.preventDefault()
    this.$data.dropItem = item
  }

  handleDrop(evt: DragEvent) {
    evt.preventDefault()
    if (!evt.dataTransfer) {
      return
    }

    this.$accessor.categories.sort({ firstItem: this.$data.dragItem, secondItem: this.$data.dropItem })
  }
}
</script>
