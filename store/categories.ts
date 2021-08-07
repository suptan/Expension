import { mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  list: new Set<string>(),
})

type RootState = ReturnType<typeof state>

export const getters = {
  list: (state: RootState) => state.list,
}

export const mutations = mutationTree(state, {
  addCategory(state, newValue: string) {
    state.list.add(newValue)
    localStorage.setItem('categories', `${localStorage.getItem('categories')},${newValue}`)
  },
  removeCategory(state, newValue: string) {
    state.list.delete(newValue)
    localStorage.setItem('categories', [...state.list].join(','))
  },
  initialiseStore(state) {
    console.log('initialised')
    if (!localStorage.getItem('categories')) {
      localStorage.setItem('categories', 'Food,Transportation,Entertainment,Work')
    }

    state.list = new Set(localStorage.getItem('categories')?.split(','))
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
  }
)
