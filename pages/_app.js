import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/ui";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducers from "../reducers";
import ComonLayout from "@/Layout/ComonLayout";
function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  // const [user, setUser] = useState(Auth.useUser());
  // // const { user } = Auth.useUser();
  // useEffect(() => {
  //   const { data } = supabase.auth.onAuthStateChange(async () => checkUser());
  //   checkUser();
  //   return () => {
  //     // data?.unsubscribe();
  //   };
  // }, []);
  // async function checkUser() {
  //   console.log(user);
  //   // setUser(user);
  // }

  const store = configureStore({
    reducer: reducers,
  });

  return (
    <Provider store={store}>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <ComonLayout>
          <Component {...pageProps} />
        </ComonLayout>
      </SessionContextProvider>
    </Provider>
  );
}
export default MyApp;
