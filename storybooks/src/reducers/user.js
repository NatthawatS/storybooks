import decode from 'jwt-decode';

// Actions
const USER_LOGGED_IN = 'ebs/user/USER_LOGGED_IN';
const CLEAR_AUTH = 'ebs/user/CLEAR_AUTH';

const checkAuth = token => {
  if (!token) {
    return null;
  }

  try {
    const { exp, userId, corporateName } = decode(token);

    if (exp < new Date().getTime() / 1000) {
      return null;
    }

    return { userId, corporateName };
  } catch (e) {
    return null;
  }
};

const token = localStorage.getItem('authToken');
const temp = checkAuth(token);
const initialState = {
  authToken: token,
  userId: temp && temp.userId,
  corporateName: temp && temp.corporateName,
  isLoggedIn: token ? true : false,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN: {
      const { userId, corporateName } = checkAuth(action.payloads.token);

      return {
        authToken: action.payloads.authToken,
        userId,
        corporateName,
      };
    }
    case CLEAR_AUTH:
      return {
        authToken: null,
        userId: null,
        corporateName: null,
      };
    default:
      return state;
  }
}

// Action Creators
export function clearAuth() {
  return { type: CLEAR_AUTH };
}

export function login(authToken) {
  return {
    type: USER_LOGGED_IN,
    payloads: { authToken },
  };
}
