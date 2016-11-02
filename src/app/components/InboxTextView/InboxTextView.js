import React, { PropTypes } from 'react'
import classNames from 'classnames/bind'

import hover from '../../decorators/hover'

import styles from './InboxTextView.scss'


const cx = classNames.bind(styles)

const enhancer = hover()

const InboxTextView = ({ text, onCopy, isHover }) => (
  <div
    className={cx('InboxTextView')}
    onClick={onCopy}>
    <p className={cx('InboxTextView-text')}>{isHover ? 'Click To Copy!' : text}</p>
  </div>
)

InboxTextView.propTypes = {
  text: PropTypes.string.isRequired,
  onCopy: PropTypes.func.isRequired,
  isHover: PropTypes.bool.isRequired,
}


export default enhancer(InboxTextView)
