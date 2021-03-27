import {fromJS} from 'immutable';
import {
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGOUT,
  ACCOUNT_REGISTER_SUCCESS,
  ACCOUNT_UPDATE_AVATAR_SUCCESS,
  ACCOUNT_UPDATE_INFO_SUCCESS,
} from './constants';

const initState = fromJS({
  accountInfo: {},
});

export default function (state = initState, action) {
  switch (action.type) {
    case ACCOUNT_LOGIN_SUCCESS:
      return state.set('accountInfo', action.payload.data);
    case ACCOUNT_LOGOUT:
      return state.set('accountInfo', {});
    case ACCOUNT_REGISTER_SUCCESS:
      return state.set('accountInfo', action.payload.data);
    case ACCOUNT_UPDATE_AVATAR_SUCCESS:
      return state.set('accountInfo', action.payload.data);
    case ACCOUNT_UPDATE_INFO_SUCCESS:
      return state.set('accountInfo', action.payload.data);
    default:
      return state;
  }
}
