import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'
import prop from 'lodash/fp/prop'
import compose from 'lodash/fp/compose'
import { connect } from 'react-redux'
import { historySelector } from 'state/modules/history'
import { Copy } from 'state/actions'
import { extract, cata } from 'utils/actions'
import styles from './App.scss'

const cx = classNames.bind(styles)

const enhancer = connect(state => ({
  history: historySelector(state)
}))

const App = ({ history }) => (
  <div className={cx('App')}>
    <h1 className={cx('App-title')}>Clipboard history</h1>
    <ul>
      {history
        .map(compose(extract, cata({
          [Copy.Text]: payload => payload.text,
          [Copy.File]: payload => payload.name,
        })))
        .map((text, i) =>
          <li key={i}>{text.slice(0, 50)}...</li>
        )
      }
    </ul>
  </div>
)

export default enhancer(App)
