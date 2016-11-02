import React, { PropTypes } from 'react'
import moment from 'moment'
import classNames from 'classnames/bind'

import hover from '../../decorators/hover'

import styles from './InboxTextView.scss'
import inboxItemStyles from '../../scss/InboxItem.scss'


const cx = classNames.bind(styles)
const cy = classNames.bind(inboxItemStyles)

const enhancer = hover()

const InboxTextView = ({
  text,
  createdAt,
  isHover,
  onCopy,
}) => (
  <div
    className={`${cy('InboxItem')} ${cx('InboxTextView')}`}
    onClick={onCopy}>
    <p className={cy('InboxItem-name')}>{text}</p>
    <div className={cy('InboxItem-info')}>
      <p className={cy('InboxItem-info-user')}>{'Anonymous'}</p>
      <p className={cy('InboxItem-info-date')}>{isHover ? 'Click To Copy!' : moment(createdAt).fromNow()}</p>
    </div>
  </div>
)

InboxTextView.propTypes = {
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  isHover: PropTypes.bool.isRequired,
  onCopy: PropTypes.func.isRequired,
}


export default enhancer(InboxTextView)
