import React, { PropTypes } from 'react';

import { creatorSteps } from './CreatorConstants';
import CountdownContainer from './Countdown/CountdownContainer';
import StartContainer from './Start/StartContainer';
import ConfirmationContainer from './Confirmation/ConfirmationContainer';
import CompleteContainer from './Complete/CompleteContainer';

const CreatorRouter = (props) => {
  const { step } = props;
  switch (step) {
    case creatorSteps.START:
      return (
        <StartContainer />
      );
    case creatorSteps.COUNTDOWN:
      return (
        <CountdownContainer />
      );
    case creatorSteps.RECORDING:
      return (
        <div className="container">
          <h1 className="title is-1">
            Dance!
          </h1>
        </div>
      );
    case creatorSteps.ACCEPT_OR_REJECT:
      return (
        <ConfirmationContainer />
      );
    case creatorSteps.COMPLETE:
      return (
        <CompleteContainer />
      );
    default:
      return null;
  }
};
CreatorRouter.propTypes = {
  step: PropTypes.string.isRequired,
};

export default CreatorRouter;
