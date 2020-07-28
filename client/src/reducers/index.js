import { combineReducers } from "redux";
import exchangeRates from "./exchangeRate";
import baseCurrencies from "./baseCurrency";

export default combineReducers({
  exchangeRates,
  baseCurrencies,
});
