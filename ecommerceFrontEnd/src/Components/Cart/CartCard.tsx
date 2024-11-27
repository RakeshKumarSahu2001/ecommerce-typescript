type propsType = {
    ProductName: string,
    ThumbnailImage: string,
    Price: number,
    CartID: string,
    Discount: string,
    Quantity: number,
    handleDeleteProductFromCart: (CartID: string) => void,
    handleIncQuantity:(CartID: string)=>void,
    handleDecQuantity:(CartID: string)=>void
}
function CartCard({ ProductName, ThumbnailImage, Price, CartID, Discount, Quantity, handleDeleteProductFromCart,handleDecQuantity,handleIncQuantity }: propsType) {

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
                            ₹ {Math.round(Price * (1 - parseInt(Discount) / 100))}
                        </p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500 flex flex-row items-center">
                        <label
                            htmlFor="quantity"
                            className="inline text-sm font-medium leading-6 pr-5 text-gray-500"
                        >
                            Qty
                        </label>{" "}
                        <div className=" flex flex-row items-center justify-center">
                            <button 
                            onClick={()=>handleDecQuantity(CartID)}
                            className="bg-slate-400 size-6 text-[20px] rounded font-bold text-white flex justify-center">-</button>
                            <span className="border-b-3 inline-flex w-10 py-3 px-5">{Quantity}</span>
                            <button 
                            onClick={()=>handleIncQuantity(CartID)}
                            className="bg-slate-400 size-6 text-[20px] rounded font-bold text-white flex justify-center">+</button>
                        </div>
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