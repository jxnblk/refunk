import React from 'react'
import connect from '../src'

const App = connect(props => [
  <meta charSet='utf-8' />,
  <title>Refunk</title>,
  <meta name='viewport' content='width=device-width,initial-scale=1' />,
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
])

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

export default App
