import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './Recorder.css';

import Webcam from '../Webcam/Webcam';
import CreatorActions from '../CreatorActions';

class RecorderContainer extends Component {
  constructor(props) {
    super(props);

    this.handleWebcamReady = this.handleWebcamReady.bind(this);
  }

  handleWebcamReady(video) {
    this.props.actions.initializeCreator(this.canvas, video);
  }

  render() {
    const { preview, webcam } = this.props;
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
        <div className="Recorder-hidden">
          <Webcam onReady={this.handleWebcamReady} webcam={webcam} />
        </div>
      </div>
    );
  }
}

RecorderContainer.propTypes = {
  preview: PropTypes.bool.isRequired,
  webcam: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    initializeCreator: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    preview: state.creator.preview,
    webcam: state.settings.webcam,
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
