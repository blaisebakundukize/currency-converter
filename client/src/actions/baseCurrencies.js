import axios from "axios";

export const RECEIVE_BASE_CURRENCIES = "RECEIVE_BASE_CURRENCIES";
export const CREATE_BASE_CURRENCY_SUCCESS = "CREATE_BASE_CURRENCY_SUCCESS";
export const CREATE_BASE_CURRENCY_FAIL = "CREATE_BASE_CURRENCY_FAIL";

export const CREATE_BASE_CURRENCY_START = "CREATE_BASE_CURRENCY_START";

export const receiveBaseCurrencies = (bCurrencies) => {
  const baseCurrencies = {};
  for (let i = 0; i < bCurrencies.length; i++) {
    baseCurrencies[bCurrencies[i].id] = bCurrencies[i];
  }
  return {
    type: RECEIVE_BASE_CURRENCIES,
    baseCurrencies,
  };
};

export const createBaseCurrencyStart = () => ({
  type: CREATE_BASE_CURRENCY_START,
});

export const createBaseCurrencySuccess = (baseCurrency) => ({
  type: CREATE_BASE_CURRENCY_SUCCESS,
  baseCurrency,
});

export const createBaseCurrencyFail = (error) => ({
  type: CREATE_BASE_CURRENCY_FAIL,
  error,
});

export const handleCreateBaseCurrency = (baseCurrency) => {
  return async (dispatch, getState) => {
    try {
      dispatch(createBaseCurrencyStart());
      const { token } = getState().login;
      console.log(baseCurrency);
      const response = await axios.post("/api/currency/base/", baseCurrency, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      console.log("response: ", response);
      dispatch(createBaseCurrencySuccess(response.data));
    } catch (error) {
      let errorMessage = null;
      if (error.response.data) {
        if (error.response.data.base_currency) {
          errorMessage = error.response.data.base_currency.join("&&");
        }
        if (error.response.data.value) {
          errorMessage = error.response.data.value.join("&&");
        }
        if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        }
      } else {
        errorMessage = "Something went wrong. Check your internet connection.";
      }
      dispatch(createBaseCurrencyFail(errorMessage));
    }
  };
};

export const handleReceiveBaseCurrencies = () => {
  return (dispatch) => {
    return axios.get("/api/currency/base").then((response) => {
      dispatch(receiveBaseCurrencies(response.data));
    });
  };
};
