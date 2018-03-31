import React from 'react'
import {
  Provider,
  Consumer,
  connect
} from '../src'

const App = connect(props => (
  <React.Fragment>
    <div>
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
    </div>
    <Nested />
    <Consumer>
      {state => (
        <div>
          Consumer {typeof Consumer}
          <pre>{Object.keys(state).join(', ')}</pre>
          <pre children={JSON.stringify(state, null, 2)} />
        </div>
      )}
    </Consumer>
  </React.Fragment>
))

const Nested = connect(props => (
  <div>
    <h2>Nested</h2>
    <pre>{props.count}</pre>
    <button onClick={e => props.update(inc)}>
      INC
    </button>
  </div>
))

const dec = state => ({ count: state.count - 1 })
const inc = state => ({ count: state.count + 1 })

App.defaultProps = {
  count: 0
}

const css = `
* { box-sizing: border-box }
body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.5;
  margin: 0;
  padding: 48px;
  color: #000;
  background-color: #fff;
}
`

// export default App
//
export default props => <App />
