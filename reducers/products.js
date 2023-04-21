/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { CREATE_PRODUCT, GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, END_LOADING, START_LOADING } from "../constants/actionTypes";

export default (state = { isLoading: true, products: [], product: null }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case GET_ALL_PRODUCTS:
      return { ...state, products: action.payload.data };
    case GET_PRODUCT_BY_ID:
      return { ...state, product: action.payload.product };
    case CREATE_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    default:
      return state;
  }
};
