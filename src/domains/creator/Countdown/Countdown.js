import React, { PropTypes } from 'react';

import './Countdown.css';

const Countdown = (props) => {
  const { countdown } = props;
  return (
    <div className="Countdown">
      <h1>{countdown}</h1>
    </div>
  );
};

Countdown.propTypes = {
  countdown: PropTypes.number.isRequired,
};

export default Countdown;
