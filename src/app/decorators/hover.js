import React, { Component } from 'react'

const hover = (selector = (x => x)) => Child => {
  return class Hover extends Component {

    static displayName = `Hover(${Child.displayName || Child.name})`

    state = { isHover: false }

    _handleEnter = () => {
      this.setState({ isHover: true })
    }

    _handleLeave = () => {
      this.setState({ isHover: false })
    }

    render() {
      return (
        <span
          ref={el => { this.element = el }}
          onMouseEnter={this._handleEnter}
          onMouseLeave={this._handleLeave}>
          <Child {...this.props} {...selector(this.state, this.props)} />
        </span>
      )
    }
  }
}


export default hover
