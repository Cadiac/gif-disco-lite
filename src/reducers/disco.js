import { discoTypes } from '../constants/actionTypes';

const initialState = {
  loading: false,
  gifUrl: '',
  error: null,
};

export default function disco(state = initialState, action) {
  switch (action.type) {
    case discoTypes.GIF_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case discoTypes.GIF_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case discoTypes.SET_GIF_URL:
      return {
        ...state,
        gifUrl: action.payload.gifUrl,
      };
    case discoTypes.API_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case discoTypes.DISMISS_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
