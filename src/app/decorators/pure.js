import React, { Component } from 'react'
import isEqual from 'lodash/fp/isEqual'

const pure = (selector = (x => x)) => Child => {
  return class Pure extends Component {

    static displayName = `Pure(${Child.displayName || Child.name})`

    shouldComponentUpdate(nextProps) {
      return !isEqual(selector(nextProps), selector(this.props))
    }

    render() {
      return (
        <Child {...this.props} />
      )
    }
  }
}


export default pure
