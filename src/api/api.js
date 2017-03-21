import BPromise from 'bluebird';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  timeout: 10000,
});

// POST /api/v1/gifs
// eslint-disable-next-line import/prefer-default-export
export const createGif = blob => api.post('/gifs')
  .then(response => response.json())
  .then(response => BPromise.props({
    publicUrl: response.publicUrl,
    aws: api.put(response.signedUrl, blob),
  }));
