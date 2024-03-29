import React, { PropTypes } from 'react'
import classNames from 'classnames/bind'
import { Copy, extract, cata } from '../../../utils/copy'

import InboxFile from '../../containers/InboxFile'
import InboxText from '../../containers/InboxText'

import styles from './Inbox.scss'


const cx = classNames.bind(styles)

const Inbox = ({ history }) => (
  <section className={cx('Inbox')}>
    {history
      .map(({ copy, id }) =>  cata({
        [Copy.Text]: copyValue => ({ ...copyValue, id }),
        [Copy.File]: copyValue => ({ ...copyValue, id })
      }, copy))
      .sort((a, b) => extract(b).createdAt - extract(a).createdAt)
      .map(copy =>
        <article key={extract(copy).id} className={cx('Inbox-row')}>
          {extract(cata({
            [Copy.Text]: props => <InboxText {...props} />,
            [Copy.File]: props => <InboxFile {...props} />,
          }, copy))}
        </article>
      )}
  </section>
)

Inbox.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    copy: PropTypes.object.isRequired,
  }).isRequired).isRequired
}


export default Inbox
