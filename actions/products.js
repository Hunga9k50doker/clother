import * as api from "../apis";
import { CREATE_PRODUCT, GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, START_LOADING, END_LOADING } from "../constants/actionTypes";

export const getProducts = async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchProducts();
    dispatch({ type: END_LOADING });
    dispatch({ type: GET_ALL_PRODUCTS, payload: { data } });
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(error);
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.getProductById(id);
    dispatch({ type: GET_PRODUCT_BY_ID, payload: { product: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
  }
};

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createProduct(formData);
    dispatch({ type: END_LOADING });
    dispatch({ type: CREATE_PRODUCT, payload: { data } });
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(error);
  }
};
