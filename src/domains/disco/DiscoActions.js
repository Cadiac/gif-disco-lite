/* TODO move this to creator, role of disco should be the display thing
import BPromise from 'bluebird';
import { creatorTypes } from '../constants/actionTypes';
import * as api from '../utils/api';

// eslint-disable-next-line import/prefer-default-export
export function createGif(blob) {
  return (dispatch) => {
    dispatch({ type: creatorTypes.GIF_CREATE_REQUEST });

    return api.createGif(blob)
      .then(data => BPromise.all([
        dispatch({ type: creatorTypes.GIF_CREATE_SUCCESS }),
        dispatch({
          type: creatorTypes.SET_GIF_URL,
          payload: { gifUrl: data.publicUrl },
        }),
      ]))
      .catch(error => dispatch({ type: creatorTypes.API_ERROR, error }));
  };
}
*/
