import React from 'react'
import PropTypes from 'prop-types'

import styles from './ScrollLayout.cssm'

const ScrollLayout = ({ current, children, onTransitionEnd, horizontal }) => (
  <div className={styles.container}>
    <div
      className={`${styles.content} ${
        horizontal ? styles.horizontal : styles.vertical
      }`}
      style={{
        '--current': current,
        '--count': React.Children.count(children),
      }}
      onTransitionEnd={onTransitionEnd}
    >
      {React.Children.map(children, (child) => (
        <div className={styles.panel}>{child}</div>
      ))}
    </div>
  </div>
)

ScrollLayout.propTypes = {
  current: PropTypes.number,
  children: PropTypes.node,
  onTransitionEnd: PropTypes.func,
  horizontal: PropTypes.bool,
}

ScrollLayout.defaultProps = {
  current: 0,
  horizontal: false,
}

export default ScrollLayout
