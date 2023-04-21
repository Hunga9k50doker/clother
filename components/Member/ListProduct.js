import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/initSupabase";
import { imageDefault } from "@/assets/imgs";
const ListProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("products").select();
      setData(data);
    };
    getData();
  }, []);
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.length > 0 &&
              data.map((item, key) => (
                <Link href={`/product-detail/${item.id}`} key={key} className="group relative">
                  <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <Image
                      onError={(e) => (e.currentTarget.src = imageDefault)}
                      src={
                        item.images[0]
                        // "https://pyxis.nymag.com/v1/imgs/c4e/674/1892c1d09ba24378b0d547eeaffa7fac93-EN-US-Worn-S1-Main-Vertical-27x40-RGB-PR.rvertical.w600.jpg"
                      }
                      style={{ objectFit: "contain" }}
                      alt="Front of men&#039;s Basic Tee in black."
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href="#">
                          <span aria-hidden="true" className="absolute inset-0"></span>
                          {item.name}
                        </a>
                      </h3>
                      {/* <p className="mt-1 text-sm text-gray-500">{item.des}</p> */}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 line-through">${item.price}</p>
                      <p className="text-sm font-medium text-gray-900">${item.discount_price}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
