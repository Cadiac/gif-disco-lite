import BPromise from 'bluebird';
import * as api from '../../utils/api';
import { creatorTypes } from './CreatorConstants';

export const initializeCreator = canvas => ({
  type: creatorTypes.INITIALIZE_CREATOR,
  payload: { canvas },
});

export const startCreator = () => (
  (dispatch) => {
    dispatch({ type: creatorTypes.START_GIF_CREATION });

    return BPromise
      .delay(1000) // 3...
      .then(() => dispatch({ type: creatorTypes.DECREMENT_COUNTDOWN }))
      .delay(1000) // 2...
      .then(() => dispatch({ type: creatorTypes.DECREMENT_COUNTDOWN }))
      .delay(1000) // 1...
      .then(() => BPromise.all([
        dispatch({ type: creatorTypes.DECREMENT_COUNTDOWN }),
        dispatch({ type: creatorTypes.START_GIF_RECORDING }),
      ]));
  }
);

export const resetCreator = () => ({ type: creatorTypes.RESET_CREATOR });

export const decrementCountdown = () => ({
  type: creatorTypes.DECREMENT_COUNTDOWN,
});

export const uploadGif = () => (
  (dispatch, getState) => {
    dispatch({ type: creatorTypes.GIF_CREATE_REQUEST });

    const blob = getState().creator.blob;

    return api.createGif(blob)
      .then(() => dispatch({ type: creatorTypes.GIF_CREATE_SUCCESS }))
      .catch(error => dispatch({ type: creatorTypes.API_ERROR, error }));
  }
);

export default {
  initializeCreator,
  startCreator,
  resetCreator,
  decrementCountdown,
  uploadGif,
};
