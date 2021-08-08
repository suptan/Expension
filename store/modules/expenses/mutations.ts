import { MutationTree } from 'vuex'
import { ExpensesMutationTypes } from './mutation-types'
import { Expense, ExpenseState } from '~/types'

export type Mutations<S = ExpenseState> = {
  [ExpensesMutationTypes.ADD](state: S, newValue: string): void
  [ExpensesMutationTypes.REMOVE](state: S, value: string): void
  [ExpensesMutationTypes.UPDATE](state: S, payload: Expense): void
}

const mutations: MutationTree<ExpenseState> & Mutations = {
  [ExpensesMutationTypes.ADD](state, newValue: string) {
    console.log(state, newValue)
  },
  [ExpensesMutationTypes.REMOVE](state, value: string) {
    console.log(state, value)
  },
  [ExpensesMutationTypes.UPDATE](state, payload: Expense) {
    console.log(state, payload)
  },
}

export default mutations
