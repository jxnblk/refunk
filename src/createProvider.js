import React from 'react'
import PropTypes from 'prop-types'

const provider = (initialState = {}) => Component => {
  class Provider extends React.Component {
    static childContextTypes = {
      state: PropTypes.object,
      update: PropTypes.func
    }

    static contextTypes = {
      update: (props, key, component) => {
        if (props[key]) {
          return new Error(
            `Parent provider detected in \`${Component.name}\`. Only one provider per app should be included.`
          )
        }
      }
    }

    constructor () {
      super()
      this.state = initialState

      this.update = fn => this.setState(fn)
    }

    getChildContext () {
      return {
        state: this.state,
        update: this.update
      }
    }

    render () {
      return (
        <Component
          {...this.props}
          {...this.state}
          update={this.update}
        />
      )
    }
  }

  return Provider
}

export default provider
