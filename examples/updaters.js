
export const dec = state => ({ count: state.count - 1 })
export const inc = state => ({ count: state.count + 1 })

export const setNewItem = value => state => ({ newItem: value })
export const addItem = state => ({
  newItem: '',
  items: [
    ...state.items,
    state.newItem
  ]
})
export const removeItem = i => state => ({
  items: [
    ...state.items.slice(0, i),
    ...state.items.slice(i + 1)
  ]
})

