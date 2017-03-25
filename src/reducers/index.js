import { combineReducers } from 'redux';
import creator from './creator';
import settings from './settings';

const rootReducer = combineReducers({
  creator,
  settings,
});

export default rootReducer;
