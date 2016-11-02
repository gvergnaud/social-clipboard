import React, { PropTypes } from 'react'
import classNames from 'classnames/bind'
import compose from 'lodash/fp/compose'
import { connect } from 'react-redux'
import { inboxHistorySelector } from 'state/modules/inbox'
import { Copy, extract, cata } from 'utils/copy'
import styles from './App.scss'
import '../../scss/global.scss'

const cx = classNames.bind(styles)

const enhancer = connect(state => ({
  history: inboxHistorySelector(state)
}))

const App = ({ history }) => (
  <div className={cx('App')}>
    <div className={cx('App-container')}>
      <div className={cx('App-header')}>
        <h2 className={cx('App-title')}>Clipboard</h2>
      </div>

      <div className={cx('App-content')}>
        <ul>
          {history
            .map(compose(extract, cata({
              [Copy.Text]: copy => copy.text,
              [Copy.File]: copy => copy.name,
            })))
            .map((text, i) =>
              <li key={i}>{text.slice(0, 50)}...</li>
            )
          }
        </ul>
      </div>
    </div>
  </div>
)

App.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

export default enhancer(App)
