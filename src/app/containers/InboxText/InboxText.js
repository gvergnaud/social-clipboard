import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { copyToClipboard } from '../../../state/actions/clipboardActions'

import InboxTextView from '../../components/InboxTextView'

const enhancer = connect(() => ({}))

class InboxText extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  handleCopy = () => {
    this.props.dispatch(copyToClipboard(this.props.id))
  }

  render() {
    return (
      <InboxTextView
        {...this.props}
        onCopy={this.handleCopy} />
    )
  }
}


export default enhancer(InboxText)
