import BPromise from 'bluebird';
import { creatorTypes } from './CreatorConstants';

export const initializeCreator = (canvas, webcam) => ({
  type: creatorTypes.INITIALIZE_CREATOR,
  payload: { canvas, webcam },
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
      .then(() => dispatch({ type: creatorTypes.DECREMENT_COUNTDOWN }))
      .delay(1000) // Dance!
      .then(() => dispatch({ type: creatorTypes.START_GIF_RECORDING }));
  }
);

export const abortCreator = () => ({
  type: creatorTypes.ABORT_GIF_CREATION,
});

export const decrementCountdown = () => ({
  type: creatorTypes.DECREMENT_COUNTDOWN,
});

export default {
  initializeCreator,
  startCreator,
  abortCreator,
  decrementCountdown,
};
