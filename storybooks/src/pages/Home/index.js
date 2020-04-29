import React, { useState } from "react";
import {
  useDispatch,
  // useSelector
} from "react-redux";
import { Button } from "antd";
import firebase from "firebase";

import { logout } from "../../reducers/authReducer";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>
      HOme
      <Button
        type="primary"
        className="login-form-button"
        onClick={() => {
          dispatch(logout());
          firebase.auth().signOut();
        }}
      >
        signOut
      </Button>
    </div>
  );
};

export default Home;
