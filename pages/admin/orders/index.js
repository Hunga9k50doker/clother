import React from "react";
import ListOrder from "@/components/Admin/ListOrder";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const OrdersPage = () => {
  return (
    <div>
      <ListOrder />
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

export default OrdersPage;
