import { SubmitHandler, useForm } from "react-hook-form"
import { useECommerceStoreDispatch } from "../../Hooks/ecommerceStoreHooks"
import { AddNewProductApi } from "../../EcommerceStore/productsOpt/AddNewProductApi"


type inputDataType = {
  productName: string,
  productDescription: string,
  productRating: string,
  productPrice: string,
  discount: string,
  stock: string,
  brand: string,
  productCategory: string,
  thumbNailImage: FileList,
  images: FileList[]
}

function AddNewProduct() {
  const { reset, register, control, handleSubmit, formState: { errors, isSubmitted } } = useForm<inputDataType>()

  const dispatch = useECommerceStoreDispatch()


  const onSubmit: SubmitHandler<inputDataType> = (data: inputDataType) => {
    dispatch(AddNewProductApi(data))
  }



  return (
    <div className="w-100 grid place-content-center pt-24 pb-7">
      <h3 className="text-center">Add New Product</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 grid-rows-7 gap-2">
        <div className="col-span-2">
          <label htmlFor="productName">Product Name</label><br></br>
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
            className="w-[100%] rounded-md"
          />
          {errors.productName && <p className="text-red-600">{errors.productName.message}</p>}
        </div>
        <div className="">
          <label htmlFor="productRating">Product Rating</label><br></br>
          <input
            {
            ...register("productRating", {
              required: {
                value: true,
                message: "Product Rating is requierd"
              }
            })
            }
            type="text"
            placeholder="Enter the rating"
            className="w-[100%] rounded-md"
          />
          {errors.productRating && <p className="text-red-600">{errors.productRating.message}</p>}
        </div>
        <div className="">
          <label htmlFor="productPrice">Product Price</label><br></br>
          <input
            {
            ...register("productPrice", {
              required: {
                value: true,
                message: "Product Price is requierd"
              }
            })
            }
            type="text"
            placeholder="Enter the price"
            className="w-[100%] rounded-md"
          />
          {errors.productPrice && <p className="text-red-600">{errors.productPrice.message}</p>}
        </div>
        <div className="">
          <label htmlFor="discount">Product Discount</label><br></br>
          <input
            {
            ...register("discount", {
              required: {
                value: true,
                message: "Product Discount is requierd"
              }
            })

            }
            type="text"
            placeholder="Enter the discount"
            className="w-[100%] rounded-md"
          />
          {errors.discount && <p className="text-red-600">{errors.discount.message}</p>}
        </div>
        <div className="">
          <label htmlFor="stock">Product Stock Quantity</label><br></br>
          <input
            {
            ...register("stock", {
              required: {
                value: true,
                message: "Stock Quantity is requierd"
              }
            })
            }
            type="text"
            placeholder="Enter the stockquantity"
            className="w-[100%] rounded-md"
          />
          {errors.stock && <p className="text-red-600">{errors.stock.message}</p>}
        </div>
        <div className="">
          <label htmlFor="brand">Product Brand</label><br></br>
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
            className="w-[100%] rounded-md"
          />
          {errors.brand && <p className="text-red-600">{errors.brand.message}</p>}
        </div>
        <div className="">
          <label htmlFor="productCategory">Product Category</label><br></br>
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
            className="w-[100%] rounded-md"
          />
          {errors.productCategory && <p className="text-red-600">{errors.productCategory.message}</p>}
        </div>
        <div className="">
          <label htmlFor="thumbNailImage">ThumbNailImage</label><br></br>
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
            className="w-[100%] rounded-md"
          />
        </div>

        <div>
          <label htmlFor="images">Image 1</label><br />
          <input
            type="file"
            id="primary-image"
            multiple
            {
            ...register("images",{
              required:true
            })
            }
          />
        </div>

        <div className="col-span-2 row-span-2">
          <label htmlFor="productDescription">Product Description</label><br></br>
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
            className="w-[100%] rounded-md"
          ></textarea>
          {errors.productDescription && <p className="text-red-600">{errors.productDescription.message}</p>}
        </div>

        <button 
        type="submit"
        className="inline-flex items-center justify-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddNewProduct