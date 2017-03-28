import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CreatorActions from '../CreatorActions';

import './Confirmation.css';

const Spinner = () => (
  <div className="container">
    <span className="icon is-large">
      <i className="fa fa-cog fa-spin" />
    </span>
    <h1 className="title is-1">Processing..</h1>
  </div>
);

const ConfirmationContainer = (props) => {
  const { gifUrl, actions } = props;

  if (!gifUrl) {
    return <Spinner />;
  }

  return (
    <div className="preview">
      <img src={gifUrl} alt="Awesome moves!" />
      <div className="spacer">
        <div className="field is-grouped is-centered">
          <p className="control">
            <button className="button is-warning is-large" onClick={actions.uploadGif}>
              Accept
            </button>
          </p>
          <p className="control">
            <button className="button is-info is-large" onClick={actions.startCreator}>
              Try again
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

ConfirmationContainer.propTypes = {
  gifUrl: PropTypes.string,
  actions: PropTypes.shape({
    startCreator: PropTypes.func.isRequired,
    uploadGif: PropTypes.func.isRequired,
  }).isRequired,
};

ConfirmationContainer.defaultProps = {
  gifUrl: null,
};

function mapStateToProps(state) {
  return {
    gifUrl: state.creator.gifUrl,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CreatorActions, dispatch),
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps)(ConfirmationContainer);
