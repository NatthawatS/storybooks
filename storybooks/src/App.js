import React, { useState, useEffect } from "react";
import * as firebase from "firebase/app";
import { Provider } from "react-redux";
import Route from "./config/routes";
import store from "./store";
import LoadingPage from "./components/LoadingPage";
import "./App.css";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      user ? setAuthenticated(true) : setAuthenticated(false);
      setLoading(false);
    });
  }, [authenticated]);
  return (
    <Provider store={store}>
      {loading ? <LoadingPage /> : <Route authenticated={authenticated} />}
    </Provider>
  );
};

export default App;
