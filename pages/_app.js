import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/ui";

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [user, setUser] = useState(Auth.useUser());
  // const { user } = Auth.useUser();
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async () => checkUser());
    checkUser();
    return () => {
      // data?.unsubscribe();
    };
  }, []);
  async function checkUser() {
    console.log(user);
    // setUser(user);
  }

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
export default MyApp;
