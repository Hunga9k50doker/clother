import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "@/actions/products";
import { useRouter } from "next/router";
import Image from "next/image";
import { imageDefault } from "@/assets/imgs";
const ProductDetail = () => {
  const { product } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!product) {
      dispatch(getProductById(router.query.productId));
    }
  }, []);

  useEffect(() => {
    if (product) {
      setData(product[0]);
    }
  }, [product]);

  return (
    data && (
      <div className="p-4">
        <div className="m-auto">
          <Image
            onError={(e) => (e.currentTarget.src = imageDefault)}
            className="m-auto"
            src={data.images?.[0]}
            alt={data.name ?? ""}
            width={150}
            height={150}
          />
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Name product</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Price</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.price}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Price sale</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.discount_price}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.description}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              Count
              <input
                type="number"
                min={1}
                step={1}
                defaultValue={1}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              />
              <button className="text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Add to Cart
              </button>
            </div>
          </dl>
        </div>
      </div>
    )
  );
};

export default ProductDetail;
