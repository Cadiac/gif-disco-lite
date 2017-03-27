import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

import VideoMiddleware from '../domains/creator/VideoMiddleware';
import VideoService from '../domains/creator/VideoService';

const logger = createLogger();

const videoService = new VideoService();

export default function configureStore(initialState) {
  const videoMiddleware = VideoMiddleware(videoService);

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger, videoMiddleware));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const nextReducer = require('./reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
