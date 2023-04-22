/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { CREATE_ORDER, GET_ALL_ORDERS, END_LOADING, START_LOADING } from "../constants/actionTypes";

export default (state = { isLoading: true, orders: [], order: null }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case GET_ALL_ORDERS:
      return { ...state, orders: action.payload.data };
    case CREATE_ORDER:
      return { ...state, orders: [...state.orders, action.payload] };
    default:
      return state;
  }
};
