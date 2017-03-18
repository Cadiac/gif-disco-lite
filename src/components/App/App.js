import React from 'react';

import Disco from '../Disco/Disco';
import logo from './logo.svg';
import './App.css';

const App = () => (
  <div className="App">
    <Disco />
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>GIF Disco Lite</h2>
    </div>
  </div>
);

export default App;
