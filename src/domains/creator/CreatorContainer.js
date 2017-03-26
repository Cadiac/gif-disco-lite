import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CreatorRouter from './CreatorRouter';

const CreatorContainer = (props) => {
  const { step } = props;
  return (
    <div>
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
