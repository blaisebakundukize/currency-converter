import { combineReducers } from "redux";
import exchangeRates from "./exchangeRate";
import baseCurrencies from "./baseCurrency";
import login from "./login";
import registeredUser from "./registeredUser";

export default combineReducers({
  exchangeRates,
  baseCurrencies,
  login,
  registeredUser,
});
