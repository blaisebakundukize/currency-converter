import axios from "axios";

export const RECEIVE_BASE_CURRENCIES = "RECEIVE_BASE_CURRENCIES";

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

export const handleReceiveBaseCurrencies = () => {
  return (dispatch) => {
    dispatch(
      receiveBaseCurrencies([
        {
          id: 1,
          base_currency: "usd",
          value: "1",
        },
      ])
    );
    // return axios.get("/api/currency/base").then((response) => {
    //   dispatch(receiveBaseCurrencies(response.data));
    // });
  };
};
