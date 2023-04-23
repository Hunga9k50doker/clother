import * as api from "../apis";
import { removeSessionToCookies } from "@/utils";

export const signOut = async () => {
  await api.logout();
  removeSessionToCookies();
  window.location.reload("/");
};

export const checkSession = async () => {
  try {
    const { data } = await api.checkSession();
    return data;
  } catch (error) {
    console.log(error);
  }
};
