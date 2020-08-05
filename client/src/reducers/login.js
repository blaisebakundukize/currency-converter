import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/login";

const initialState = {
  token: null,
  isAuthenticated: false,
  error: null,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default login;
