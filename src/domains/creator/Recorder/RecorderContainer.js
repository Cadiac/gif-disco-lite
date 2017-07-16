import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './Recorder.css';

import CreatorActions from '../CreatorActions';

class RecorderContainer extends Component {
  componentDidMount() {
    this.props.actions.initializeCreator(this.canvas);
  }

  render() {
    const { preview } = this.props;
    return (
      <div className="Recorder">
        <div className="Recorder-canvas">
          <canvas
            id="canvas"
            width="480"
            height="480"
            className={preview ? 'Recorder-visible' : 'Recorder-hidden'}
            ref={(canvas) => { this.canvas = canvas; }}
          />
        </div>
      </div>
    );
  }
}

RecorderContainer.propTypes = {
  preview: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    initializeCreator: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    preview: state.creator.preview,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CreatorActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(RecorderContainer);
