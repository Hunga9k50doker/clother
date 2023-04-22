import { AUTH, LOGOUT, START_LOADING, END_LOADING } from "../constants/actionTypes";

const authReducer = (state = { authData: null, isLoading: true }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case AUTH:
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: action?.data };
    default:
      return state;
  }
};

export default authReducer;
