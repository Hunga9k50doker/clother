import { supabase } from "@/lib/initSupabase";

export const fetchProducts = () => supabase.from("products").select();
export const getProductById = (id) => supabase.from("products").select().eq("id", id);
export const createProduct = (formData) => supabase.from("products").insert(formData);

export const fetchOrders = () => supabase.from("orders").select();
export const createOrder = (formData) => supabase.from("orders").insert(formData);

export const checkSession = () => supabase.auth.getSession();
export const logout = () => supabase.auth.signOut();
