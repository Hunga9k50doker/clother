import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "@/actions/products";
import { useRouter } from "next/router";
import Image from "next/image";
import { calculatePercent } from "@/utils";
import Loading from "@/components/Loading";

const ListProduct = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!products.length) dispatch(getProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (products.length) setData(products);
  }, [products]);

  return (
    <div>
      <div className="relative overflow-x-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <table className="min-w-[900px] w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="w-3/5 lg:w-2/5">
                  <button
                    onClick={() => router.push("/admin/products/add")}
                    className="m-4 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add New Product
                  </button>
                </th>
                <th scope="col" className="w-1/5 px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="w-1/5 px-6 py-3">
                  Price
                </th>
                <th scope="col" className="w-1/5 px-6 py-3">
                  Discount
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item, key) => (
                  <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="">
                      <div className="flex gap-2">
                        {item.images.length > 0 &&
                          item.images.map((image, index) => <Image key={index} src={image} alt={""} width={80} height={80} />)}
                      </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.name}
                    </th>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">
                      {item.discount_price} ({calculatePercent(item.price, item.discount_price)}%)
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
