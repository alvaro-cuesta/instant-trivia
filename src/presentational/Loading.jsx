import React from "react";

import className from "./Loading.cssm";

const Loading = () => (
  <div>
    <div className={className.square} />
    <div className={className.square} />
    <div className={className.square} />
  </div>
);

export default Loading
