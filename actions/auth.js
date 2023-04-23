import * as api from "../apis";
import { removeSessionToCookies } from "@/utils";

export const signOut = async () => {
  await api.logout();
  removeSessionToCookies();
  window.location.reload("/");
};
