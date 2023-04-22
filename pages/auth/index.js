import { supabase } from "@/lib/initSupabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const AuthPage = () => {
  return (
    <div className="w-1/2 m-auto">
      <Auth supabaseClient={supabase} showLinks={false} appearance={{ theme: ThemeSupa }} theme="dark" providers={""} view="sign_in" />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session)
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};
export default AuthPage;
