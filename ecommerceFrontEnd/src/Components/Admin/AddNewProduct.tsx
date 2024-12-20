import { SubmitHandler, useForm } from "react-hook-form"
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "../../Hooks/ecommerceStoreHooks"
import { AddNewProductApi, createNewAddProductSlice } from "../../EcommerceStore/productsOpt/AddNewProductApi"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


type inputDataType = {
  productName: string,
  productDescription: string,
  productRating: number,
  productPrice: number,
  discount: number,
  stock: number,
  brand: string,
  productCategory: string,
  thumbNailImage: FileList,
  images: FileList
}

function AddNewProduct() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<inputDataType>()
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const isProductAdded = useECommerceStoreSelector((state) => state.addNewProductsInTheWeb.isProductAdded);
  const errorInAddProduct = useECommerceStoreSelector((state) => state.addNewProductsInTheWeb.errorInAddProduct);

  const dispatch = useECommerceStoreDispatch()
  const navigate = useNavigate();

  const watchThumbnail = watch("thumbNailImage");
  const watchImages = watch("images");

  const onSubmit: SubmitHandler<inputDataType> = async (data: inputDataType) => {
    setIsLoading(true);
    const parsedData = {
      ...data,
      productRating: parseFloat(data.productRating as unknown as string),
      productPrice: parseFloat(data.productPrice as unknown as string),
      discount: parseFloat(data.discount as unknown as string),
      stock: parseInt(data.stock as unknown as string, 10),
    };
    await dispatch(AddNewProductApi(parsedData))
    setIsLoading(false)
  }

  useEffect(() => {
    if (isProductAdded) {
      navigate("/shopnow/allproduct");
      dispatch(createNewAddProductSlice.actions.setProductParameterToInitialState())
    }
  }, [isProductAdded, navigate])

  useEffect(() => {
    if (errorInAddProduct) {
      // navigate("")
    }
  }, [errorInAddProduct, navigate])

  useEffect(() => {
    const imageUrls: string[] = [];
    if (watchThumbnail && watchThumbnail.length > 0) {
      const file = watchThumbnail[0];
      imageUrls.push(URL.createObjectURL(file));
    }

    if (watchImages && watchImages.length > 0) {
      const fileArray = Array.from(watchImages).map((file) => URL.createObjectURL(file));
      imageUrls.push(...fileArray);
    }

    setImages(imageUrls);

    return () => {
      imageUrls.forEach((img) => URL.revokeObjectURL(img))
    }

  }, [watchThumbnail, watchImages])

  return (
    <div className="w-100 flex justify-between items-start pt-24 pb-7 rounded-md shadow-[6px_10px_8px_12px_rgba(0,_0,_0,_0.1)] px-10 py-5">
      <div className="!w-[50%] !h-[100%] grid place-content-center gap-2 grid-cols-2 grid-rows-1">
        {
          images.map((image, i) => (
            <div className="avatar" key={i}>
              <div className="w-64 rounded">
                <img src={image} />
              </div>
            </div>
          ))
        }
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 grid-rows-8 gap-2">
        <h3 className="text-center col-span-2 flex justify-center items-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add New Product</h3>
        <div className="col-span-2">
          <label htmlFor="productName">Product Name</label><br />
          <input
            {
            ...register("productName",
              {
                required: {
                  value: true,
                  message: "Product Name is required"
                }
              })
            }
            type="text"
            placeholder="Enter the product name"
            className="w-[100%] file-input file-input-bordered file-input-primary"
          />
          {errors.productName && <p className="text-red-600">{errors.productName.message}</p>}
        </div>
        <div className="">
          <label htmlFor="productRating">Product Rating</label><br />
          <input
            {
            ...register("productRating", {
              required: {
                value: true,
                message: "Product Rating is requierd"
              }
            })
            }
            step="any"
            type="number"
            placeholder="Enter the rating"
            className="w-[100%] file-input file-input-bordered file-input-primary"
          />
          {errors.productRating && <p className="text-red-600">{errors.productRating.message}</p>}
        </div>
        <div className="">
          <label htmlFor="productPrice">Product Price</label><br />
          <input
            {
            ...register("productPrice", {
              required: {
                value: true,
                message: "Product Price is requierd"
              }
            })
            }
            type="number"
            placeholder="Enter the price"
            className="w-[100%] file-input file-input-bordered file-input-primary"
          />
          {errors.productPrice && <p className="text-red-600">{errors.productPrice.message}</p>}
        </div>
        <div className="">
          <label htmlFor="discount">Product Discount</label><br />
          <input
            {
            ...register("discount", {
              required: {
                value: true,
                message: "Product Discount is requierd"
              }
            })
            }
            step="any"
            type="number"
            placeholder="Enter the discount"
            className="w-[100%] file-input file-input-bordered file-input-primary"
          />
          {errors.discount && <p className="text-red-600">{errors.discount.message}</p>}
        </div>
        <div className="">
          <label htmlFor="stock">Product Stock Quantity</label><br />
          <input
            {
            ...register("stock", {
              required: {
                value: true,
                message: "Stock Quantity is requierd"
              }
            })
            }
            type="number"
            placeholder="Enter the stockquantity"
            className="w-[100%] file-input file-input-bordered file-input-primary"
          />
          {errors.stock && <p className="text-red-600">{errors.stock.message}</p>}
        </div>
        <div className="">
          <label htmlFor="brand">Product Brand</label><br />
          <input
            {
            ...register("brand", {
              required: {
                value: true,
                message: "Brand is requierd"
              }
            })
            }
            type="text"
            placeholder="Enter the product brand"
            className="w-[100%] file-input file-input-bordered file-input-primary"
          />
          {errors.brand && <p className="text-red-600">{errors.brand.message}</p>}
        </div>
        <div className="">
          <label htmlFor="productCategory">Product Category</label><br />
          <input
            {
            ...register("productCategory", {
              required: {
                value: true,
                message: "Category is requierd"
              }
            })
            }
            type="text"
            placeholder="Enter the product category"
            className="w-[100%] file-input file-input-bordered file-input-primary"
          />
          {errors.productCategory && <p className="text-red-600">{errors.productCategory.message}</p>}
        </div>
        <div className="">
          <label htmlFor="thumbNailImage">ThumbNailImage</label><br />
          <input
            {
            ...register("thumbNailImage", {
              required: {
                value: true,
                message: "Thumbnail Image is required"
              }
            })
            }
            type="file"
            placeholder="Insert thumbnail"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
        </div>

        <div>
          <label htmlFor="images">Image 1</label><br />
          <input
            type="file"
            id="primary-image"
            multiple
            {
            ...register("images", {
              required: true
            })
            }
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
        </div>

        <div className="col-span-2 row-span-2">
          <label htmlFor="productDescription">Product Description</label><br />
          <textarea
            {
            ...register("productDescription", {
              required: {
                value: true,
                message: "Product Description is required"
              }
            })
            }
            rows={4}
            placeholder="Enter the product description"
            className="w-[100%] textarea textarea-primary"
          ></textarea>
          {errors.productDescription && <p className="text-red-600">{errors.productDescription.message}</p>}
        </div>

        <button
          type="submit"
          className="inline-flex col-span-2 items-center justify-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700">
          {isLoading ? <span className="loading loading-infinity loading-lg"></span> : "Submit"}
        </button>
      </form>
    </div>
  )
}

export default AddNewProduct