import { SubmitHandler, useForm } from "react-hook-form";
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "../../Hooks/ecommerceStoreHooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchProductDetailsApi } from "../../EcommerceStore/productsOpt/FetchProductDetailsApi";
import { EditSpecificProductApi } from "../../EcommerceStore/productsOpt/EditSpecificProduct";
import { updatedProductInfoType } from "../../utils/types";

function EditSpecificProduct() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id } = useParams<{ id: string }>()
    const dispatch = useECommerceStoreDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            dispatch(FetchProductDetailsApi(id))
        }
    }, [dispatch, id])
    const product = useECommerceStoreSelector((state) => state.productDetails.productInfo);

    const onSubmit: SubmitHandler<updatedProductInfoType> = async (data: updatedProductInfoType) => {
        console.log("data", data)
        await dispatch(EditSpecificProductApi({ id, updatedData: data }))
        navigate(`/shopnow/productDetail/${id}`)
    }


    return (
        <div className="bg-white pb-8">
            <div className="pt-20">
                <nav aria-label="Breadcrumb" className='py-[10px]'>
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 lg:max-w-7xl">
                        <li className="text-sm font-medium text-gray-500 hover:text-gray-600">
                            {
                                product?.ProductName
                            }
                        </li>
                    </ol>
                </nav>

                {/* Image gallery  */}
                <div className="mx-auto lg:grid lg:max-w-7xl grid-cols-[400px_minmax(850px,_1fr)] lg:gap-x-6">
                    <div className='flex flex-col gap-3'>

                        <div className="sticky rounded-lg flex flex-row justify-center gap-2">
                            <div>
                                <img
                                    alt={product?.ProductName}
                                    src={product?.ThumbnailImage}
                                    className="object-center aspect-square" />
                            </div>
                        </div>
                    </div>

                    <div className="px-4 pt-10 lg:pt-0 ">
                        <form
                            className="grid grid-cols-2 grid-rows-7 gap-2"
                            onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-span-2">
                                <label htmlFor="ProductName">Product Name</label><br></br>
                                <input
                                    defaultValue={product?.ProductName}
                                    {
                                    ...register("ProductName",
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
                                {errors?.ProductName && <p>{String(errors?.ProductName.message)}</p>}
                            </div>
                            <div className="">
                                <label htmlFor="Rating">Product Rating</label><br></br>
                                <input
                                    defaultValue={product?.Rating}
                                    {
                                    ...register("Rating", {
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
                                {errors?.Rating && <p>{String(errors?.Rating.message)}</p>}
                            </div>
                            <div className="">
                                <label htmlFor="Price">Product Price</label><br></br>
                                <input
                                    defaultValue={product?.Price}
                                    {
                                    ...register("Price", {
                                        required: {
                                            value: true,
                                            message: "Product Price is requierd"
                                        }
                                    })
                                    }
                                    step="any"
                                    type="number"
                                    placeholder="Enter the price"
                                    className="w-[100%] file-input file-input-bordered file-input-primary"
                                />
                                {errors?.Price && <p>{String(errors?.Price.message)}</p>}

                            </div>
                            <div className="">
                                <label htmlFor="discount">Product Discount</label><br></br>
                                <input
                                    defaultValue={product?.Discount}
                                    {
                                    ...register("Discount", {
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
                                {errors?.Discount && <p>{String(errors?.Discount.message)}</p>}
                            </div>
                            <div className="">
                                <label htmlFor="StockQuantity">Product Stock Quantity</label><br></br>
                                <input
                                    defaultValue={product?.StockQuantity}
                                    {
                                    ...register("StockQuantity", {
                                        required: {
                                            value: true,
                                            message: "Stock Quantity is requierd"
                                        }
                                    })
                                    }
                                    step="any"
                                    type="number"
                                    placeholder="Enter the stockquantity"
                                    className="w-[100%] file-input file-input-bordered file-input-primary"
                                />
                                {errors?.StockQuantity && <p>{String(errors?.StockQuantity.message)}</p>}
                            </div>
                            <div className="">
                                <label htmlFor="Brand">Product Brand</label><br></br>
                                <input
                                    defaultValue={product?.Brand}
                                    {
                                    ...register("Brand", {
                                        required: {
                                            value: true,
                                            message: "Brand is requierd"
                                        }
                                    })
                                    }
                                    type="text"
                                    placeholder="Enter the product Brand"
                                    className="w-[100%] file-input file-input-bordered file-input-primary"
                                />
                                {errors?.Brand && <p>{String(errors?.Brand.message)}</p>}
                            </div>
                            <div className="">
                                <label htmlFor="Category">Product Category</label><br></br>
                                <input
                                    defaultValue={product?.Category}
                                    {
                                    ...register("Category", {
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
                                {errors?.Category && <p>{String(errors?.Category.message)}</p>}

                            </div>

                            <div className="col-span-2 row-span-2">
                                <label htmlFor="Description">Product Description</label><br></br>
                                <textarea
                                    defaultValue={product?.Description}
                                    {
                                    ...register("Description", {
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
                                {errors?.Description && <p>{String(errors?.Description.message)}</p>}

                            </div>

                            <button
                                type="submit"
                                className="col-span-2 px-5 py-2 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700">
                                Submit
                            </button>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditSpecificProduct