import React, { Component } from 'react'

const flatMapProps = (selector = (x => x)) => Child => {
  return class FlatMapProps extends Component {

    static displayName = `FlatMapProps(${Child.displayName || Child.name})`

    render() {
      return (
        <Child {...this.props} {...selector(this.props)} />
      )
    }
  }
}


export default flatMapProps
