import { getAccessorType, mutationTree } from 'typed-vuex'
import * as categories from './categories'

export const state = () => ({})

export const mutations = mutationTree(state, {
  initialiseStore() {
    console.log('initialized')
  },
})

export const accessorType = getAccessorType({
  mutations,
  state,
  modules: {
    categories,
  },
})
