
# Refunk 🎧

Simple React functional setState
with the new [React context API][context] (requires React v16.3 or later)


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

Refunk components initialize state from props and provide an `update` function to their consumers.
When nesting Refunk components, the top-most component will control state for any child Refunk components.

The `update` function works the same as `setState`, but it's intended to be used with separate [updater functions](#using-updaters),
that can be shared across many parts of an application.

### connect

The `connect` higher-order component creates state based on props for top-level components or connects into a parent Refunk component's state when nested.
This allows for the creation of stateful components that can work standalone or listen to a parent's state.

```jsx
import React from 'react'
import { connect } from 'refunk'

const App = connect(props => (
  <div>
    <samp>{props.count}</samp>
  </div>
))

App.defaultProps = {
  count: 0
}

export default App
```

### Provider

For lower-level access to React's context API, the Provider component can be used to create a context.
The Refunk Provider will convert props to initial state and provide the state and `update` function through context.

```jsx
import React from 'react'
import { Provider } from 'refunk'

const App = props => (
  <Provider count={0}>
    <div />
  </Provider>
)
```

### Consumer

The context Consumer is also exported for lower-level access to the context API.

```jsx
import React from 'react'
import { Provider, Consumer } from 'refunk'

const inc = state => ({ count: state.count + 1 })

const App = props => (
  <Provider count={0}>
    <Consumer>
      {state => (
        <React.Fragment>
          <samp>{state.count}</samp>
          <button onClick={e => state.update(inc)}>+</button>
        </React.Fragment>
      )}
    </Consumer>
  </Provider>
)
```

### Using Updaters

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

## Build Your Own

Refunk's [source](src) is only about 50 LOC and relies on built-in React functionality.
This library is intended to be used directly as a package and also to serve as an example of some ways to handle state in a React application.
Feel free to fork or steal ideas from this project, and build your own version.


## Concepts

Refunk is meant as a simpler, smaller alternative to other state
managment libraries that makes use of React's built-in component state.
Refunk uses higher-order components, the new [context API][context], and React component state management along with
[functional setState][setState]
to help promote the separation of presentational and container components,
and to keep state updating logic outside of the components themselves.

This library also promotes keeping application state in a single location,
similar to other [Flux][flux] libraries and [Redux][redux].


### Related

- [microstate](https://github.com/estrattonbailey/microstate)
- [statty](https://github.com/vesparny/statty)
- [unistore](https://github.com/developit/unistore)
- [redux][redux]
- [unstated](https://github.com/jamiebuilds/unstated)

[context]: https://reactjs.org/docs/context.html
[setState]: https://facebook.github.io/react/docs/react-component.html#setstate
[flux]: http://facebook.github.io/flux/
[redux]: http://redux.js.org/

---

[Made by Jxnblk](http://jxnblk.com) | [MIT License](LICENSE.md)
