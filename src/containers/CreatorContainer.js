import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import creatorSteps from '../constants/creatorSteps';

import CountdownContainer from './CountdownContainer';

const CreatorRouter = (props) => {
  const { step } = props;
  switch (step) {
    case creatorSteps.START:
      return (
        <button className="uk-button uk-button-primary uk-button-large">Start</button>
      );
    case creatorSteps.COUNTDOWN:
      return (
        <CountdownContainer />
      );
    default:
      return null;
  }
};
CreatorRouter.propTypes = {
  step: PropTypes.string.isRequired,
};

const CreatorContainer = (props) => {
  const { step } = props;
  return (
    <div className="uk-container">
      <CreatorRouter step={step} />
    </div>
  );
};

CreatorContainer.propTypes = {
  step: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    step: state.creator.step,
  };
}

export default connect(mapStateToProps)(CreatorContainer);
