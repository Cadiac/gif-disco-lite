import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SettingsActions from './SettingsActions';

import Settings from './Settings';

const SettingsContainer = (props) => {
  const { settings, actions } = props;
  return (
    <Settings
      settings={settings}
      onSetVignette={actions.setVignette}
      onSetSplit={actions.setSplit}
      onSetChroma={actions.setChroma}
    />
  );
};

SettingsContainer.propTypes = {
  settings: PropTypes.shape({
    vignette: PropTypes.number.isRequired,
    split: PropTypes.number.isRequired,
    chroma: PropTypes.string.isRequired,
  }).isRequired,

  actions: PropTypes.shape({
    setVignette: PropTypes.func.isRequired,
    setSplit: PropTypes.func.isRequired,
    chroma: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SettingsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SettingsContainer);
