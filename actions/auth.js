import { AUTH, START_LOADING, END_LOADING } from "@/constants/actionTypes";
import * as api from "../apis";

export const signOut = async () => {
  await api.logout();
};

export const checkSession = async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.checkSession();
    dispatch({ type: END_LOADING });
    dispatch({ type: AUTH, data });
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(error);
  }
};
