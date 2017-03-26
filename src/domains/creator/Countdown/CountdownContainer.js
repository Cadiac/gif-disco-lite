import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Countdown from './Countdown';

const CountdownContainer = (props) => {
  const { countdown } = props;
  return (
    <Countdown countdown={countdown} />
  );
};

CountdownContainer.propTypes = {
  countdown: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    countdown: state.creator.countdown,
  };
}

export default connect(mapStateToProps)(CountdownContainer);
