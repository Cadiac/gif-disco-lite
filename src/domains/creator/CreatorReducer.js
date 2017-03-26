import { creatorTypes, creatorSteps } from './CreatorConstants';

const initialState = {
  step: creatorSteps.START,
  countdown: 3,
  recording: false,
  gifUrl: null,
  error: null,
  loading: false,
};

export default function creator(state = initialState, action) {
  switch (action.type) {
    case creatorTypes.START_GIF_CREATION:
      return {
        ...state,
        step: creatorSteps.COUNTDOWN,
      };

    case creatorTypes.ABORT_GIF_CREATION:
      return {
        ...state,
        step: creatorSteps.START,
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
        step: creatorSteps.ACCEPT_OR_REJECT,
      };

    case creatorTypes.SET_GIF_URL:
      return {
        ...state,
        gifUrl: action.payload.gifUrl,
      };

    case creatorTypes.ACCEPT_GIF:
      return {
        ...state,
        step: creatorSteps.COMPLETE,
      };

    case creatorTypes.REJECT_GIF:
      return {
        ...state,
        countdown: 3,
        step: creatorSteps.COUNTDOWN,
      };

    case creatorTypes.RESET_CREATOR:
      return {
        initialState,
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
