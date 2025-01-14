import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "../Hooks/ecommerceStoreHooks";
import { loginSlice, logoutApi } from "../EcommerceStore/authOpt/LoginApi"
import isAdmin from "../Hooks/isAdmin";
import { fetchCartProductByUserId } from "../EcommerceStore/cartOpt/FetchUserCartProducts";
import Cart from "./Cart";

function Navbar() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const isDeleted = useECommerceStoreSelector((state) => state.deleteCartProductSlice.isDeleted)
  const isAdminObj = new isAdmin();

  const id = sessionStorage.getItem("Id");
  const dispatch = useECommerceStoreDispatch()


  const handleCartOpen = async () => {
    setOpen(true)
  }

  useEffect(() => {
    if (open && id) {
      dispatch(fetchCartProductByUserId(id))
    }
  }, [id, open, isDeleted, dispatch])


  const handleLogout = async () => {
    dispatch(logoutApi())
    dispatch(loginSlice.actions.clearLoginUserInfoFromLocalStorage())
    navigate("/auth/login")
  }

  const handleMoveToProducts = () => {
    navigate("/shopnow/allproduct")
    setOpen(false)
  }


  return (
    <header className="z-40 fixed w-screen">
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between h-16 lg:h-16">
            <div className="hidden lg:flex lg:items-center lg:space-x-10">
              <Link to="/" title="" className="text-base font-medium text-black !outline-none focus:outline-none active:outline-none active:border-none">
                {" "}
                Home{" "}
              </Link>

              {id && <Link to="/shopnow/allproduct" title="" className="text-base font-medium text-black !outline-none focus:outline-none active:outline-none active:border-none">
                {" "}
                Products{" "}
              </Link>}
              {
                isAdminObj.access && <Link
                  to="/shopnow/admin/add-product" className="text-base font-medium text-black !outline-none focus:outline-none active:outline-none active:border-none">
                  {" "}
                  Add New Product{" "}
                </Link>
              }
              {
                !id && <Link to="/auth/login" title="" className="text-base font-medium text-black !outline-none focus:outline-none active:outline-none active:border-none">
                  {" "}
                  Login{" "}
                </Link>
              }
              {!id && <Link to="/auth/signup" title="" className="text-base font-medium text-black !outline-none focus:outline-none active:outline-none active:border-none">
                {" "}
                Sign up{" "}
              </Link>
              }
            </div>

            <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2 !top-0">
              <div className="flex-shrink-0">
                <a href="#" title="" className="flex !outline-none focus:outline-none active:outline-none active:border-none">
                  <img
                    className="w-auto h-8 lg:h-16"
                    src={logo}
                    alt="brand logo"
                  />
                </a>
              </div>
            </div>

            {/* cart toggle button for Mobile screen */}
            {id && <button
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
            </button>}

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

            {/* dorp down */}

            {id && <div className="hidden lg:flex lg:items-center lg:space-x-10">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 !outline-none focus:outline-none active:outline-none active:border-none active:bg-blue-500">
                    <UserCircleIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute -right-12 z-10 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <Link
                        to={`/shopnow/user-info/${id}`}
                        className="block px-4 py-2 text-sm font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        Profile
                      </Link>
                    </MenuItem>
                  </div>

                  <div className="py-1">
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="!w-[100%] text-start block px-4 py-2 text-sm font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                        {" "}
                        Sign out{" "}
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
              {!id && <Link to="/auth/signup" title="" className="text-base font-medium text-black">
                {" "}
                Sign up{" "}
              </Link>}


              {/* cart toggle button for desktop screen */}
              <a
                href="#"
                title=""
                className="flex items-center justify-center w-10 h-10 text-white bg-black rounded-full"
                onClick={() => handleCartOpen()}
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
                            <Cart
                              handleMoveToProducts={handleMoveToProducts} />
                          </div>
                        </div>
                      </DialogPanel>
                    </div>
                  </div>
                </div>
              </Dialog>
            </div>}
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
              <Link to="/" title="" className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600">
                {" "}
                Home{" "}
              </Link>
            </div>

            <div className="flex flex-col space-y-2">
              {id && <Link
                to={`/shopnow/user-info/${id}`}
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                Profile
              </Link>}
            </div>

            <div className="flex flex-col space-y-2">
              {id && <Link to="/shopnow/allproduct" title="" className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600">
                {" "}
                Products{" "}
              </Link>}
            </div>

            <div className="flex flex-col space-y-2">
              {isAdminObj.access && <Link
                to="/shopnow/admin/add-product"
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                {" "}
                Add New Product{" "}
              </Link>}
            </div>

            <div className="flex flex-col space-y-2">
              {
                id && <button
                  onClick={handleLogout}
                  className="!w-[100%] py-2 text-start text-base font-medium text-black transition-all duration-200 focus:text-blue-600">
                  {" "}
                  Sign out{" "}
                </button>
              }
            </div>

            <div className="flex flex-col space-y-2">
              {!id && <Link
                to="/auth/signup"
                className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
              >
                {" "}
                Sign up{" "}
              </Link>}
              {
                !id && <Link to="/auth/login" title="" className="text-base font-medium text-black">
                  {" "}
                  Login{" "}
                </Link>
              }
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
