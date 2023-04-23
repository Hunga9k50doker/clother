import { supabase } from "@/lib/initSupabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { saveSessionToCookies } from "@/utils";

const AuthPage = () => {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        const { data } = await supabase.auth.getSession();
        if (data) {
          saveSessionToCookies(data.session);
        }
        router.push("/admin/products");
      }
    });
  }, []);

  return (
    <div className="w-1/2 m-auto">
      <Auth supabaseClient={supabase} showLinks={false} appearance={{ theme: ThemeSupa }} theme="dark" providers={""} view="sign_in" />
    </div>
  );
};

export default AuthPage;
