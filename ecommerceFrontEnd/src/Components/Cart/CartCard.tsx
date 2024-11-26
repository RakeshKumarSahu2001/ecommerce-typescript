
function CartCard({ProductName,ThumbnailImage,Price,CartID,Discount,handleDeleteProductFromCart}) {
    return (
        <div className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    alt={ProductName}
                    src={ThumbnailImage}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <a href={ThumbnailImage}>
                                {ProductName}
                            </a>
                        </h3>
                        <p className="ml-4">
                            ₹ {Math.round(parseInt(Price) * (1 - parseInt(Discount) / 100))}
                        </p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                        <label
                            htmlFor="quantity"
                            className="inline text-sm font-medium leading-6 text-gray-500"
                        >
                            Qty
                        </label>{" "}
                        <select>
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                        </select>
                    </div>

                    <div className="flex">
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => handleDeleteProductFromCart(CartID)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard