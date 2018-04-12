import React from 'react'
import {
  Provider,
  Consumer,
  connect
} from '../src'

const Box = props => <div {...props} style={{ padding: 64 }} />

const App = connect(props => (
  <React.Fragment>
    <Box>
      <h1>Refunk</h1>
      <samp>{props.count}</samp>
      <button
        onClick={e => props.update(dec)}
        children='-'
      />
      <button
        onClick={e => props.update(inc)}
        children='+'
      />
    </Box>
    <Nested />
    <Consumer>
      {state => (
        <Box>
          Consumer {typeof Consumer}
          <pre>{Object.keys(state).join(', ')}</pre>
          <pre children={JSON.stringify(state, null, 2)} />
        </Box>
      )}
    </Consumer>
  </React.Fragment>
))

const Nested = connect(props => (
  <Box>
    <h2>Nested</h2>
    <pre>{props.count}</pre>
    <button onClick={e => props.update(inc)}>
      INC
    </button>
  </Box>
))

const dec = state => ({ count: state.count - 1 })
const inc = state => ({ count: state.count + 1 })

App.defaultProps = {
  count: 0
}

export default App
