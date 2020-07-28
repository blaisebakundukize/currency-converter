import { handleReceiveExchangeRates } from "./exchangeRates";
// import { handleReceiveBaseCurrencies } from "./baseCurrencies";

export default function handleInitialData() {
  return (dispatch) => {
    dispatch(handleReceiveExchangeRates());
    // dispatch(handleReceiveBaseCurrencies());
  };
}
