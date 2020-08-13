import {
  RECEIVE_BASE_CURRENCIES,
  CREATE_BASE_CURRENCY_FAIL,
  CREATE_BASE_CURRENCY_SUCCESS,
  CREATE_BASE_CURRENCY_START,
} from "../actions/baseCurrencies";

const initialState = {
  bases: null,
  loadingCreatingBaseCurrency: false,
  errorCreatingBaseCurrency: null,
};

const baseCurrency = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_BASE_CURRENCIES:
      return {
        ...state,
        bases: {
          ...action.baseCurrencies,
        },
      };
    case CREATE_BASE_CURRENCY_START:
      return {
        ...state,
        loadingCreatingBaseCurrency: true,
        errorCreatingBaseCurrency: null,
      };
    case CREATE_BASE_CURRENCY_SUCCESS:
      return {
        ...state,
        bases: {
          ...state.bases,
          [action.baseCurrency.id]: action.baseCurrency,
        },
        loadingCreatingBaseCurrency: false,
      };
    case CREATE_BASE_CURRENCY_FAIL:
      return {
        ...state,
        loadingCreatingBaseCurrency: false,
        errorCreatingBaseCurrency: action.error,
      };
    default:
      return state;
  }
};

export default baseCurrency;
