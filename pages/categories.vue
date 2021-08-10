<template>
  <section>
    <Header>
      <PageTitle>Category List</PageTitle>
    </Header>
    <StyledContent>
      <List @drop="handleDrop($event)">
        <CategoryItem v-for="item in categories"
                      :key="item.order"
                      :item="item"
                      @dragstart="startDrag($event, item)"
                      @dragenter.prevent="handleDragEnter(item)"
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
    </StyledContent>
    <a-modal v-model="displayConfirmRemove"
             ok-text="Confirm"
             :closable="false"
             @ok="handleRemoveConfirm"
    >
      <strong>
        <List list-style="disc">
          <li>&#8220;{{ selectedItem }}&#8221; will be removed</li>
          <li>All expense with this category will also be removed</li>
        </List>
        <br />
        <p>
            Do you really want to remove?
        </p>
      </strong>
    </a-modal>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import { StyledCategoriesFooter } from '../styled-components/CategoriesFooter'
import { StyledContent } from '../styled-components/Content'
import { CategoriesAction } from '~/store/modules/categories/action-types'
import { CategoriesSortPayload, Category, Store } from '~/types'
import { ExpenseAction } from '~/store/modules/expenses/action-types'

type CategoriesPageData = {
  displayConfirmRemove?: boolean,
  dragItem?: Category,
  dropItem?: Category,
  form: WrappedFormUtils,
  selectedItem: string,
}

type FormState = {
  name: string
}

export default defineComponent({
  components: { StyledCategoriesFooter, StyledContent },
  setup() {
    const store = useStore<Store>()
    const categories = computed(() => (store.state.categories.list))
    const addCategory = (payload: string) => {
      try {
        store.dispatch(CategoriesAction.ADD, payload)
      } catch (error) {
        console.error(error)
      }
    }
    const removeCategory = (payload: string) => {
      try {
        store.dispatch(CategoriesAction.REMOVE, payload)
        store.dispatch(ExpenseAction.REMOVE_ALL_BY_CATEGORY, payload)
      } catch (error) {
        console.error(error)
      }
    }
    const sortCategory = (payload: CategoriesSortPayload) => {
      try {
        store.dispatch(CategoriesAction.SORT, payload)
      } catch (error) {
        console.error(error)
      }
    }

    return {
      addCategory,
      categories,
      removeCategory,
      sortCategory,
    }
  },
  data(): CategoriesPageData {
    return {
      displayConfirmRemove: false,
      dragItem: undefined,
      dropItem: undefined,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      selectedItem: '',
    }
  },
  methods: {
    handleSubmit(evt: Event) {
      evt.preventDefault()
      this.form.validateFields((error: Error[], values: FormState) => {
        if (error) {
          return
        }
        const { name } = values

        this.addCategory(name)
        this.form.resetFields(['name'])
      })
    },
    handleRemove(name: string) {
      this.selectedItem = name
      this.displayConfirmRemove = true
    },
    handleRemoveConfirm() {
      this.removeCategory(this.selectedItem)
      this.displayConfirmRemove = false
    },
    startDrag(evt: DragEvent, item: Category) {
      if (!evt.dataTransfer) {
        return
      }

      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'

      this.dragItem = item
    },
    handleDragEnter(item: Category) {
      this.dropItem = item
    },
    handleDrop(evt: DragEvent) {
      evt.preventDefault()
      if (!evt.dataTransfer || !this.dragItem || !this.dropItem) {
        return
      }

      this.sortCategory({ firstItem: this.dragItem, secondItem: this.dropItem })
    },
  }
})
</script>
