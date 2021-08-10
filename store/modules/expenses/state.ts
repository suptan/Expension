import { ExpenseState } from '~/types'
import { StorageKeys } from '~/utils/const'

export const state: ExpenseState = initialiseStore()

function initialiseStore(): ExpenseState {
  // For demo
  if (!localStorage.getItem(StorageKeys.Expenses)) {
    const mock = JSON.stringify([{
      type: 'Cash Out',
      category: {
        name: 'Entertainment',
        isMain: false,
        order: 1,
      },
      date: new Date(),
      amount: 50,
      description: '',
    },{
      type: 'Cash Out',
      category: {
        name: 'Transportation',
        isMain: false,
        order: 1,
      },
      date: new Date(),
      amount: 505,
      description: '',
    },{
      type: 'Cash In',
      category: {
        name: 'Work',
        isMain: false,
        order: 1,
      },
      date: new Date(),
      amount: 504,
      description: '',
    },{
      type: 'Cash Out',
      category: {
        name: 'Transportation',
        isMain: false,
        order: 1,
      },
      date: new Date(2021, 5, 3),
      amount: 505,
      description: '',
    },{
      type: 'Cash Out',
      category: {
        name: 'Transportation',
        isMain: false,
        order: 1,
      },
      date: new Date(2021, 5, 3),
      amount: 505,
      description: '',
    }])
    localStorage.setItem(StorageKeys.Expenses, mock)
  }

  return {
    data: JSON.parse(localStorage.getItem(StorageKeys.Expenses) || '[]')
  }
}