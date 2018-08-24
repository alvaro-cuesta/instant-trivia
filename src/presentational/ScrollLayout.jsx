import React from "react";
import PropTypes from "prop-types";

import classNames from "./ScrollLayout.cssm";

const ScrollLayout = ({ current, children, onTransitionEnd, horizontal }) => (
  <div className={classNames.container}>
    <div
      className={`${classNames.content} ${horizontal ? classNames.horizontal : classNames.vertical}`}
      style={{
        '--current': current,
        '--count': React.Children.count(children)
      }}
      onTransitionEnd={onTransitionEnd}
    >
      {React.Children.map(children, child => (
        <div className={styles.panel}>{child}</div>
      ))}
    </div>
  </div>
);

ScrollLayout.propTypes = {
  current: PropTypes.number,
  children: PropTypes.node,
  onTransitionEnd: PropTypes.func,
  horizontal: PropTypes.bool,
};

ScrollLayout.defaultProps = {
  current: 0,
  horizontal: false,
}

export default ScrollLayout;
