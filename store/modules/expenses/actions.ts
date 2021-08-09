import { ActionTree, ActionContext } from 'vuex'
import { ExpenseActionTypes } from './action-types'
import { ExpensesMutationTypes } from './mutation-types'
import { Mutations } from './mutations'
import { Expense, ExpenseState, RootState } from '~/types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<ExpenseState, RootState>, 'commit'>

export interface Actions {
  [ExpenseActionTypes.ADD](
    a: AugmentedActionContext,
    payload: Expense
  ): void
  [ExpenseActionTypes.REMOVE](
    a: AugmentedActionContext,
    payload: Expense
  ): void
  [ExpenseActionTypes.UPDATE](
    a: AugmentedActionContext,
    payload: Expense
  ): void
}

const actions: ActionTree<ExpenseState, RootState> & Actions = {
  [ExpenseActionTypes.ADD]({ commit }, payload) {
    commit(ExpensesMutationTypes.ADD, payload)
  },
  [ExpenseActionTypes.REMOVE]({ commit }, payload) {
    commit(ExpensesMutationTypes.REMOVE, payload)
  },
  [ExpenseActionTypes.UPDATE]({ commit }, payload) {
    commit(ExpensesMutationTypes.UPDATE, payload)
  },
}

export default actions
