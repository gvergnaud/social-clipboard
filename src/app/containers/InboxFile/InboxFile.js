import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { copyToClipboard } from '../../../state/actions/inboxActions'

import InboxFileView from '../../components/InboxFileView'

const enhancer = connect(() => ({}))

class InboxFile extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  handleCopy = () => {
    this.props.dispatch(copyToClipboard(this.props.id))
  }

  render() {
    return (
      <InboxFileView
        {...this.props}
        onCopy={this.handleCopy} />
    )
  }
}


export default enhancer(InboxFile)
