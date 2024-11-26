import { Link } from "react-router-dom"
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "../Hooks/ecommerceStoreHooks";
import { useMemo } from "react";
import CartCard from "./Cart/CartCard";
import { deleteCartProductApi } from "../EcommerceStore/cartOpt/DeleteCartProduct";

//cart data
// const products = [
//     {
//         id: 1,
//         name: 'Throwback Hip Bag',
//         href: '#',
//         color: 'Salmon',
//         price: '$90.00',
//         quantity: 1,
//         thumbnail: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
//         title: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//     },
//     {
//         id: 2,
//         name: 'Medium Stuff Satchel',
//         href: '#',
//         color: 'Blue',
//         price: '$32.00',
//         quantity: 1,
//         thumbnail: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//         title:
//             'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//     },

// ]
// {products.map((product) => (
//     <li key={product.id} className="flex py-6">
//         <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//             <img
//                 alt={product.title}
//                 src={product.thumbnail}
//                 className="h-full w-full object-cover object-center"
//             />
//         </div>

//         <div className="ml-4 flex flex-1 flex-col">
//             <div>
//                 <div className="flex justify-between text-base font-medium text-gray-900">
//                     <h3>
//                         <a href={product.thumbnail}>{product.name}</a>
//                     </h3>
//                     <p className="ml-4">{product.price}
//                     </p>
//                 </div>
//                 <p className="mt-1 text-sm text-gray-500">{product.color}</p>
//             </div>
//             <div className="flex flex-1 items-end justify-between text-sm">
//                 <p className="text-gray-500">Qty {product.quantity}</p>

//                 <div className="flex">
//                     <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
//                         Remove
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </li>
// ))}

function Cart() {
    const cartProducts = useECommerceStoreSelector((state) => state.userCartProducts.cartProducts);
    const dispatch=useECommerceStoreDispatch()

    const subTotal = useMemo(() => {
        return cartProducts?.reduce((total, product) => {
            return total + Math.round(parseInt(product.Price) * (1 - parseInt(product.Discount) / 100))
        }, 0);
    }, [cartProducts])

    const handleDeleteProductFromCart = (CartID: string) => {
        console.log("cart id =", CartID);
        dispatch(deleteCartProductApi(CartID))

      }

    return (
        <>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <h2 className="text-4xl  my-5 font-bold tracking-tight text-gray-900">
                        shopnow
                    </h2>
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartProducts && cartProducts.map((product) =>
                                <li key={product.CartID}>

                                    <CartCard
                                        ProductName={product.ProductName}
                                        ThumbnailImage={product.ThumbnailImage}
                                        Price={product.Price}
                                        CartID={product.CartID}
                                        Discount={product.Discount}
                                        handleDeleteProductFromCart={handleDeleteProductFromCart}
                                    />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$262.00</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Order Now
                        </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or{' '}
                          
                            <Link to="/shopnow/allproduct" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                                </Link> 
                        </p>
                    </div>
                </div> */}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                            ₹{subTotal}
                        </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/shopnow/cart"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or{" "}
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart