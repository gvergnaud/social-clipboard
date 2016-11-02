import React, { PropTypes } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { inboxHistoryIdsSelector, inboxItemSelector } from 'state/modules/inbox'
import styles from './App.scss'
import '../../scss/global.scss'

import Inbox from '../../components/Inbox'

const cx = classNames.bind(styles)

const enhancer = connect(state => ({
  history: inboxHistoryIdsSelector(state).map(id => ({
    id,
    copy: inboxItemSelector(id, state)
  }))
}))

const App = ({ history }) => (
  <div className={cx('App')}>
    <div className={cx('App-container')}>
      <div className={cx('App-header')}>
        <h2 className={cx('App-title')}>Clipboard</h2>
      </div>

      <div className={cx('App-content')}>
        <Inbox history={history} />
      </div>
    </div>
  </div>
)

App.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

export default enhancer(App)
