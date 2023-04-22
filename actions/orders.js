import * as api from "../apis";
import { CREATE_ORDER, START_LOADING, END_LOADING } from "../constants/actionTypes";

export const createOrder = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createOrder(formData);
    dispatch({ type: END_LOADING });
    dispatch({ type: CREATE_ORDER, payload: { data } });
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(error);
  }
};
