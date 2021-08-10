export enum ExpenseActionTypes {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  REMOVE_ALL_BY_CATEGORY = 'REMOVE_ALL_BY_CATEGORY',
  UPDATE = 'UPDATE',
}

// TODO: auto map with namespace
export enum ExpenseAction {
  ADD = 'expenses/ADD',
  REMOVE = 'expenses/REMOVE',
  REMOVE_ALL_BY_CATEGORY = 'expenses/REMOVE_ALL_BY_CATEGORY',
  UPDATE = 'expenses/UPDATE',
}