import { GetterTree } from 'vuex'
import { ExpenseState, Expense, RootState } from '~/types'

export type Getters = {
  data(state: ExpenseState): Expense[]
}

const getters: GetterTree<ExpenseState, RootState> = {
  data: ({ data }) => data,
}

export default getters
