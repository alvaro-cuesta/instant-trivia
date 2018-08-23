import React from "react";

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
        <div className={classNames.panel}>{child}</div>
      ))}
    </div>
  </div>
);

export default ScrollLayout;
