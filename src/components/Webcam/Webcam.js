import React, { Component } from 'react';

import { hasGetUserMedia, captureUserMedia } from './utils';
import './Webcam.css';

class Webcam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
    };

    this.requestUserMedia = this.requestUserMedia.bind(this);
  }

  componentDidMount() {
    if (!hasGetUserMedia) {
      // eslint-disable-next-line no-undef, no-alert
      alert('Incompatible browser');
      return;
    }
    this.requestUserMedia();
  }

  requestUserMedia() {
    captureUserMedia((stream) => {
      // eslint-disable-next-line no-undef
      this.setState({ src: window.URL.createObjectURL(stream) }, this.props.onReady);
    });
  }

  render() {
    const { src } = this.state;
    return (
      <video id="webcam" autoPlay muted src={src} width="1280" height="720" />
    );
  }
}

Webcam.propTypes = {
  onReady: React.PropTypes.func.isRequired,
};

export default Webcam;