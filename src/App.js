import React, { Component } from 'react';
import Seriously from 'seriously';
import 'seriously/effects/seriously.vignette';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
    };

    this.handleChange = this.handleChange.bind(this);

    this.seriously = new Seriously();
    this.vignette = this.seriously.effect('vignette');
    this.vignette.amount = this.state.amount;

    // this.colorbars = {};
    this.target = {};
  }

  componentDidMount() {
    // this.colorbars = this.seriously.source('#colorbars');
    this.target = this.seriously.target('#canvas');

    this.vignette.source = '#colorbars';
    this.target.source = this.vignette;

    this.seriously.go();
  }

  componentWillUpdate(nextProps, nextState) {
    // Connect Seriously effect settings to state
    this.vignette.amount = nextState.amount;
  }

  handleChange(event) {
    this.setState({ amount: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <input
            type="range"
            id="vignette-range"
            min="0"
            max="20"
            step="0.0001"
            value={this.state.amount}
            onChange={this.handleChange}
          />
        </div>
        <img src="images/colorbars.png" id="colorbars" alt="colorbars" />
        <canvas id="canvas" width="640" height="480" />
      </div>
    );
  }
}

export default App;
