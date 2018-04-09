import React from 'react'
import { connect } from '..'
import { dec, inc } from './updaters'

const Counter = props => (
  <div id='counter'>
    <h2>Count: {props.count}</h2>
    <button onClick={e => props.update(dec)} children='-' />
    <button onClick={e => props.update(inc)} children='+' />
  </div>
)

export default connect(Counter)
