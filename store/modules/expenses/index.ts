
import {
  DispatchOptions,
  CommitOptions,
  Module,
} from 'vuex'
import actions, { Actions } from './actions'
import getters, { Getters } from './getter'
import mutations, { Mutations } from './mutations'
import { state } from './state'
import {
  ExpenseState, RootState,
} from '~/types'

export enum ExpenseTypeEnum {
  CashIn = 'Cash In',
  CashOut = 'Cash Out',
}

export type ExpensesStore<S = ExpenseState> = S & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
      key: K,
      payload: P,
      options?: CommitOptions
    ): ReturnType<Mutations[K]>;
  } & {
    dispatch<K extends keyof Actions>(
      key: K,
      payload: Parameters<Actions[K]>[1],
      options?: DispatchOptions
    ): ReturnType<Actions[K]>;
  } & {
    getters: {
      [K in keyof Getters]: ReturnType<Getters[K]>
    };
  };
  
const categories: Module<ExpenseState, RootState> = {
  state,
  actions,
  mutations,
  getters,
}
    
export default categories
  