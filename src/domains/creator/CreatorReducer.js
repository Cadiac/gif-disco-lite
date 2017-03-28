import { creatorTypes, creatorSteps } from './CreatorConstants';

const initialState = {
  step: creatorSteps.START,
  countdown: 3,
  webcam: false,
  recording: false,
  preview: true,
  gifUrl: null,
  blob: null,
  error: null,
  loading: false,
};

export default function creator(state = initialState, action) {
  switch (action.type) {
    case creatorTypes.START_WEBCAM:
      return {
        ...state,
        webcam: true,
        preview: true,
      };
    case creatorTypes.START_GIF_CREATION:
      return {
        ...state,
        countdown: 3,
        gifUrl: null,
        blob: null,
        preview: true,
        step: creatorSteps.COUNTDOWN,
      };
    case creatorTypes.DECREMENT_COUNTDOWN:
      return {
        ...state,
        countdown: state.countdown - 1,
      };
    case creatorTypes.START_GIF_RECORDING:
      return {
        ...state,
        recording: true,
        step: creatorSteps.RECORDING,
      };
    case creatorTypes.END_GIF_RECORDING:
      return {
        ...state,
        recording: false,
        preview: false,
        step: creatorSteps.ACCEPT_OR_REJECT,
      };
    case creatorTypes.SET_GIF_URL:
      return {
        ...state,
        gifUrl: action.payload.gifUrl,
        blob: action.payload.blob,
      };

    case creatorTypes.RESET_CREATOR:
      return {
        ...initialState,
      };
    case creatorTypes.GIF_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case creatorTypes.GIF_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        step: creatorSteps.COMPLETE,
      };
    case creatorTypes.API_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case creatorTypes.DISMISS_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
