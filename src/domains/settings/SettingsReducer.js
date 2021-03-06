import { settingTypes } from './SettingsConstants';

const initialState = {
  vignette: 1,
  split: 0,
  chroma: '#4def29',
  webcam: false,
};

export default function settings(state = initialState, action) {
  switch (action.type) {
    case settingTypes.SET_VIGNETTE:
      return {
        ...state,
        vignette: action.payload.vignette,
      };
    case settingTypes.SET_SPLIT:
      return {
        ...state,
        split: action.payload.split,
      };
    case settingTypes.SET_CHROMA_COLOR:
      return {
        ...state,
        chroma: action.payload.chroma,
      };
    case settingTypes.TOGGLE_WEBCAM:
      return {
        ...state,
        webcam: !state.webcam,
      };
    default:
      return state;
  }
}
