import React, { PropTypes } from 'react';

import { creatorSteps } from './CreatorConstants';
import CountdownContainer from './Countdown/CountdownContainer';

const CreatorRouter = (props) => {
  const { step } = props;
  switch (step) {
    case creatorSteps.START:
      return (
        <button className="button is-primary">Start</button>
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
