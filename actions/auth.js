import * as api from "../apis";

export const signOut = async () => {
  await api.logout();
};

export const signUp = (formData) => async (dispatch) => {
  const { data, error } = await api.signup(formData);
  console.log(data);
};

export const signIn = (formData) => async (dispatch) => {
  const { data, error } = await api.signin(formData);
  console.log(data);
  if (data.user) {
    callback.push("/");
    return data;
  }
  if (error) {
    alert("Invalid email or password");
  }
};
