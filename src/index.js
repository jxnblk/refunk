import React from 'react'
import PropTypes from 'prop-types'

const connect = Component => {
  class RefunkState extends React.Component {
    static childContextTypes = {
      state: PropTypes.object,
      update: PropTypes.func
    }

    static contextTypes = {
      state: PropTypes.object,
      update: PropTypes.func
    }

    static propTypes = {
      mapState: PropTypes.func
    }

    static defaultProps = {
      mapState: n => n
    }

    constructor (props, context) {
      super()

      this.child = isChild(context)

      this.state = this.child ? null : {...props}

      this.update = this.child
        ? context.update
        : fn => this.setState(fn)
    }

    getChildContext () {
      return this.child ? this.context : {
        state: this.state,
        update: this.update
      }
    }

    render () {
      const { mapState } = this.props
      const state = this.child ? this.context.state : this.state
      const props = mapState(state)

      return (
        <Component
          {...props}
          update={this.update}
        />
      )
    }
  }

  return RefunkState
}

const isChild = (context) => (
  typeof context.state === 'object'
  && typeof context.update === 'function'
)

export default connect
