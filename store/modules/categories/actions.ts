import { ActionTree, ActionContext, CommitOptions } from 'vuex'
import { ExpensesMutationTypes } from '../expenses/mutation-types'
import { CategoriesActionTypes } from './action-types'
import { CategoriesMutationTypes } from './mutation-types'
import { Mutations } from './mutations'
import { CategoriesUpdatePayload, Category, CategoryState, RootState } from '~/types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<CategoryState, RootState>, 'commit'>

export interface Actions {
  [CategoriesActionTypes.ADD](
    a: AugmentedActionContext,
    payload: string
  ): void
  [CategoriesActionTypes.REMOVE](
    a: AugmentedActionContext,
    payload: string
  ): void
  [CategoriesActionTypes.UPDATE](
    a: AugmentedActionContext,
    payload: CategoriesUpdatePayload
  ): void
  [CategoriesActionTypes.SORT](
    a: AugmentedActionContext,
    payload: Category[]
  ): void
}

const actions: ActionTree<CategoryState, RootState> & Actions = {
  [CategoriesActionTypes.ADD]({ commit }, payload) {
    commit(CategoriesMutationTypes.ADD, payload)
  },
  [CategoriesActionTypes.REMOVE]({ commit }, payload) {
    commit(CategoriesMutationTypes.REMOVE, payload)
    // TODO: find out how to generate type for this action
    // @ts-ignore
    commit(`expenses/${ExpensesMutationTypes.REMOVE_ALL_BY_CATEGORY}`, payload, { root: true })
  },
  [CategoriesActionTypes.UPDATE]({ commit }, payload) {
    commit(CategoriesMutationTypes.UPDATE, payload)
  },
  [CategoriesActionTypes.SORT]({ commit }, payload) {
    commit(CategoriesMutationTypes.SORT, payload)
  },
}

export default actions
