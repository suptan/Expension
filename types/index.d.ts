import { Form } from 'ant-design-vue'
import { CategoriesStore } from '~/store/modules/categories'
import { ExpensesStore, ExpenseTypeEnum } from '~/store/modules/expenses'

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
  
interface Expense {
  type: ExpenseTypeEnum
  category: Category
  date: Date
  amount: number
  description: string
}

interface DisplayExpense extends Expense {
  key: string
  sign: string
  color: string
}

interface MonthlyExpense {
  month: number
  year: number
  total: number
  transactions: DisplayExpense[]
  sign: string
  color: string
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

interface ExpenseState {
  data: Expense[]
}

type RootState = {
  categories: CategoryState
  expenses: ExpenseState
}

type Store = CategoriesStore<Pick<RootState, 'categories'>> &
  ExpensesStore<Pick<RootState, 'expenses'>>
