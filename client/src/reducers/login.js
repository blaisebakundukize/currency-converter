import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_RESET,
} from "../actions/login";

const initialState = {
  token: null,
  error: null,
  loading: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        error: null,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case LOGIN_RESET:
      return initialState;
    default:
      return state;
  }
};

export default login;
