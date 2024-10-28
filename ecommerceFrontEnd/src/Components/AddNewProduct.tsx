import { useState } from "react"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
// import { useECommerceStoreDispatch } from "../EcommerceStore/ecommerceStoreHooks"
// import { AddNewProductApi } from "../EcommerceStore/AddNewProductApi"

type inputDataType = {
  productName: string,
  productDescription: string,
  productRating: string,
  productPrice: string,
  discount: string,
  stock: string,
  brand: string,
  productCategory: string,
  thumbnailImage: FileList,
  images: FileList[]
}

function AddNewProduct() {
  const { reset, register, control, handleSubmit, formState: { errors, isSubmitted } } = useForm<inputDataType>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images"
  })
  // const dispatch = useECommerceStoreDispatch()

  // const [imageFiles, setImageFiles] = useState<FileList[]>([]);

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setImageFiles((imgs) => [...imgs, e.target.value])
  // }

  // const handleRemoveImage = (index: number) => {
  //   console.log(typeof (index))
  //   setImageFiles((prev) => prev.filter((img, i) => i !== index))
  // }

  const onSubmit: SubmitHandler<inputDataType> = (data: inputDataType) => {
    // dispatch(AddNewProductApi({ productName, productDescription, productRating, productPrice, discount, stock, brand, productCategory }))

    console.log("product information", data)
    // console.log("filelist", imageFiles)
  }



  return (
    <div className="w-100 grid place-content-center">
      <h3 className="text-center">Add New Product</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 grid-rows-6 gap-2">
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
          <label htmlFor="thumbnailImage">ThumbnailImage</label><br></br>
          <input
            {
            ...register("thumbnailImage", {
              required: {
                value: true,
                message: "Thumbnail Image is required"
              }
            })
            }
            type="file"
            multiple
            placeholder="Insert thumbnail"
            className="w-[100%] rounded-md"
          />
        </div>
        {
          /* <div className="">
            <label htmlFor="images">Images</label><br></br>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-[100%] rounded-md" />
            <ul>
              {
                imageFiles.length > 0 && imageFiles.map((imgfile, index) => {
                  return <li key={index} className="flex justify-between items-center">
                    {imgfile}
                    <button
                      onClick={() => handleRemoveImage(index)}>
                      removefile
                    </button>
                  </li>
                })
              }
            </ul>
          </div> */
        }

        <div className="">
          <label htmlFor="images">Images</label><br></br>
          {/* <input
            type="file"
            multiple
            {...register("images", {
              required: {
                value: true,
                message: "Images are required"
              }
            })}
          /> */}
          {errors.images && <p className="text-red-600">{errors.images.message}</p>}
          <ul>
            {
              fields.map((field, index) => {
                return <li key={field.id}>
                  <input
                    type="file"
                    multiple
                    {...register(`images.${index}`)} />
                  {index > 0 && <button
                    type="button"
                    onClick={() => remove(index)}>Delete</button>}
                </li>
              })
            }
          </ul>
          <button
            onClick={() => append({})}
          >
            Add File
          </button>
        </div>

        <div className="col-span-2">
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
            placeholder="Enter the product description"
            className="w-[100%] rounded-md"
          ></textarea>
          {errors.productDescription && <p className="text-red-600">{errors.productDescription.message}</p>}
        </div>

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddNewProduct