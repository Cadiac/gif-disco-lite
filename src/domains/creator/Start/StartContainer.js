import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CreatorActions from '../CreatorActions';

const StartContainer = (props) => {
  const { actions } = props;
  return (
    <div className="container">
      <h1 className="title is-1">
        Ready to dance?
      </h1>
      <div className="field is-grouped is-centered">
        <p className="control">
          <button
            className="button is-primary is-inverted is-outlined is-large"
            onClick={actions.startCreator}
          >
            Start
          </button>
        </p>
      </div>
    </div>
  );
};

StartContainer.propTypes = {
  actions: PropTypes.shape({
    startCreator: PropTypes.func.isRequired,
  }).isRequired,

};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CreatorActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(StartContainer);
