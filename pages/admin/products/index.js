import React from "react";
import ListProduct from "@/components/Admin/ListProduct";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const Products = () => {
  return (
    <div>
      <ListProduct />
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

export default Products;
