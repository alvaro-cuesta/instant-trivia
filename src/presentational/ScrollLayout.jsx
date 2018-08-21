import React from "react";

import "./ScrollLayout.css";

const ScrollLayout = ({ current, children }) => (
  <div className='scroll-container'>
  <div
    className="scroll-content"
    style={{
      transform: `translateY(-${(100 * current) /
        React.Children.count(children)}%)`
    }}
  >
    {React.Children.map(children, child => (
      <div className="scroll-panel">{child}</div>
    ))}
  </div>
  </div>
);

export default ScrollLayout;
