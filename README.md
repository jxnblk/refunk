
# Refunk 🍨

Simple React functional setState

```sh
npm i refunk
```


## Usage

### Provider

```jsx
// App.js
// Add the createProvider higher-order component to the root component of your application
import React from 'react'
import { createProvider } from 'refunk'

const App = props => (
  <div>
    <h1>Hello</h1>
  </div>
)

// pass initial state to the provider
const initialState = {
  count: 0
}

export default createProvider(initialState)(App)
```

### Connect

```jsx
// Counter.js
// connect a sub component to refunk
import React from 'react'
import { connect } from 'refunk'

const Counter = props => (
  <div>
    <samp>Count: {props.count}</samp>
    <button>
      Decrement
    </button>
    <button>
      Increment
    </button>
  </div>
)

// choose which parts of the state are passed
// to the Counter component with a map function
const map = state => ({
  count: state.count
})

export default connect(map)(Counter)
```

### Updaters

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
import { connect } from 'refunk'
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

const map = state => ({
  count: state.count
})

export default connect(map)(Counter)
```

```jsx
// App.js
// Include the Counter component in App
import React from 'react'
import { createProvider } from 'refunk'
import Counter from './Counter'

const App = props => (
  <div>
    <h1>Hello</h1>
    <Counter />
  </div>
)

const initialState = {
  count: 0
}

export default createProvider(initialState)(App)
```

## Examples

See the [examples](examples) directory

## Concepts

Refunk is meant as a simpler, smaller alternative to other state
managment libraries that makes use of React's component state.
Refunk uses higher-order components and React's built-in state management along with
[functional setState](https://facebook.github.io/react/docs/react-component.html#setstate)
to help promote the separation of presentational and container components,
and to keep state updating logic outside of the components themselves.
This library also promotes keeping application state in a single location,
similar to other [Flux](http://facebook.github.io/flux/) libraries and [Redux](http://redux.js.org/).



MIT License
