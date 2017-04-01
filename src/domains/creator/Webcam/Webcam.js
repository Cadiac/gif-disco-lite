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
      // TODO...
      // eslint-disable-next-line no-undef, no-alert
      alert('Incompatible browser');
      return;
    }
    this.requestUserMedia();
  }

  requestUserMedia() {
    captureUserMedia((stream) => {
      this.setState({
        src: (window.URL || window.webkitURL) ?
          (window.URL || window.webkitURL).createObjectURL(stream) :
          stream,
      }, () => this.props.onReady(this.video));
    });
  }

  render() {
    const { src } = this.state;
    return (
      <video
        id="webcam"
        autoPlay
        muted
        src={src}
        width="480"
        height="480"
        ref={(video) => { this.video = video; }}
      />
    );
  }
}

Webcam.propTypes = {
  onReady: React.PropTypes.func.isRequired,
};

export default Webcam;
