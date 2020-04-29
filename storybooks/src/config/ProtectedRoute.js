import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase from 'firebase';

const ProtectedRoute = ({ component: Component, authenticated }) => {
  const me = firebase.auth().currentUser;

  return (
    <Route
      render={props =>
        me ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
