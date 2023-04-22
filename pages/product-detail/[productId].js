import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "@/actions/products";
import { createOrder } from "@/actions/orders";
import { useRouter } from "next/router";
import Image from "next/image";
import { imageDefault } from "@/assets/imgs";
import ModalInfoCustomer from "@/components/Modal";
import ImageViewer from "react-simple-image-viewer";

const ProductDetail = () => {
  const { product } = useSelector((state) => state.products);
  const amountRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [formInfoCustomer, setformInfoCustomer] = useState({
    username: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const onChange = (e) => {
    setformInfoCustomer({ ...formInfoCustomer, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const dataSubmit = {
      ...formInfoCustomer,
      name_product: data.name,
      id_product: data.id,
      amount: +amountRef.current.value,
      total: +(data.price * amountRef.current.value).toFixed(3),
    };
    dispatch(createOrder(dataSubmit));
    setIsOpen(false);
  };

  useEffect(() => {
    if (!product && router.isReady) {
      dispatch(getProductById(router.query.productId));
    }
  }, [router]);

  useEffect(() => {
    if (product) {
      setData(product[0]);
    }
  }, [product]);

  return (
    data && (
      <div className="p-4 bg-[white] h-screen">
        <div className="m-auto">
          {data?.images?.length > 0 && (
            <div className="flex flex-col items-center justify-center mb-4">
              <Image
                className="cursor-pointer"
                onError={(e) => (e.currentTarget.src = imageDefault)}
                src={data.images[0]}
                onClick={() => openImageViewer(0)}
                width={150}
                height={150}
                style={{ margin: "2px" }}
                alt=""
              />
              <div className="flex items-center justify-center">
                {data.images.map(
                  (src, index) =>
                    index > 0 && (
                      <Image
                        className="cursor-pointer"
                        onError={(e) => (e.currentTarget.src = imageDefault)}
                        src={src}
                        onClick={() => openImageViewer(index)}
                        width={50}
                        height={50}
                        key={index}
                        style={{ margin: "2px" }}
                        alt=""
                      />
                    )
                )}
              </div>
            </div>
          )}

          {isViewerOpen && (
            <ImageViewer src={data.images} currentIndex={currentImage} disableScroll={false} closeOnClickOutside={true} onClose={closeImageViewer} />
          )}
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
                ref={amountRef}
                type="number"
                min={1}
                step={1}
                defaultValue={1}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              />
              <button
                onClick={() => setIsOpen(true)}
                className="text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add to Cart
              </button>
            </div>
          </dl>
        </div>
        <ModalInfoCustomer isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onSubmit} onChange={onChange} />
      </div>
    )
  );
};

export default ProductDetail;
