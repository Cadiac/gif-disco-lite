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
    <p className="subtitle is-3">Processing..</p>
  </div>
);

const ConfirmationContainer = (props) => {
  const { gifUrl, loading, actions } = props;

  if (!gifUrl) {
    return <Spinner />;
  }

  return (
    <div className="preview">
      <img src={gifUrl} alt="Awesome moves!" />
      <div className="spacer">
        {loading ?
          <button className="button is-info is-large is-loading" /> :
          <div className="field is-grouped is-centered">
            <p className="control">
              <button
                className="button is-warning is-large"
                onClick={actions.uploadGif}
              >
                Accept
              </button>
            </p>
            <p className="control">
              <button
                className="button is-info is-large"
                onClick={actions.startCreator}
              >
                Try again
              </button>
            </p>
          </div>
        }
      </div>
    </div>
  );
};

ConfirmationContainer.propTypes = {
  gifUrl: PropTypes.string,
  loading: PropTypes.bool.isRequired,
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
    loading: state.creator.loading,
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
