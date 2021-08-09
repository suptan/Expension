import { ExpenseState } from '~/types'

export const state: ExpenseState = initialiseStore()

function initialiseStore(): ExpenseState {
  const test = JSON.stringify([{
    type: 'Cash Out',
    category: {
      name: 'Ent',
      isMain: false,
      order: 1,
    },
    date: new Date(),
    amount: 50,
    description: '',
  },{
    type: 'Cash Out',
    category: {
      name: 'Trans',
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
      name: 'Trans',
      isMain: false,
      order: 1,
    },
    date: new Date(2021, 5, 3),
    amount: 505,
    description: '',
  },{
    type: 'Cash Out',
    category: {
      name: 'Trans',
      isMain: false,
      order: 1,
    },
    date: new Date(2021, 5, 3),
    amount: 505,
    description: '',
  }])
  localStorage.setItem('expense', test)
  return {
    data: JSON.parse(localStorage.getItem('expense') || '[]')
  }
}