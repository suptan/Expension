import { Form } from 'ant-design-vue'
import { CategoriesStore } from '~/store/modules/categories'

declare module 'vue/types/vue' {
  interface Vue {
    $form: Form
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $form: Form
  }
}

interface Category {
  name: string
  isMain: boolean
  order: number
}

type CategoriesUpdatePayload = {
  oldValue: string
  newValue: string 
}

type CategoriesSortPayload = {
  firstItem: Category
  secondItem: Category
}

interface MainState {
  version: string
  $localForage: any
}


interface CategoryState {
  list: Category[]
}

type RootState = {
  categories: CategoryState
}

type Store = CategoriesStore<Pick<RootState, 'categories'>>
