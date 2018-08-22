import React from "react";

const Error = ({ error, onBack }) => (
  <div>
    <h1>Internal Error</h1>
    <p>{error}</p>
    <button onClick={onBack}>Back</button>
  </div>
);

export default Error;
