import { settingTypes } from './SettingsConstants';

export const setVignette = vignette => ({
  payload: { vignette },
  type: settingTypes.SET_VIGNETTE,
});

export const setSplit = split => ({
  payload: { split },
  type: settingTypes.SET_SPLIT,
});

export const setChroma = chroma => ({
  payload: { chroma },
  type: settingTypes.SET_CHROMA_COLOR,
});

export const toggleWebcam = () => ({
  type: settingTypes.TOGGLE_WEBCAM,
});
