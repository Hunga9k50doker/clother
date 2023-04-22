import { combineReducers } from "redux";
import products from "./products";
import orders from "./orders";
import authReducer from "./auth";

export default combineReducers({
  products,
  orders,
  authReducer,
});
