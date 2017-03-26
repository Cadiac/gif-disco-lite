import { combineReducers } from 'redux';
import creator from '../domains/creator/CreatorReducer';
import settings from '../domains/settings/SettingsReducer';

const rootReducer = combineReducers({
  creator,
  settings,
});

export default rootReducer;
