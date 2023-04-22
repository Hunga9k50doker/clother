import React, { useState, useEffect } from "react";
import { imageDefault } from "@/assets/imgs";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "@/actions/orders";
import { useRouter } from "next/router";
import Image from "next/image";
import { calculatePercent } from "@/utils";

const ListOrder = () => {
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!orders.length) dispatch(getOrders);
  }, []);

  useEffect(() => {
    if (orders.length) setData(orders);
  }, [orders]);

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Name Product
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Total ($)
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, key) => (
                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{item.id}</td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.username}
                  </th>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.phone_number}</td>
                  <td className="px-6 py-4">{item.address}</td>
                  <td className="px-6 py-4">{item.name_product}</td>
                  <td className="px-6 py-4">{item.amount}</td>
                  <td className="px-6 py-4">{item.total}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOrder;
