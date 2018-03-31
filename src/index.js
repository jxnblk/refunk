import React from 'react'

const Context = React.createContext(null)

export const Consumer = Context.Consumer

export class Provider extends React.Component {
  update = (...args) => this.setState(...args)

  constructor (props) {
    super()
    const { children, ...rest } = props
    this.state = rest
  }

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
