import React, { PropTypes, Component } from 'react';
import { BlockPicker } from 'react-color';

import './Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPickerVisible: false,
    };

    this.renderColorPicker = this.renderColorPicker.bind(this);
  }

  renderColorPicker() {
    const { onChromaChange, chroma } = this.props;
    if (this.state.colorPickerVisible) {
      return (
        <BlockPicker
          color={chroma}
          onChangeComplete={(color) => {
            onChromaChange(color);
            this.setState({ colorPickerVisible: false });
          }}
        />
      );
    }
    return (
      <button onClick={() => this.setState({ colorPickerVisible: true })}>
        Chroma Color
      </button>
    );
  }

  render() {
    const { onVignetteChange, onSplitChange, onToggleWebcam,
      vignette, split, webcam } = this.props;

    return (
      <div className="Disco-settings">
        <div className="field">
          <label htmlFor="webcam-visible">
            <input
              id="webcam-visible"
              className="checkbox"
              type="checkbox"
              value="webcam"
              checked={webcam}
              onChange={onToggleWebcam}
            />
            Webcam
          </label>
        </div>
        <div className="field">
          <label htmlFor="vignette-range">
            <input
              type="range"
              id="vignette-range"
              min="0"
              max="20"
              step="0.0001"
              value={vignette}
              onChange={onVignetteChange}
            />
            Vignette
          </label>
        </div>
        <div className="field">
          <label htmlFor="split">
            <input
              type="range"
              id="split"
              min="0"
              max="1"
              step="0.0001"
              value={split}
              onChange={onSplitChange}
            />
            Split
          </label>
        </div>
        <div className="field">
          {this.renderColorPicker()}
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  onVignetteChange: PropTypes.func.isRequired,
  onSplitChange: PropTypes.func.isRequired,
  onChromaChange: PropTypes.func.isRequired,
  onToggleWebcam: PropTypes.func.isRequired,
  vignette: PropTypes.number.isRequired,
  split: PropTypes.number.isRequired,
  chroma: PropTypes.string.isRequired,
  webcam: PropTypes.bool.isRequired,
};

export default Settings;
