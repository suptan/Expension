import { storageKey } from './const'
import { ExpenseState } from '~/types'

export const state: ExpenseState = initialiseStore()

function initialiseStore(): ExpenseState {
  console.log('storageKey',storageKey)
  
  // For demo
  if (!localStorage.getItem(storageKey)) {
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
    localStorage.setItem(storageKey, mock)
  }

  return {
    data: JSON.parse(localStorage.getItem(storageKey) || '[]')
  }
}