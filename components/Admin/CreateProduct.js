import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { createProduct, getProducts } from "@/actions/products";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [formData, setformData] = useState({
    name: "",
    description: "",
    price: 0,
    discount_price: 0,
    images: [],
  });

  const onChangeImgPreview = (imageList) => {
    setImagesPreview(imageList);
  };

  const validDateDate = (images = []) => {
    if (formData.price < formData.discount_price && formData.discount_price !== 0) {
      alert("Discount price is less than price");
      return false;
    }
    if (images.length !== 5) {
      alert("Image upload is equal 5");
      return false;
    }
    if (formData.discount_price === 0) {
      setformData({ ...formData, discount_price: formData.price });
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newImageList = imagesPreview.map((image) => image.data_preview_url);
    const dataSubmit = {
      ...formData,
      images: newImageList,
    };
    if (!validDateDate(newImageList)) return;
    dispatch(createProduct(dataSubmit));
    dispatch(getProducts);
    router.push("/admin/products");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label htmlFor="name_product" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name product
          </label>
          <input
            type="text"
            id="name_product"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Product 01"
            required
            onChange={(e) => setformData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="200"
              required
              onChange={(e) => setformData({ ...formData, price: +e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Discount
            </label>
            <input
              type="number"
              id="discount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Default value is price"
              required
              onChange={(e) => setformData({ ...formData, discount_price: +e.target.value })}
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            type="text"
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
            required
            onChange={(e) => setformData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <ImageUploading
            acceptType={["jpg", "jpeg", "png"]}
            multiple
            value={imagesPreview}
            onChange={onChangeImgPreview}
            maxNumber={5}
            dataURLKey="data_preview_url"
          >
            {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
              <div className="upload__image-wrapper">
                <button
                  type="button"
                  onClick={onImageUpload}
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Upload Preview Images
                </button>
                &nbsp;
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <Image src={image["data_preview_url"]} alt="" width="100" height="100" className="my-2" />
                    <div className="image-item__btn-wrapper gap-2 d-flex">
                      <button
                        type="button"
                        onClick={() => onImageUpdate(index)}
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={() => onImageRemove(index)}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
