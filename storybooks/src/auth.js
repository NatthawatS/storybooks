import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import firebase from 'firebase';

import { clearAuth } from './reducers/user';
import store from './store';

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => {
    return firebase.auth().currentUser ? true : false;
  },
  // authenticatingSelector: state => state.user.isLoading,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export function logout() {
  const { dispatch } = store;
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  dispatch(clearAuth());
}
