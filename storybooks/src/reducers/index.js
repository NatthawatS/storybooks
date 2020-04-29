import { combineReducers } from 'redux';
// import AuthReducer from './authReducer';
import userReducer from './user';

const AppReducer = combineReducers({
  user: userReducer,
});

export default AppReducer;
