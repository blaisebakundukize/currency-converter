import { RECEIVE_BASE_CURRENCIES } from "../actions/baseCurrencies";

const baseCurrencies = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_BASE_CURRENCIES:
      return {
        ...state,
        ...action.baseCurrencies,
      };
    default:
      return state;
  }
};

export default baseCurrencies;
