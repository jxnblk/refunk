
# Refunk 🎧

Simple React functional setState
with the new [React context API][context] (requires React v16.3 or later)

[context]: https://reactjs.org/docs/context.html

```sh
npm i refunk
```

## Getting Started

```jsx
import React from 'react'
import { connect } from 'refunk'

// Create a state provider component
const App = connect(props => (
  <div>
    <h1>count: {props.count}</h1>
    <Controls />
  </div>
))

// Updaters are functions that return state
const dec = state => ({ count: state.count - 1 })
const inc = state => ({ count: state.count + 1 })

// Connect the Controls component to the App state
const Controls = connect(props => (
  <div>
    <samp>{props.count}</samp>
    <button onClick={e => props.update(dec)}>
      -
    </button>
    <button onClick={e => props.update(inc)}>
      +
    </button>
  </div>
))

const initialState = {
  count: 0
}

// initialize state with props
render(<App {...initialState} />)
```

## Usage

### connect
### Provider
### Consumer

<!--
### Updaters

Updaters are functions that are passed to the `props.update()` function.
An updater function takes `state` as its only argument and returns a new state.

```jsx
// updaters.js
// Create an `updaters` module with functions to update the state of the app
export const decrement = state => ({ count: state.count - 1 })
export const increment = state => ({ count: state.count + 1 })
```

```jsx
// Counter.js
// Use the updater functions in the connected Counter component
import React from 'react'
import connect from 'refunk'
import { decrement, increment } from './updaters'

const Counter = props => (
  <div>
    <samp>Count: {props.count}</samp>
    <button onClick={e => props.update(decrement)}>
      Decrement
    </button>
    <button onClick={e => props.update(increment)}>
      Increment
    </button>
  </div>
)

export default connect(Counter)
```

```jsx
// App.js
// Include the Counter component in App
import React from 'react'
import connect from 'refunk'
import Counter from './Counter'

const App = props => (
  <div>
    <h1>Hello</h1>
    <Counter />
  </div>
)

export default connect(App)
```
-->


## Concepts

Refunk is meant as a simpler, smaller alternative to other state
managment libraries that makes use of React's built-in component state.
Refunk uses higher-order components and React's built-in state management along with
[functional setState](https://facebook.github.io/react/docs/react-component.html#setstate)
to help promote the separation of presentational and container components,
and to keep state updating logic outside of the components themselves.

This library also promotes keeping application state in a single location,
similar to other [Flux](http://facebook.github.io/flux/) libraries and [Redux](http://redux.js.org/).

### Related

- [microstate](https://github.com/estrattonbailey/microstate)
- [statty](https://github.com/vesparny/statty)
- [unistore](https://github.com/developit/unistore)
- [redux](https://github.com/reactjs/redux)
- [unstated](https://github.com/jamiebuilds/unstated)

---

[GitHub](https://github.com/jxnblk/refunk) | [Made by Jxnblk](http://jxnblk.com) | [MIT License](LICENSE.md)
