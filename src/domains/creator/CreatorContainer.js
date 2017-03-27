import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import RecorderContainer from './Recorder/RecorderContainer';
import CreatorRouter from './CreatorRouter';

const CreatorContainer = (props) => {
  const { step } = props;
  return (
    <section className="hero is-info is-fullheight">
      <RecorderContainer />
      <div className="hero-body">
        <div className="container has-text-centered">
          <CreatorRouter step={step} />
        </div>
      </div>
    </section>
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
