import axios from "axios";

export const RECEIVE_EXCHANGE_RATES = "RECEIVE_EXCHANGE_RATES";

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

export const handleReceiveExchangeRates = () => {
  return (dispatch) => {
    return axios.get("/api/currency/exchange_rates").then((response) => {
      dispatch(receiveExchangeRates(response.data));
    });
  };
};
