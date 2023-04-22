import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { imageDefault } from "@/assets/imgs";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "@/actions/products";
import { GET_PRODUCT_BY_ID } from "@/constants/actionTypes";

const ListProduct = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState([]);

  const onRedirect = (item) => {
    dispatch({ type: GET_PRODUCT_BY_ID, payload: { product: item } });
    router.push(`/product-detail/${item.id}`);
  };

  useEffect(() => {
    dispatch(getProducts);
  }, []);

  useEffect(() => {
    setData(products);
  }, [products]);

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="pt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.length > 0 &&
              data.map((item, key) => (
                <div onClick={() => onRedirect(item)} key={key} className="group relative">
                  <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <Image
                      onError={(e) => (e.currentTarget.src = imageDefault)}
                      src={item.images[0]}
                      style={{ objectFit: "contain" }}
                      alt="Front of men&#039;s Basic Tee in black."
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      width={150}
                      height={200}
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="cursor-pointer absolute inset-0"></span>
                        {item.name}
                      </h3>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 line-through">${item.price}</p>
                      <p className="text-sm font-medium text-gray-900">${item.discount_price}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
