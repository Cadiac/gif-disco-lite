import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const CountdownContainer = (props) => {
  const { countdown } = props;
  return (
    <div className="container">
      <h1 className="title is-1">
        {countdown}
      </h1>
    </div>
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
