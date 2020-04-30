import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Layout } from "antd";
import ScrollToTop from "../components/ScrollToTop";
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
const AsyncAddNewBook = Loadable({
  loader: () => import("../pages/AddNewBook"),
});
const AsyncBorrowBooks = Loadable({
  loader: () => import("../pages/BorrowBooks"),
});

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
    {
      path: "/addNewBook",
      exact: true,
      sidebar: () => null,
      main: () => (
        <ProtectedRoute
          component={AsyncAddNewBook}
          authenticated={authenticated}
        />
      ),
    },
    {
      path: "/borrowBooks",
      exact: true,
      sidebar: () => null,
      main: () => (
        <ProtectedRoute
          component={AsyncBorrowBooks}
          authenticated={authenticated}
        />
      ),
    },
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
