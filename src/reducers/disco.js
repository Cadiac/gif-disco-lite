import { discoTypes } from '../constants/actionTypes';

const initialState = {
  loading: false,
  gifUrl: '',
};

export default function disco(state = initialState, action) {
  switch (action.type) {
    case discoTypes.SET_GIF_URL:
      return {
        ...state,
        gifUrl: action.payload,
      };
    default:
      return state;
  }
}
