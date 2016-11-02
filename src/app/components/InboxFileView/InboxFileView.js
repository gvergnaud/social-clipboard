import React, { PropTypes } from 'react'
import classNames from 'classnames/bind'

import styles from './InboxFileView.scss'


const cx = classNames.bind(styles)

const InboxFileView = ({ filePath, name, onCopy }) => (
  <div
    className={cx('InboxFileView')}
    onClick={onCopy}>
    <p className={cx('InboxFileView-name')}>{name}</p>
    <p className={cx('InboxFileView-path')}>{filePath}</p>
  </div>
)

InboxFileView.propTypes = {
  filePath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onCopy: PropTypes.func.isRequired,
}


export default InboxFileView
