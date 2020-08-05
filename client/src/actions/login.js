import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  token,
});

export const loginFail = (error) => ({
  type: LOGIN_FAIL,
  error,
});

export function login(email, password) {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/user/token/", {
        email,
        password,
      });
      dispatch(loginSuccess(response.data.token));
    } catch (error) {
      let errorMessage = null;
      if (error.response.data) {
        errorMessage = error.response.data.non_field_errors.join("&&");
        console.log(errorMessage);
      } else {
        errorMessage = "Something went wrong. Check your internet connection.";
      }
      dispatch(loginFail(errorMessage));
    }
  };
}