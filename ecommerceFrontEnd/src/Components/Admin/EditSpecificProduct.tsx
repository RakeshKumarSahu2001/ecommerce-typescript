import { SubmitHandler, useForm } from "react-hook-form";
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "../../Hooks/ecommerceStoreHooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchProductDetailsApi } from "../../EcommerceStore/productsOpt/FetchProductDetailsApi";
import { EditSpecificProductApi } from "../../EcommerceStore/productsOpt/EditSpecificProduct";

function EditSpecificProduct() {
    const { register, handleSubmit } = useForm();
    const { id } = useParams()
    const dispatch = useECommerceStoreDispatch();
    const navigate=useNavigate()

    useEffect(() => {
        if (id) {
            dispatch(FetchProductDetailsApi(id))
        }
    }, [dispatch, id])
    const product = useECommerceStoreSelector((state) => state.productDetails.productInfo);

    type productUpdatedData = {
        productName: string,
        productDescription: string,
        productRating: string,
        productPrice: string,
        discount: string,
        stock: string,
        brand: string,
        productCategory: string
    }
    const onSubmit: SubmitHandler<productUpdatedData> = (data: productUpdatedData) => {
        dispatch(EditSpecificProductApi({ id, updatedData: data }))
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
                                <label htmlFor="productName">Product Name</label><br></br>
                                <input
                                    defaultValue={product?.ProductName}
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

                            </div>
                            <div className="">
                                <label htmlFor="productRating">Product Rating</label><br></br>
                                <input
                                    defaultValue={product?.Rating}
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

                            </div>
                            <div className="">
                                <label htmlFor="productPrice">Product Price</label><br></br>
                                <input
                                    defaultValue={product?.Price}
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

                            </div>
                            <div className="">
                                <label htmlFor="discount">Product Discount</label><br></br>
                                <input
                                    defaultValue={product?.Discount}
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

                            </div>
                            <div className="">
                                <label htmlFor="stock">Product Stock Quantity</label><br></br>
                                <input
                                    defaultValue={product?.StockQuantity}
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

                            </div>
                            <div className="">
                                <label htmlFor="brand">Product Brand</label><br></br>
                                <input
                                    defaultValue={product?.Brand}
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

                            </div>
                            <div className="">
                                <label htmlFor="productCategory">Product Category</label><br></br>
                                <input
                                    defaultValue={product?.Category}
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

                            </div>

                            <div className="col-span-2 row-span-2">
                                <label htmlFor="productDescription">Product Description</label><br></br>
                                <textarea
                                    defaultValue={product?.Description}
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