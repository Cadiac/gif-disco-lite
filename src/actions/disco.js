import BPromise from 'bluebird';
import { discoTypes } from '../constants/actionTypes';
import * as api from '../api/api';

// eslint-disable-next-line import/prefer-default-export
export function createGif(blob) {
  return (dispatch) => {
    dispatch({ type: discoTypes.GIF_CREATE_REQUEST });

    return api.createGif(blob)
      .then(data => BPromise.all([
        dispatch({ type: discoTypes.GIF_CREATE_SUCCESS }),
        dispatch({
          type: discoTypes.SET_GIF_URL,
          payload: { gifUrl: data.publicUrl },
        }),
      ]))
      .catch(error => dispatch({ type: discoTypes.API_ERROR, error }));
  };
}
