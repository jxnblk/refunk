import React from 'react'
import connect from 'refunk'
import Counter from './Counter'
import List from './List'

const App = (props) => (
  <div
    style={{
      padding: 48
    }}>
    <h1>refunk {props.count}</h1>
    <Counter />
    <List />
  </div>
)

export default connect(App)
