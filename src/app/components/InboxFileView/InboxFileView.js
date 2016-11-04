import React, { PropTypes } from 'react'
import moment from 'moment'
import compose from 'lodash/fp/compose'
import classNames from 'classnames/bind'
import { Status } from '../../../state/actions/fileActions'

import hover from '../../decorators/hover'
import flatMapProps from '../../decorators/flatMapProps'

import styles from './InboxFileView.scss'
import inboxItemStyles from '../../scss/InboxItem.scss'

const cx = classNames.bind(styles)
const cy = classNames.bind(inboxItemStyles)

const noOp = () => {}

const enhancer = compose(
  hover(),
  flatMapProps(props => ({
    isFinished: props.status === Status.Success,
    isError: props.status === Status.Error,
    isDownloading: props.status === Status.Downloading,
  }))
)

const InboxFileView = ({
  filePath,
  name,
  onCopy,
  isHover,
  createdAt,
  endedAt,
  status,
  progressPercent,
  isFinished,
  isDownloading,
  isError,
  error,
}) => (
  <div
    className={`${cx('InboxFileView')} ${cy('InboxItem', {
      '--error': isError,
      '--loading': isDownloading,
      '--finished': isFinished,
    })}`}
    onClick={isFinished ? onCopy : noOp}>
    <p className={cy('InboxItem-name')}>{name}</p>
    <p className={cy('InboxItem-path')}>{filePath}</p>
    <div className={cy('InboxItem-info')}>
      <p className={cy('InboxItem-info-user')}>{'Anonymous'}</p>
      <p className={cy('InboxItem-info-date')}>{
          !isFinished ? (
            `${progressPercent}%`
          ) : isHover ? (
            'Click To Copy!'
          ) : (
            moment(endedAt || createdAt).fromNow()
          )}</p>
    </div>
    <div
      className={cy('InboxItem-progress', { '--finished': status !== Status.Downloading })}
      style={{ width: `${progressPercent}%` }} />
  </div>
)

InboxFileView.propTypes = {
  filePath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onCopy: PropTypes.func.isRequired,
  createdAt: PropTypes.number.isRequired,
  endedAt: PropTypes.number,
  status: PropTypes.string.isRequired,
  progressPercent: PropTypes.number.isRequired,
  isDownloading: PropTypes.bool.isRequired,
  isFinished: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isHover: PropTypes.bool.isRequired,
  error: PropTypes.object,
}


export default enhancer(InboxFileView)
