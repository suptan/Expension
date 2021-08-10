import { Category, CategoryState } from '~/types'
import { StorageKeys } from '~/utils/const'

export const state: CategoryState = initialiseStore()

function initialiseStore(): CategoryState {
  if (!localStorage.getItem(StorageKeys.Categories)) {
    const categories: Category[] = [
      { isMain: true, order: 1, name: 'Food' },
      { isMain: true, order: 2, name: 'Transportation' },
      { isMain: true, order: 3, name: 'Entertainment' },
      { isMain: true, order: 4, name: 'Work' },
    ]
    localStorage.setItem(StorageKeys.Categories, JSON.stringify(categories))
  }

  return {
    list: JSON.parse(localStorage.getItem(StorageKeys.Categories) || '[]')
  }
}