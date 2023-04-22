import React from "react";
import { useRouter } from "next/router";
import CreateProduct from "@/components/Admin/CreateProduct";

const ActionProductPage = () => {
  const router = useRouter();
  const { action } = router.query;
  return <div className="p-4">{action === "add" ? <CreateProduct /> : ""}</div>;
};

export default ActionProductPage;
