import React from "react";
import PropTypes from "prop-types";

const Simon = ({ onClick, turns }) => (
  <div className="simon" data-testid="simon">
    <div className="button green" data-testid="1" onClick={() => onClick(1)} />
    <div className="button red" data-testid="2" onClick={() => onClick(2)} />
    <div className="button yellow" data-testid="3" onClick={() => onClick(3)} />
    <div className="button blue" data-testid="4" onClick={() => onClick(4)} />
    <div className="center" />
    <small>
      by{" "}
      <a
        href="https://github.com/diegoalmesp"
        target="_blank"
        rel="noopener noreferrer"
      >
        Diego
      </a>
    </small>
  </div>
);

Simon.propTypes = {
  onClick: PropTypes.func.isRequired,
  turns: PropTypes.number.isRequired
};

export default Simon;
