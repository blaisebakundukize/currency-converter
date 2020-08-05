import {
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_RESET,
} from "../actions/registeredUser";

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const registeredUser = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: null,
        loading: false,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case REGISTER_USER_RESET:
      return initialState;
    default:
      return state;
  }
};

export default registeredUser;
