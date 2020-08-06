import {
  RECEIVE_EXCHANGE_RATES,
  ADD_EXCHANGE_RATE_START,
  ADD_EXCHANGE_RATE_SUCCESS,
  ADD_EXCHANGE_RATE_FAIL,
  ADD_EXCHANGE_RATE_REMOVE_SUCCESS,
} from "../actions/exchangeRates";

const initialState = {
  rates: null,
  errorAddExchangeRate: null,
  loadingAddExchangeRate: false,
  showSuccessMessage: false,
};

const exchangeRates = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_EXCHANGE_RATES:
      return {
        ...state,
        rates: {
          ...action.exchangeRates,
        },
      };
    case ADD_EXCHANGE_RATE_START:
      return {
        ...state,
        errorAddExchangeRate: null,
        loadingAddExchangeRate: true,
      };
    case ADD_EXCHANGE_RATE_SUCCESS:
      return {
        ...state,
        rates: {
          ...state.rates,
          ...action.exchangeRate,
        },
        errorAddExchangeRate: null,
        loadingAddExchangeRate: false,
        showSuccessMessage: true,
      };
    case ADD_EXCHANGE_RATE_FAIL:
      return {
        ...state,
        errorAddExchangeRate: action.error,
        loadingAddExchangeRate: false,
        showSuccessMessage: false,
      };
    case ADD_EXCHANGE_RATE_REMOVE_SUCCESS:
      return {
        ...state,
        showSuccessMessage: false,
      };
    default:
      return state;
  }
};

export default exchangeRates;
