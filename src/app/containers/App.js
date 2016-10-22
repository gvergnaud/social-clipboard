import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import prop from 'lodash/fp/prop'
import { connect } from 'react-redux'
import { historySelector, isTextCopy } from 'state/modules/history'

const enhancer = connect(state => ({
  history: historySelector(state)
}))

const App = ({ history }) => (
  <div className={cx('App')}>
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
