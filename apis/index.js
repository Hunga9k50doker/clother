import { supabase } from "@/lib/initSupabase";

export const fetchProducts = () => supabase.from("products").select();
export const getProductById = (id) => supabase.from("products").select().eq("id", id);
export const createOrder = (formData) => supabase.from("orders").insert(formData);

export const signin = (formData) => supabase.auth.signInWithPassword(formData);
export const signup = (formData) =>
  supabase.auth
    .signUp(formData)
    .then((res) => {
      supabase.from("users").insert({ email: formData.email, role: 0 });
    })
    .catch((err) => {
      console.log(err);
    });
export const logout = () => supabase.auth.signOut();
