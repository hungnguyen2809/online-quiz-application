import {combineReducers} from 'redux';
import AccountReducer from './Account/reducers';

export const rootReducers = combineReducers({
  accountInfo: AccountReducer,
});
