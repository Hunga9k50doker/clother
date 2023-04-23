import Cookies from "js-cookie";

export const calculatePercent = (price, discount) => {
  return Math.abs(((discount - price) / price) * 100).toFixed(2);
};

export const saveSessionToCookies = (session) => {
  Cookies.set("supabaseSession", session.access_token);
};

export const removeSessionToCookies = () => {
  Cookies.remove("supabaseSession");
};

export const getSessionFromCookies = () => {
  const accessToken = Cookies.get("supabaseSession");
  if (accessToken) {
    return { access_token: accessToken };
  } else {
    return { access_token: null };
  }
};
