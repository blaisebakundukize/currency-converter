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
