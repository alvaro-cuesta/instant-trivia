import React from "react";
import PropTypes from "prop-types";

const Error = ({ error, onBack }) => (
  <div>
    <h1>Internal Error</h1>
    { error && <p>{error}</p> }
    <button onClick={onBack}>Back</button>
  </div>
);

Error.propTypes = {
  error: PropTypes.string,
  onBack: PropTypes.func.isRequired,
};

export default Error;
