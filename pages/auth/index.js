import { supabase } from "@/lib/initSupabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { saveSessionToCookies } from "@/utils";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuthStateChange = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        saveSessionToCookies(data.session);
        router.push("/admin/products");
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="w-1/2 m-auto">
      <Auth supabaseClient={supabase} showLinks={false} appearance={{ theme: ThemeSupa }} theme="dark" providers={""} view="sign_in" />
    </div>
  );
};

export default LoginPage;
