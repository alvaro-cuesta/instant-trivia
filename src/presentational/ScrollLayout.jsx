import React from "react";

import "./ScrollLayout.css";

const ScrollLayout = ({ current, children, onTransitionEnd, horizontal }) => (
  <div className="scroll-container">
    <div
      className={`scroll-content ${horizontal ? 'horizontal' : 'vertical'}`}
      style={{
        '--current': current,
        '--count': React.Children.count(children)
      }}
      onTransitionEnd={onTransitionEnd}
    >
      {React.Children.map(children, child => (
        <div className="scroll-panel">{child}</div>
      ))}
    </div>
  </div>
);

export default ScrollLayout;
