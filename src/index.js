import React from 'react'

const Context = React.createContext(null)

export const Consumer = props => <Context.Consumer {...props} />

const omit = (obj, keys) => {
  const next = {}
  for (let key in obj) {
    if (keys.indexOf(key) > -1) continue
    next[key] = obj[key]
  }
  return next
}

export class Provider extends React.Component {
  state = omit(this.props, 'children')

  update = (...args) => this.setState(...args)

  render () {
    const value = {
      ...this.state,
      update: this.update
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const connect = Component => props => (
  <Consumer>
    {maybeState => maybeState ? (
      <Component {...maybeState} />
    ) : (
      <Provider {...props}>
        <Consumer>
          {state => (
            <Component {...state} />
          )}
        </Consumer>
      </Provider>
    )}
  </Consumer>
)
