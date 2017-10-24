import React from 'react'
import { render } from 'react-dom'
import App from './App'

const init = {
  items: [],
  newItem: '',
  count: 0
}

render(<App {...init} />, app)
