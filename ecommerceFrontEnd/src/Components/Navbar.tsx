import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// cart items
const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    title:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    title:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  {
    id: 3,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    title:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 4,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    title:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

function Navbar() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  return (
    <header className="z-20 fixed w-screen">
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between h-16 lg:h-20">
            <div className="hidden lg:flex lg:items-center lg:space-x-10">
              <Link to="/shopnow/allproduct" title="" className="text-base font-medium text-black">
                {" "}
                Products{" "}
              </Link>

              <a href="#" title="" className="text-base font-medium text-black">
                {" "}
                Solutions{" "}
              </a>

              <a href="#" title="" className="text-base font-medium text-black">
                {" "}
                Resources{" "}
              </a>

              <a href="#" title="" className="text-base font-medium text-black">
                {" "}
                Pricing{" "}
              </a>
            </div>

            <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
              <div className="flex-shrink-0">
                <a href="#" title="" className="flex">
                  <img
                    className="w-auto h-8 lg:h-10"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>

            {/* cart toggle button for Mobile screen */}
            <button
              type="button"
              className="flex items-center justify-center ml-auto text-white bg-black rounded-full w-9 h-9 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>

            {/* menu toggle button */}
            <button
              type="button"
              className="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
              onClick={() => setToggle(true)}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            <div className="hidden lg:flex lg:items-center lg:space-x-10">
              <Link to="/shopnow/signup" title="" className="text-base font-medium text-black">
                {" "}
                Sign up{" "}
              </Link>

              <Link to="/shopnow/login" title="" className="text-base font-medium text-black">
                {" "}
                Sign in{" "}
              </Link>

              {/* cart toggle button for desktop screen */}
              <a
                href="#"
                title=""
                className="flex items-center justify-center w-10 h-10 text-white bg-black rounded-full"
                onClick={() => {
                  console.log("before click", open);
                  setOpen(true);
                  console.log("after click", open);
                }}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </a>
              {/* making transition for cart */}
              <Dialog open={open} onClose={setOpen} className="relative z-20">
                <DialogBackdrop
                  transition
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                      <DialogPanel
                        transition
                        className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                      >
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                              <DialogTitle className="text-lg font-medium text-gray-900">
                                Shopping cart
                              </DialogTitle>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  onClick={() => setOpen(false)}
                                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                >
                                  <span className="absolute -inset-0.5" />
                                  <span className="sr-only">Close panel</span>
                                  <XMarkIcon
                                    aria-hidden="true"
                                    className="h-6 w-6"
                                  />
                                </button>
                              </div>
                            </div>

                            <div className="mt-8">
                              <div className="flow-root">
                                <ul
                                  role="list"
                                  className="-my-6 divide-y divide-gray-200"
                                >
                                  {products.map((product) => (
                                    <li key={product.id} className="flex py-6">
                                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                          alt={product.title}
                                          src={product.thumbnail}
                                          className="h-full w-full object-cover object-center"
                                        />
                                      </div>

                                      <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                          <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                              <a href={product.thumbnail}>
                                                {product.name}
                                              </a>
                                            </h3>
                                            <p className="ml-4">
                                              {product.price}
                                            </p>
                                          </div>
                                          <p className="mt-1 text-sm text-gray-500">
                                            {product.color}
                                          </p>
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
                                              <option>1</option>
                                              <option value="">2</option>
                                              <option value="">3</option>
                                              <option value="">4</option>
                                            </select>
                                          </div>

                                          <div className="flex">
                                            <button
                                              type="button"
                                              className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p>Subtotal</p>
                              <p>$262.00</p>
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
                      </DialogPanel>
                    </div>
                  </div>
                </div>
              </Dialog>
            </div>
          </nav>
        </div>
      </div>
      {/* cart close */}

      <nav className={`py-4 bg-white ${toggle ? "block" : "hidden"} lg:hidden`}>
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Menu
            </p>

            <button
              type="button"
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-100"
              onClick={() => setToggle(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-6">
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                title=""
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                {" "}
                Features{" "}
              </a>

              <a
                href="#"
                title=""
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                {" "}
                Solutions{" "}
              </a>

              <a
                href="#"
                title=""
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                {" "}
                Resources{" "}
              </a>

              <a
                href="#"
                title=""
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                {" "}
                Pricing{" "}
              </a>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="flex flex-col space-y-2">
              <a
                href="#"
                title=""
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                {" "}
                Sign up{" "}
              </a>

              <a
                href="#"
                title=""
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                {" "}
                Sign in{" "}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
