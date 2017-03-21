import { settingTypes } from '../constants/actionTypes';

const initialState = {
  vignette: 1,
  split: 0,
  chroma: '#4def29',
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
    default:
      return state;
  }
}
