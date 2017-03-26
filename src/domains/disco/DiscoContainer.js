import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DiscoActions from '../actions/disco';

import Disco from '../components/Disco/Disco';

const DiscoContainer = (props) => {
  const { disco, settings, actions } = props;
  return (
    <Disco
      disco={disco}
      settings={settings}
      onGifCreate={actions.createGif}
    />
  );
};

DiscoContainer.propTypes = {
  disco: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    gifUrl: PropTypes.string.isRequired,
  }).isRequired,

  settings: PropTypes.shape({
    vignette: PropTypes.number.isRequired,
    split: PropTypes.number.isRequired,
    chroma: PropTypes.string.isRequired,
  }).isRequired,

  actions: PropTypes.shape({
    createGif: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    disco: state.disco,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DiscoActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(DiscoContainer);
