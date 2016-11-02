import React, { PropTypes } from 'react'
import classNames from 'classnames/bind'

import styles from './InboxTextView.scss'


const cx = classNames.bind(styles)

const InboxTextView = ({ text, onCopy }) => (
  <div
    className={cx('InboxTextView')}
    onClick={onCopy}>
    <p className={cx('InboxTextView-text')}>{text}</p>
  </div>
)

InboxTextView.propTypes = {
  text: PropTypes.string.isRequired,
  onCopy: PropTypes.func.isRequired
}


export default InboxTextView
