import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import App from './components/App/App';
import configureStore from './store/create';

import './index.css';

// loads the Icon plugin
UIkit.use(Icons);

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'));
