import * as api from "../apis";
import { CREATE_ORDER, GET_ALL_ORDERS, START_LOADING, END_LOADING } from "../constants/actionTypes";

export const createOrder = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createOrder(formData);
    dispatch({ type: CREATE_ORDER, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(error);
  }
};

export const getOrders = async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchOrders();
    dispatch({ type: GET_ALL_ORDERS, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(error);
  }
};
