import { supabase } from "@/lib/initSupabase";

export async function signOut() {
  const { errors } = await supabase.auth.signOut();
}

export async function signUp(email, password, callback) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (data) {
    console.log(data);
    await supabase.from("users").insert({ email: email, role: 0 });
  }
}

export async function signIn(email, password, callback) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  console.log(data);
  if (data.user) {
    callback.push("/");
    return data;
  }
  if (error) {
    alert("Invalid email or password");
  }
}
