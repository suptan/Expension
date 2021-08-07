import { mutationTree, actionTree } from 'typed-vuex'
import { Category } from '~/types'

export const state = () => ({
  list: [] as Category[],
})

type RootState = ReturnType<typeof state>

export const getters = {
  list: (state: RootState) => state.list,
}

export const mutations = mutationTree(state, {
  add(state, newValue: string) {
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

    localStorage.setItem('categories', JSON.stringify(newList))
  },
  remove(state, value: string) {
    const list = state.list.filter(s => s.name !== value)

    if (list.length === state.list.length) {
      console.debug('Item not found')
      return
    }

    state.list = list

    localStorage.setItem('categories', JSON.stringify(list))
  },
  update(state, { oldValue, newValue }) {
    state.list = state.list.map(item => {
      if (item.name === oldValue) {
        item.name = newValue
      }

      return item
    })

    localStorage.setItem('categories', JSON.stringify(state.list))
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
