import { RECEIVE_EXCHANGE_RATES } from "../actions/exchangeRates";

const exchangeRates = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_EXCHANGE_RATES:
      return {
        ...state,
        ...action.exchangeRates,
      };
    default:
      return state;
  }
};

export default exchangeRates;
