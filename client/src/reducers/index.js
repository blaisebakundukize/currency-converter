import { combineReducers } from "redux";
import exchangeRates from "./exchangeRate";
import baseCurrencies from "./baseCurrency";
import login from "./login";

export default combineReducers({
  exchangeRates,
  baseCurrencies,
  login,
});
