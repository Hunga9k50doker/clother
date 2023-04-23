import React from "react";
import ListProduct from "@/components/Admin/ListProduct";
import { parseCookies } from "nookies";

const Products = () => {
  return (
    <div>
      <ListProduct />
    </div>
  );
};
export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  if (!cookies?.supabaseSession)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {
    props: {
      cookies,
    },
  };
}
export default Products;
