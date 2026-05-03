import { applyMiddleware, combineReducers, createStore } from 'redux';
import ipAddressReducer from './ipAddressReducer';
import userIdReducer from './userIdReducer';
import sessionIdReducer from './sessionIdReducer';

import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  setIPAddress: ipAddressReducer,
  setUserID: userIdReducer,
  setSessionID: sessionIdReducer
});



// export default rootReducer;
export const store = createStore(rootReducer, applyMiddleware(thunk));
