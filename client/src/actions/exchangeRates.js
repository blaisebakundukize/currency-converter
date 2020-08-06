import axios from "axios";

export const RECEIVE_EXCHANGE_RATES = "RECEIVE_EXCHANGE_RATES";
export const ADD_EXCHANGE_RATE_START = "ADD_EXCHANGE_RATE_START";
export const ADD_EXCHANGE_RATE_SUCCESS = "ADD_EXCHANGE_RATE_SUCCESS";
export const ADD_EXCHANGE_RATE_FAIL = "ADD_EXCHANGE_RATE_FAIL";
export const ADD_EXCHANGE_RATE_REMOVE_SUCCESS =
  "ADD_EXCHANGE_RATE_REMOVE_SUCCESS";

export const receiveExchangeRates = (exRates) => {
  const exchangeRates = {};
  for (let i = 0; i < exRates.length; i++) {
    exchangeRates[exRates[i].id] = exRates[i];
  }
  return {
    type: RECEIVE_EXCHANGE_RATES,
    exchangeRates,
  };
};

export const addExchangeRateStart = () => ({
  type: ADD_EXCHANGE_RATE_START,
});

export const addExchangeRateSuccess = (rate) => {
  const exchangeRate = {};
  exchangeRate[rate.id] = rate;
  return {
    type: ADD_EXCHANGE_RATE_SUCCESS,
    exchangeRate,
  };
};

export const addExchangeRateRemoveSuccess = () => ({
  type: ADD_EXCHANGE_RATE_REMOVE_SUCCESS,
});

export const addExchangeRateFail = (error) => ({
  type: ADD_EXCHANGE_RATE_FAIL,
  error,
});

export const addExchangeRate = (exchangeRates) => {
  return async (dispatch, getState) => {
    try {
      dispatch(addExchangeRateStart());
      const { token } = getState().login;
      const response = await axios.post(
        "/api/currency/exchange_rates/",
        exchangeRates,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      dispatch(addExchangeRateSuccess(response.data));
    } catch (error) {
      let errorMessage = null;
      if (error.response.data) {
        if (error.response.data.value) {
          errorMessage = error.response.data.value.join("&&");
        }
        if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        }
      } else {
        errorMessage = "Something went wrong. Check your internet connection.";
      }
      dispatch(addExchangeRateFail(errorMessage));
    }
  };
};

export const handleReceiveExchangeRates = () => {
  return (dispatch) => {
    // dispatch(
    //   receiveExchangeRates([
    //     {
    //       id: 1,
    //       currency: "rwf",
    //       base_currency: 1,
    //       value: "1000.00",
    //     },
    //     {
    //       id: 2,
    //       currency: "ugsh",
    //       base_currency: 1,
    //       value: "4000.00",
    //     },
    //     {
    //       id: 3,
    //       currency: "usd",
    //       base_currency: 1,
    //       value: "1.00",
    //     },
    //   ])
    // );
    return axios.get("/api/currency/exchange_rates").then((response) => {
      dispatch(receiveExchangeRates(response.data));
    });
  };
};
