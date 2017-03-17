import React, { Component } from 'react';
import Seriously from 'seriously';
import 'seriously/effects/seriously.vignette';
import 'seriously/effects/seriously.split';
import 'seriously/effects/seriously.chroma';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vignette: 1,
      split: 1,
    };

    this.handleVignetteChange = this.handleVignetteChange.bind(this);
    this.handleSplitChange = this.handleSplitChange.bind(this);
  }

  componentDidMount() {
    // Setup Seriously
    this.composition = new Seriously();

    // Effects
    this.vignette = this.composition.effect('vignette');
    this.vignette.amount = this.state.vignette;

    this.split = this.composition.effect('split');
    this.split.split = this.state.split;

    // Composition target
    this.target = this.composition.target('#canvas');

    // Connect composition sources
    this.vignette.source = '#colorbars';
    this.split.sourceA = '#colorbars';
    this.split.sourceB = this.vignette;
    this.target.source = this.split;

    // Start composition
    this.composition.go();
  }

  componentWillUpdate(nextProps, nextState) {
    // Connect Seriously effect settings to state
    this.vignette.amount = nextState.vignette;
    this.split.split = nextState.split;
  }

  componentWillUnmount() {
    // Free the memory taken up by Seriously
    this.composition.destroy();
  }

  handleVignetteChange(event) {
    this.setState({ vignette: event.target.value });
  }

  handleSplitChange(event) {
    this.setState({ split: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <div>
            <label htmlFor="vignette-range">Vignette</label>
            <input
              type="range"
              id="vignette-range"
              min="0"
              max="20"
              step="0.0001"
              value={this.state.vignette}
              onChange={this.handleVignetteChange}
            />
            <label htmlFor="split">Split</label>
            <input
              type="range"
              id="split"
              min="0"
              max="1"
              step="0.0001"
              value={this.state.split}
              onChange={this.handleSplitChange}
            />
          </div>
        </div>
        <img src="images/colorbars.png" id="colorbars" alt="colorbars" />
        <canvas id="canvas" width="220" height="165" />
      </div>
    );
  }
}

export default App;
