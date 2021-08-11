import { MutationTree } from 'vuex'
import { CategoriesMutationTypes } from './mutation-types'
import {
  CategoriesSortPayload,
  CategoriesUpdatePayload,
  Category,
  CategoryState
} from '~/types'
import { StorageKeys } from '~/utils/const'

export type Mutations<S = CategoryState> = {
  [CategoriesMutationTypes.ADD](state: S, newValue: string): void
  [CategoriesMutationTypes.REMOVE](state: S, value: string): void
  [CategoriesMutationTypes.UPDATE](state: S, payload: CategoriesUpdatePayload): void
  [CategoriesMutationTypes.SORT](state: S, payload: CategoriesSortPayload): void
}

const mutations: MutationTree<CategoryState> & Mutations = {
  [CategoriesMutationTypes.ADD](state, newValue: string) {
    const unique = new Set(state.list.map(s => s.name))

    if (unique.has(newValue)) {
      // TODO: feedback duplication error
      console.debug('Add duplicate category')
      return
    }

    // Tricky part when dealing with Array or object in vuex state
    const newList = [...state.list]
    newList.push({ isMain: false, order: state.list.length + 1, name: newValue })
    state.list = newList

    localStorage.setItem(StorageKeys.Categories, JSON.stringify(newList))
  },
  [CategoriesMutationTypes.REMOVE](state, value: string) {
    const list = state.list.reduce((acc: Category[], cur: Category) => {
      if (cur.name !== value) {
        acc.push({
          ...cur,
          order: acc.length + 1,
        })
      }

      return acc
    }, [])

    if (list.length === state.list.length) {
      console.debug('Item not found')
      return
    }

    state.list = list

    localStorage.setItem(StorageKeys.Categories, JSON.stringify(list))
  },
  [CategoriesMutationTypes.UPDATE](state, { oldValue, newValue }: CategoriesUpdatePayload) {
    state.list = state.list.map(item => {
      if (item.name === oldValue) {
        item.name = newValue
      }

      return item
    })

    localStorage.setItem(StorageKeys.Categories, JSON.stringify(state.list))
  },
  [CategoriesMutationTypes.SORT](state, { firstItem, secondItem }: CategoriesSortPayload) {
    const list = [...state.list]
    const { order: aIdx } = firstItem
    const { order: bIdx } = secondItem
    
    ;[list[aIdx - 1], list[bIdx - 1]] = [list[bIdx - 1], list[aIdx - 1]]
    ;[list[aIdx - 1].order, list[bIdx - 1].order] = [aIdx, bIdx]

    state.list = list
    
    localStorage.setItem(StorageKeys.Categories, JSON.stringify(state.list))
  },
}

export default mutations
