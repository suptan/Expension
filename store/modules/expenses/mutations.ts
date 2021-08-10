import { MutationTree } from 'vuex'
import { ExpensesMutationTypes } from './mutation-types'
import { Expense, ExpenseState } from '~/types'
import { StorageKeys } from '~/utils/const'

export type Mutations<S = ExpenseState> = {
  [ExpensesMutationTypes.ADD](state: S, newValue: Expense): void
  [ExpensesMutationTypes.REMOVE](state: S, targetId: string): void
  [ExpensesMutationTypes.UPDATE](state: S, payload: Expense): void
}

const mutations: MutationTree<ExpenseState> & Mutations = {
  [ExpensesMutationTypes.ADD](state, newValue: Expense) {
    state.data = [...state.data, newValue]

    localStorage.setItem(StorageKeys.Expenses, JSON.stringify(state.data))
  },
  [ExpensesMutationTypes.REMOVE](state, targetId: string) {
    state.data = state.data.filter(({ id }) => id !== targetId)

    localStorage.setItem(StorageKeys.Expenses, JSON.stringify(state.data))
  },
  [ExpensesMutationTypes.UPDATE](state, payload: Expense) {
    state.data = state.data.map(expense => {
      if (expense.id === payload.id) {
        return payload
      }

      return expense
    })
    
    localStorage.setItem(StorageKeys.Expenses, JSON.stringify(state.data))
  },
}

export default mutations
