import React, { Component, PropTypes } from 'react';

import GIF from 'gif.js';

import Seriously from 'seriously';
import 'seriously/effects/seriously.vignette';
import 'seriously/effects/seriously.split';
import 'seriously/effects/seriously.chroma';

import Webcam from '../Webcam/Webcam';

import './Disco.css';

class Disco extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recorder: null,
    };

    this.handleWebcamReady = this.handleWebcamReady.bind(this);
    this.handleRecordingStart = this.handleRecordingStart.bind(this);
    this.handleRecordingStop = this.handleRecordingStop.bind(this);
  }

  componentDidMount() {
    const { settings } = this.props;

    // Setup Seriously
    this.composition = new Seriously();

    // Effects
    this.vignette = this.composition.effect('vignette');
    this.vignette.amount = settings.vignette;

    this.split = this.composition.effect('split');
    this.split.split = settings.split;

    this.chroma = this.composition.effect('chroma');
    this.chroma.weight = 1.32;
    this.chroma.balance = 0;
    this.chroma.screen = settings.chroma;
    this.chroma.clipWhite = 0.85;
    this.chroma.clipBlack = 0.5125;

    // Resize video
    this.reformat = this.composition.transform('reformat');
    this.reformat.mode = 'cover';
    this.reformat.width = 480;
    this.reformat.height = 480;

    // Composition target
    this.target = this.composition.target('#canvas');

    // Grab video from webcam
    this.video = this.composition.source('#webcam');

    // Connect composition sources
    this.reformat.source = this.video;

    this.chroma.source = this.reformat;
    this.vignette.source = this.chroma;

    this.split.sourceA = this.vignette;
    this.split.sourceB = this.reformat;

    this.target.source = this.split;
  }

  componentWillUpdate(nextProps) {
    // Connect Seriously effect settings to props
    this.vignette.amount = nextProps.settings.vignette;
    this.split.split = nextProps.settings.split;
    this.chroma.screen = nextProps.settings.chroma;
  }

  componentWillUnmount() {
    // Free the memory taken up by Seriously
    this.composition.destroy();
  }

  handleWebcamReady() {
    this.composition.go();
  }

  handleRecordingStart() {
    this.gif = new GIF({
      workers: 2,
      quality: 10,
      transparent: 'rgba(0, 0, 0, 0)',
    });
    const interval = setInterval(() => {
      this.gif.addFrame(this.canvas, { delay: 100 });
    }, 100);

    console.log('Started gif generation.');
    this.setState({ recorder: interval });
  }

  handleRecordingStop() {
    clearInterval(this.state.recorder);

    this.gif.on('finished', (blob) => {
      console.log('Gif generation finished!');
      this.props.onGifCreate(blob);
    });

    this.gif.render();
  }

  render() {
    const { disco } = this.props;
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
        <button onClick={this.handleRecordingStart}>
          Start recording
        </button>
        <button onClick={this.handleRecordingStop}>
          Stop recording
        </button>
        <img src={disco.gifUrl} alt="Dance!" />
      </div>
    );
  }
}

Disco.propTypes = {
  disco: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    gifUrl: PropTypes.string.isRequired,
  }).isRequired,

  settings: PropTypes.shape({
    vignette: PropTypes.number.isRequired,
    split: PropTypes.number.isRequired,
    chroma: PropTypes.string.isRequired,
  }).isRequired,

  onGifCreate: PropTypes.func.isRequired,
};

export default Disco;
