import { ExpenseState } from '~/types'

export const state: ExpenseState = initialiseStore()

function initialiseStore(): ExpenseState {
  return {
    data: JSON.parse(localStorage.getItem('expense') || '[]')
  }
}