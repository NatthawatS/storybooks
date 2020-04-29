

// Actions
const LOGIN = 'mobile-app/auth/LOGIN';
const LOGOUT = 'mobile-app/auth/LOGOUT';
const UPDATE_REFRESH_TOKEN = 'mobile-app/auth/UPDATE_REFRESH_TOKEN';
const UPDATE_PUSH_TOKEN = 'mobile-app/auth/UPDATE_PUSH_TOKEN';
const TEST = 'mobile-app/auth/TEST';

// Action Creators
export function login(token, refreshToken, user) {
  return {
    type: LOGIN,
    payloads: { token, refreshToken, user },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function updateRefreshToken(token, refreshToken) {
  return {
    type: UPDATE_REFRESH_TOKEN,
    payloads: { token, refreshToken },
  };
}

export function updatePushToken(pushToken) {
  return {
    type: UPDATE_PUSH_TOKEN,
    payload: pushToken,
  };
}

export function test(ttt) {
  return {
    type: TEST,
    payloads: ttt,
  };
}

const authToken = localStorage.getItem('authToken');

// Reducer
const initialState = {
  isLoggedIn: false,
  authToken,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payloads.token,
        refreshToken: action.payloads.refreshToken,
        user: action.payloads.user,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        refreshToken: null,
        user: null,
      };
    case TEST:
      return {
        ...state,
        test: action.payloads,
      };
    case UPDATE_REFRESH_TOKEN:
      return {
        ...state,
        token: action.payloads.token,
        refreshToken: action.payloads.refreshToken,
      };
    case UPDATE_PUSH_TOKEN:
      return {
        ...state,
        pushToken: action.payload,
      };

    default:
      return state;
  }
};
