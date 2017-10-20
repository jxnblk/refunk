import React from 'react'
import PropTypes from 'prop-types'
import connect from './index'

class Refunk extends React.Component {
  render () {
    return this.props.children(this.props)
  }
}

Refunk.propTypes = {
  children: PropTypes.func.isRequired
}

export default connect(Refunk)
