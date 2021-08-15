<template>
  <section>
    <Header>
      <PageTitle>Category List</PageTitle>
    </Header>
    <StyledContent>
      <draggable v-model="categories" group="people" tag="ul" @start="dragging = true" @end="dragging = false" @input="handleDrop">
        <CategoryItem v-for="item in categories"
                      :key="item.order"
                      :item="item"
                      @remove.stop="handleRemove(item.name)"
        />
      </draggable>
      <StyledCategoriesFooter>
        <a-form layout="horizontal" :form="form" @submit.prevent="handleSubmit">
          <a-form-item>
            <a-input
              v-decorator="['name', nameConfig]"
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
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'
import draggable from 'vuedraggable'
import { StyledCategoriesFooter } from '../styled-components/CategoriesFooter'
import { StyledContent } from '../styled-components/Content'
import { CategoriesAction } from '~/store/modules/categories/action-types'
import { Category, Store } from '~/types'

type FormState = {
  name: string
}

export default defineComponent({
  components: { StyledCategoriesFooter, StyledContent, draggable },
  setup() {
    const store = useStore<Store>()
    const categories = computed(() => store.state.categories.list)
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
      } catch (error) {
        console.error(error)
      }
    }
    const sortCategory = (payload: Category[]) => {
      try {
        store.dispatch(CategoriesAction.SORT, payload)
      } catch (error) {
        console.error(error)
      }
    }
    const displayConfirmRemove = ref(false)
    const selectedItem = ref('')
    const dragging = ref(false)

    function handleDrop(newList: Category[]) {
      sortCategory(newList)
    }
    function handleRemove(name: string) {
      selectedItem.value = name
      displayConfirmRemove.value = true
    }
    function handleRemoveConfirm() {
      removeCategory(selectedItem.value)
      displayConfirmRemove.value = false
    }
    const nameConfig =  {
      rules: [
        { transform: (value: string | undefined) => value?.trim() },
        { required: true, message: 'Please input the name!' },
      ],
    }

    return {
      categories,
      displayConfirmRemove,
      selectedItem,
      dragging,
      nameConfig,
      addCategory,
      removeCategory,
      sortCategory,
      handleDrop,
      handleRemove,
      handleRemoveConfirm,
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  methods: {
    handleSubmit() {
      this.form.validateFields((error: Error[], values: FormState) => {
        if (error) {
          return
        }
        const { name } = values

        this.addCategory(name.trim())
        this.form.resetFields(['name'])
      })
    },
  }
})
</script>
