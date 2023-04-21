import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import Account from "../components/Account";
import ListProduct from "@/components/Member/ListProduct";
const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      <ListProduct />
      {/* {!session ? <Auth providers={""} supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" /> : <Account session={session} />} */}
    </div>
  );
};

export default Home;
