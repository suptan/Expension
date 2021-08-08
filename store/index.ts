import Vuex from 'vuex'
import categories from './modules/categories'
import expenses from './modules/expenses'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      categories,
      expenses,
    }
  })
}

export default createStore
