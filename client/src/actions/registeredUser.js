import axios from "axios";

export const REGISTER_USER_START = "REGISTER_USER_START";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";

export const REGISTER_USER_RESET = "REGISTER_USER_RESET";

export const registerUserStart = () => ({
  type: REGISTER_USER_START,
});

export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  user,
});

export const registerUserFail = (error) => ({
  type: REGISTER_USER_FAIL,
  error,
});

export const registerUserReset = () => ({
  type: REGISTER_USER_RESET,
});

export function registerUser(user) {
  return async (dispatch) => {
    try {
      dispatch(registerUserStart());
      const response = await axios.post("/api/user/create/", user);
      dispatch(registerUserSuccess(response.data));
    } catch (err) {
      const error = err.response.data;
      let errorMessage = null;
      if (error) {
        let errors = [];
        if (error.email) {
          errors = errors.concat(error.email);
        }
        if (error.password) {
          errors = errors.concat(error.password);
        }
        if (error.name) {
          errors = errors.concat(error.name);
        }
        errorMessage = errors.join("&&");
      } else {
        errorMessage = "Something went wrong. Check your internet connection.";
      }
      dispatch(registerUserFail(errorMessage));
    }
  };
}
