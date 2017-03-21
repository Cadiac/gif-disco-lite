import BPromise from 'bluebird';
import { discoTypes } from '../constants/actionTypes';
import * as api from '../api/api';

// eslint-disable-next-line import/prefer-default-export
export function createGif(blob) {
  return dispatch => api.createGif(blob)
    .then(response => BPromise.all([
      dispatch({ type: discoTypes.GIF_CREATE_SUCCESS }),
      dispatch({
        type: discoTypes.SET_GIF_URL,
        payload: { gifUrl: response.data.gifUrl },
      }),
    ]))
    .catch(error => dispatch({ type: discoTypes.API_ERROR, payload: { error } }));
}
