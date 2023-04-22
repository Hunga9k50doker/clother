import React from "react";
import { useRouter } from "next/router";
import CreateProduct from "@/components/Admin/CreateProduct";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const ActionProductPage = () => {
  const router = useRouter();
  const { action } = router.query;
  return <div className="p-4">{action === "add" ? <CreateProduct /> : ""}</div>;
};

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

export default ActionProductPage;
