import { combineReducers } from "redux";
import exchangeRates from "./exchangeRate";
import baseCurrency from "./baseCurrency";
import login from "./login";
import registeredUser from "./registeredUser";

export default combineReducers({
  exchangeRates,
  baseCurrency,
  login,
  registeredUser,
});
