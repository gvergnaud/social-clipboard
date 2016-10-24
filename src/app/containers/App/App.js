import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'
import prop from 'lodash/fp/prop'
import { connect } from 'react-redux'
import { historySelector, isTextCopy } from 'state/modules/history'
import styles from './App.scss'

const cx = classNames.bind(styles)

const enhancer = connect(state => ({
  history: historySelector(state)
}))

const App = ({ history }) => (
  <div className={cx('App')}>
    <h1>Clipboard history</h1>
    <ul>
      {history
        .filter(x => isTextCopy(x))
        .map(prop('text'))
        .map((text, i) =>
          <li key={i}>{text.slice(0, 50)}...</li>
        )
      }
    </ul>
  </div>
)

export default enhancer(App)
