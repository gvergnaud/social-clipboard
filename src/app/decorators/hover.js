import React, { Component } from 'react'

const hover = (selector = (x => x)) => Child => {
  return class Hover extends Component {

    static displayName = `Hover(${Child.displayName || Child.name})`

    state = { isHover: false }

    componentDidMount() {
      this.element.addEventListener('mouseenter', this._handleEnter, false)
      this.element.addEventListener('mouseleave', this._handleLeave, false)
    }

    componentWillUnmount() {
      this.element.removeEventListener('mouseenter', this._handleEnter, false)
      this.element.removeEventListener('mouseleave', this._handleLeave, false)
    }

    _handleEnter = () => {
      this.setState({ isHover: true })
    }

    _handleLeave = () => {
      this.setState({ isHover: false })
    }

    render() {
      return (
        <span ref={el => { this.element = el }}>
          <Child {...this.props} {...selector(this.state, this.props)} />
        </span>
      )
    }
  }
}


export default hover
