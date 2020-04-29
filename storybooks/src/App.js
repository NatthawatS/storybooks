import React, { useState, useEffect } from "react";
import * as firebase from "firebase/app";
import { Provider } from "react-redux";
import Route from "./config/routes";
import store from "./store";
import LoadingPage from "./components/LoadingPage";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    firebase.auth().onAuthStateChanged((authenticated) => {
      authenticated ? setAuthenticated(true) : setAuthenticated(false);
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

// import React from "react";
// import { Provider } from "react-redux";
// import * as firebase from "firebase";
// import store from "./store";
// import Route from "./config/routes";
// import LoadingPage from "./components/LoadingPage";
// import "./App.css";

// class App extends React.Component {
//   state = {
//     authenticated: false,
//     loading: true,
//   };
//   componentDidMount() {
//     this.setState({ loading: true });
//     firebase.auth().onAuthStateChanged((authenticated) => {
//       // console.log(authenticated);

//       authenticated
//         ? this.setState(() => ({
//             authenticated: true,
//           }))
//         : this.setState(() => ({
//             authenticated: false,
//           }));
//       this.setState({ loading: false });
//     });
//   }

//   render() {
//     // if (this.state.loading) {
//     //   return <LoadingPage />;
//     // }
//     return (
//       <Provider store={store}>
//         {this.state.loading ? (
//           <LoadingPage />
//         ) : (
//           <Route authenticated={this.state.authenticated} />
//         )}
//       </Provider>
//     );
//   }
// }

// export default App;
