import React, { PropTypes } from 'react'
import classNames from 'classnames/bind'

import hover from '../../decorators/hover'

import styles from './InboxFileView.scss'


const cx = classNames.bind(styles)

const enhancer = hover()

const InboxFileView = ({ filePath, name, onCopy, isHover }) => (
  <div
    className={cx('InboxFileView')}
    onClick={onCopy}>
    <p className={cx('InboxFileView-name')}>{isHover ? 'Click To Copy!' : name}</p>
    <p className={cx('InboxFileView-path')}>{filePath}</p>
  </div>
)

InboxFileView.propTypes = {
  filePath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isHover: PropTypes.bool.isRequired,
  onCopy: PropTypes.func.isRequired,
}


export default enhancer(InboxFileView)
