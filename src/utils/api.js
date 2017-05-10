import BPromise from 'bluebird';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
});

// POST /api/v1/gifs
// eslint-disable-next-line import/prefer-default-export
export const createGif = blob => api.post('/gifs')
  .then((response) => {
    const options = {
      headers: {
        'Content-Type': 'image/gif',
      },
    };
    return BPromise.props({
      publicUrl: response.data.publicUrl,
      aws: api.put(response.data.signedUrl, blob, options),
    });
  });
