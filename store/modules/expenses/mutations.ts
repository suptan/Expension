import { MutationTree } from 'vuex'
import { ExpensesMutationTypes } from './mutation-types'
import { storageKey } from '.'
import { Expense, ExpenseState } from '~/types'

export type Mutations<S = ExpenseState> = {
  [ExpensesMutationTypes.ADD](state: S, newValue: Expense): void
  [ExpensesMutationTypes.REMOVE](state: S, value: Expense): void
  [ExpensesMutationTypes.UPDATE](state: S, payload: Expense): void
}

const mutations: MutationTree<ExpenseState> & Mutations = {
  [ExpensesMutationTypes.ADD](state, newValue: Expense) {
    state.data = [...state.data, newValue]

    localStorage.setItem(storageKey, JSON.stringify(state.data))
  },
  [ExpensesMutationTypes.REMOVE](state, value: Expense) {
    console.log(state, value)
  },
  [ExpensesMutationTypes.UPDATE](state, payload: Expense) {
    console.log(state, payload)
  },
}

export default mutations
