import React from 'react'
import PropTypes from 'prop-types'
import connect from './index'

class Refunk extends React.Component {
  render () {
    return this.props.render(this.props)
  }
}

Refunk.propTypes = {
  render: PropTypes.func.isRequired
}

export default connect(Refunk)
