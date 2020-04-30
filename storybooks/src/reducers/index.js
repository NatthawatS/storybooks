import { combineReducers } from "redux";
// import AuthReducer from './authReducer';
import userReducer from "./user";
import userBooking from "./booking";
// import from './'

const AppReducer = combineReducers({
  user: userReducer,
  booking: userBooking,
});

export default AppReducer;
