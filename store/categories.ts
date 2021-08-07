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
    // Tricky part when dealing with Array or object in vuex state
    const newSet = new Set(state.list)
    state.list = newSet

    localStorage.setItem('categories', `${localStorage.getItem('categories')},${newValue}`)
  },
  removeCategory(state, value: string) {
    state.list.delete(value)
    // Tricky part when dealing with Array or object in vuex state
    const newSet = new Set(state.list)
    state.list = newSet

    localStorage.setItem('categories', [...state.list].join(','))
  },
  initialiseStore(state) {
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
