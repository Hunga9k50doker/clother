import ListOrder from "@/components/Admin/ListOrder";
import { parseCookies } from "nookies";

const OrdersPage = () => {
  return (
    <div>
      <ListOrder />
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

export default OrdersPage;
