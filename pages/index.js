import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import Account from "../components/Account";
import ListProduct from "@/components/Member/ListProduct";
import Navbar from "@/components/Navbar";
const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="">
      <Navbar />
      <ListProduct />
    </div>
  );
};

export default Home;
