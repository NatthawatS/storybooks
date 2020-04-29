import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Layout } from "antd";
import ScrollToTop from "../components/ScrollToTop";
// import { userIsAuthenticated as userIsAuthenticatedRedir } from '../auth';
import Loadable from "../components/Loadable";
import ProtectedRoute from "./ProtectedRoute.js";

const AsyncLogin = Loadable({ loader: () => import("../pages/Login") });
const AsyncForgetPassword = Loadable({
  loader: () => import("../pages/ForgetPassword"),
});
const AsyncRegister = Loadable({
  loader: () => import("../pages/RegisterNow"),
});
const AsyncHome = Loadable({ loader: () => import("../pages/Home") });
const AsyncNoMatch = Loadable({ loader: () => import("../pages/NoMatch") });

// const AsyncManage = Loadable({
//   loader: () => import("pages/manage/userGroup"),
// });

const history = createBrowserHistory();

const Routes = ({ childProps, authenticated }) => {
  const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => null,
      main: () => (
        <ProtectedRoute component={AsyncHome} authenticated={authenticated} />
      ),
    },
    {
      path: "/login",
      exact: true,
      sidebar: () => null,
      main: AsyncLogin,
    },
    {
      path: "/forget",
      exact: true,
      sidebar: () => null,
      main: AsyncForgetPassword,
    },

    {
      path: "/register",
      exact: true,
      sidebar: () => null,
      main: AsyncRegister,
    },
    // {
    //   path: '/manageUser',
    //   exact: true,
    //   sidebar: () => null,
    //   main: () => (
    //     <ProtectedRoute component={AsyncManage} authenticated={authenticated} />
    //   ),
    // },
  ];

  return (
    <Router history={history}>
      <Layout style={{ minHeight: "100vh" }}>
        <ScrollToTop>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}

            <Route
              component={(props) => {
                console.log(props);
                return <AsyncNoMatch {...props} />;
              }}
              props={childProps}
            />
          </Switch>
        </ScrollToTop>
      </Layout>
    </Router>
  );
};

export default connect()(Routes);
