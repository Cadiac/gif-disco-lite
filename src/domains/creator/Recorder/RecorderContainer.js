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

  handleWebcamReady() {
    this.props.actions.initializeCreator(this.canvas, '#webcam');
  }

  render() {
    return (
      <div className="Disco">
        <div className="Disco-canvas">
          <canvas
            id="canvas"
            width="480"
            height="480"
            ref={(canvas) => { this.canvas = canvas; }}
          />
        </div>
        <div className="Disco-hidden">
          <Webcam onReady={this.handleWebcamReady} />
        </div>
      </div>
    );
  }
}

RecorderContainer.propTypes = {
  actions: PropTypes.shape({
    initializeCreator: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    creator: state.creator,
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
