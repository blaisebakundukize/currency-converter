import { handleReceiveExchangeRates } from "./exchangeRates";

export default function handleInitialData() {
  return (dispatch) => {
    dispatch(handleReceiveExchangeRates());
  };
}
