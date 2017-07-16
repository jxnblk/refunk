import React from 'react'
import { connect } from 'refunk'
import {
  removeItem,
  addItem,
  setNewItem
} from './updaters'

const List = props => (
  <div>
    <h2>{props.items.length} Items</h2>
    <ul>
      {props.items.map((item, i) => (
        <li key={item}>
          <span>{item}</span>
          <button
            onClick={e => props.update(removeItem(i))}
            children='Remove'
          />
        </li>
      ))}
    </ul>
    <form onSubmit={e => {
      e.preventDefault()
      props.update(addItem)
    }}>
      <label htmlFor='newItem'>Add Item</label>
      <input
        type='text'
        id='newItem'
        name='newItem'
        value={props.newItem}
        onChange={e => props.update(setNewItem(e.target.value))}
      />
      <button children='Add Item' />
    </form>
  </div>
)

const map = state => ({
  items: state.items,
  newItem: state.newItem
})

export default connect(map)(List)
