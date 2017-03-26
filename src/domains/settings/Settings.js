import React, { PropTypes, Component } from 'react';
import { BlockPicker } from 'react-color';

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
    const { onVignetteChange, onSplitChange,
      vignette, split } = this.props;

    return (
      <div className="Disco-settings">
        <label htmlFor="vignette-range">Vignette</label>
        <input
          type="range"
          id="vignette-range"
          min="0"
          max="20"
          step="0.0001"
          value={vignette}
          onChange={onVignetteChange}
        />
        <label htmlFor="split">Split</label>
        <input
          type="range"
          id="split"
          min="0"
          max="1"
          step="0.0001"
          value={split}
          onChange={onSplitChange}
        />
        {this.renderColorPicker()}
      </div>
    );
  }
}

Settings.propTypes = {
  onVignetteChange: PropTypes.func.isRequired,
  onSplitChange: PropTypes.func.isRequired,
  onChromaChange: PropTypes.func.isRequired,
  vignette: PropTypes.number.isRequired,
  split: PropTypes.number.isRequired,
  chroma: PropTypes.string.isRequired,
};

export default Settings;
