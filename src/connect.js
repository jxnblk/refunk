import React from 'react'
import PropTypes from 'prop-types'

const connect = (mapProps = p => p) => Component => {
  class Connected extends React.Component {
    render() {
      const mapped = mapProps(this.context.state)

      return (
        <Component {...this.props} {...mapped} update={this.context.update} />
      )
    }
  }

  Connected.displayName = `Connected(${getDisplayName(Component)})`
  Connected.contextTypes = {
    update: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }

  return Connected
}

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

export default connect
