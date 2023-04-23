import React from "react";
import { useRouter } from "next/router";
import CreateProduct from "@/components/Admin/CreateProduct";
import { parseCookies } from "nookies";

const ActionProductPage = (props) => {
  const router = useRouter();
  const { action } = router.query;
  return <div className="p-4">{action === "add" ? <CreateProduct /> : ""}</div>;
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
export default ActionProductPage;
