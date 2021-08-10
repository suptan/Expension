import { uuid } from 'vue-uuid'
import { Expense, ExpenseState } from '~/types'
import { ExpenseTypeEnum, StorageKeys } from '~/utils/const'

export const state: ExpenseState = initialiseStore()

function initialiseStore(): ExpenseState {
  // For demo
  if (!localStorage.getItem(StorageKeys.Expenses)) {
    const mock: Expense[] = [{
      id: uuid.v4(),
      type: ExpenseTypeEnum.CashOut,
      category: {
        name: 'Entertainment',
        isMain: false,
        order: 1,
      },
      date: new Date(),
      amount: 50,
      description: '',
    },{
      id: uuid.v4(),
      type: ExpenseTypeEnum.CashOut,
      category: {
        name: 'Transportation',
        isMain: false,
        order: 1,
      },
      date: new Date(),
      amount: 505,
      description: '',
    },{
      id: uuid.v4(),
      type: ExpenseTypeEnum.CashIn,
      category: {
        name: 'Work',
        isMain: false,
        order: 1,
      },
      date: new Date(),
      amount: 504,
      description: '',
    },{
      id: uuid.v4(),
      type: ExpenseTypeEnum.CashOut,
      category: {
        name: 'Transportation',
        isMain: false,
        order: 1,
      },
      date: new Date(2021, 5, 3),
      amount: 505,
      description: '',
    },{
      id: uuid.v4(),
      type: ExpenseTypeEnum.CashOut,
      category: {
        name: 'Transportation',
        isMain: false,
        order: 1,
      },
      date: new Date(2021, 5, 3),
      amount: 505,
      description: '',
    }]
    localStorage.setItem(StorageKeys.Expenses, JSON.stringify(mock))
  }

  return {
    data: JSON.parse(localStorage.getItem(StorageKeys.Expenses) || '[]')
  }
}