import { mutationTree, actionTree } from 'typed-vuex'

interface Category {
  name: string
  isMain: boolean
  order: number
}

export const state = () => ({
  list: [] as Category[],
})

type RootState = ReturnType<typeof state>

export const getters = {
  list: (state: RootState) => state.list,
}

export const mutations = mutationTree(state, {
  addCategory(state, newValue: string) {
    const unique = new Set(state.list.map(s => s.name))

    if (unique.has(newValue)) {
      // TODO: feedback duplication error
      console.debug('Add duplicate category')
      return
    }

    // Tricky part when dealing with Array or object in vuex state
    const newList = [...state.list]
    newList.push({ isMain: false, order: state.list.length, name: newValue })
    state.list = newList

      localStorage.setItem('categories', JSON.stringify(newList))
  },
  removeCategory(state, value: string) {
    const list = state.list.filter(s => s.name !== value)

    if (list.length === state.list.length) {
      console.debug('Item not found')
      return
    }

    state.list = list

    localStorage.setItem('categories', JSON.stringify(list))
  },
  initialiseStore(state) {
    if (!localStorage.getItem('categories')) {
      const categories: Category[] = [
        { isMain: true, order: 1, name: 'Food' },
        { isMain: true, order: 2, name: 'Transportation' },
        { isMain: true, order: 3, name: 'Entertainment' },
        { isMain: true, order: 4, name: 'Work' },
      ]
      localStorage.setItem('categories', JSON.stringify(categories))
    }

    state.list = JSON.parse(localStorage.getItem('categories') || '{}')
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
  }
)
