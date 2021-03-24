import {fromJS} from 'immutable';
import {ACCOUNT_LOGIN_SUCCESS, ACCOUNT_LOGOUT} from './constants';

const initState = fromJS({
  accountInfo: {},
});

export default function (state = initState, action) {
  switch (action.type) {
    case ACCOUNT_LOGIN_SUCCESS:
      return state.set('accountInfo', action.payload.data);
    case ACCOUNT_LOGOUT:
      return state.set('accountInfo', {});
    default:
      return state;
  }
}
