import React from 'react'
import { Consumer, Provider } from './index'

export const Refunk = props => (
  <Consumer>
    {maybeState => maybeState ? (
      props.children(maybeState)
    ) : (
      <Provider {...props}>
        <Consumer>
          {state => (
            props.children(state)
          )}
        </Consumer>
      </Provider>
    )}
  </Consumer>
)
