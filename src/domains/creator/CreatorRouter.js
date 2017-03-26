import React, { PropTypes } from 'react';

import { creatorSteps } from './CreatorConstants';
import CountdownContainer from './Countdown/CountdownContainer';
import StartContainer from './Start/StartContainer';

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
    default:
      return null;
  }
};
CreatorRouter.propTypes = {
  step: PropTypes.string.isRequired,
};

export default CreatorRouter;
