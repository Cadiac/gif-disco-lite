import { combineReducers } from 'redux';
import disco from './disco';
import settings from './settings';

const rootReducer = combineReducers({
  disco,
  settings,
});

export default rootReducer;
