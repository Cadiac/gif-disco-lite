import React, { Component } from 'react';

import GIF from 'gif.js';

import Seriously from 'seriously';
import 'seriously/effects/seriously.vignette';
import 'seriously/effects/seriously.split';
import 'seriously/effects/seriously.blend';
import 'seriously/effects/seriously.chroma';

import Webcam from '../Webcam/Webcam';
import Settings from '../Settings/Settings';

import './Disco.css';

class Disco extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vignette: 1,
      split: 0,
      chroma: '#4def29',
      gif: null,
      recorder: null,
    };

    this.handleWebcamReady = this.handleWebcamReady.bind(this);
    this.handleVignetteChange = this.handleVignetteChange.bind(this);
    this.handleSplitChange = this.handleSplitChange.bind(this);
    this.handleChromaChange = this.handleChromaChange.bind(this);
    this.handleRecordingStart = this.handleRecordingStart.bind(this);
    this.handleRecordingStop = this.handleRecordingStop.bind(this);
  }

  componentDidMount() {
    // Setup Seriously
    this.composition = new Seriously();

    // Effects
    this.vignette = this.composition.effect('vignette');
    this.vignette.amount = this.state.vignette;

    this.split = this.composition.effect('split');
    this.split.split = this.state.split;

    this.blend = this.composition.effect('blend');

    this.chroma = this.composition.effect('chroma');
    this.chroma.weight = 1.32;
    this.chroma.balance = 0;
    this.chroma.screen = this.state.chroma;
    this.chroma.clipWhite = 0.85;
    this.chroma.clipBlack = 0.5125;

    // Resize video
    this.reformat = this.composition.transform('reformat');
    this.reformat.mode = 'cover';
    this.reformat.width = 1280;
    this.reformat.height = 720;

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

  componentWillUpdate(nextProps, nextState) {
    // Connect Seriously effect settings to state
    this.vignette.amount = nextState.vignette;
    this.split.split = nextState.split;
    this.chroma.screen = nextState.chroma;
  }

  componentWillUnmount() {
    // Free the memory taken up by Seriously
    this.composition.destroy();
  }

  handleWebcamReady() {
    this.composition.go();
  }

  handleVignetteChange(event) {
    this.setState({ vignette: Number(event.target.value) });
  }

  handleSplitChange(event) {
    this.setState({ split: Number(event.target.value) });
  }

  handleChromaChange(color) {
    this.setState({ chroma: color.hex });
  }

  handleRecordingStart() {
    this.gif = new GIF({
      workers: 2,
      quality: 10,
      transparent: 'rgba(0,0,0,0)',
    });
    const interval = setInterval(() => {
      this.gif.addFrame(this.canvas, { delay: 100, copy: true });
    }, 100);


    console.log('Started gif generation.');
    this.setState({ recorder: interval });
  }

  handleRecordingStop() {
    clearInterval(this.state.recorder);

    this.gif.on('finished', (blob) => {
      /* eslint-disable no-undef */
      const gifURL = URL.createObjectURL(blob);
      console.log('Gif generation finished!', URL.createObjectURL(blob));
      /* eslint-enable no-undef */
      this.setState({
        gif: gifURL,
      });
    });

    this.gif.render();
  }

  render() {
    return (
      <div className="Disco">
        <div className="Disco-canvas">
          <div className="Disco-hidden">
            <Webcam onReady={this.handleWebcamReady} />
          </div>
          <canvas
            id="canvas"
            width="1280"
            height="720"
            ref={(canvas) => { this.canvas = canvas; }}
          />
        </div>
        <Settings
          onVignetteChange={this.handleVignetteChange}
          onSplitChange={this.handleSplitChange}
          onChromaChange={this.handleChromaChange}
          vignette={this.state.vignette}
          split={this.state.split}
          chroma={this.state.chroma}
        />
        <button onClick={this.handleRecordingStart}>
          Start recording
        </button>
        <button onClick={this.handleRecordingStop}>
          Stop recording
        </button>
        <img src={this.state.gif} alt="Dance!" />
      </div>
    );
  }
}

export default Disco;
