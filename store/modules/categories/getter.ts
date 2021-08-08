import { GetterTree } from 'vuex'
import { Category, CategoryState, RootState } from '~/types'

export type Getters = {
  list(state: CategoryState): Category[]
}

const getters: GetterTree<CategoryState, RootState> = {
  list: ({ list }) => list,
}

export default getters
