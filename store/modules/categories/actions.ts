import { ActionTree, ActionContext } from 'vuex'
import { CategoriesActionTypes } from './action-types'
import { CategoriesMutationTypes } from './mutation-types'
import { Mutations } from './mutations'
import { CategoriesSortPayload, CategoriesUpdatePayload, CategoryState, RootState } from '~/types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
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
    payload: CategoriesSortPayload
  ): void
}

const actions: ActionTree<CategoryState, RootState> & Actions = {
  [CategoriesActionTypes.ADD]({ commit }, payload) {
    commit(CategoriesMutationTypes.ADD, payload)
  },
  [CategoriesActionTypes.REMOVE]({ commit }, payload) {
    commit(CategoriesMutationTypes.REMOVE, payload)
  },
  [CategoriesActionTypes.UPDATE]({ commit }, payload) {
    commit(CategoriesMutationTypes.UPDATE, payload)
  },
  [CategoriesActionTypes.SORT]({ commit }, payload) {
    commit(CategoriesMutationTypes.SORT, payload)
  },
}

export default actions
