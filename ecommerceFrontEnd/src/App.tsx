import "./App.css";
import HomePage from "./Pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/AuthPages/LoginPage.tsx";
import SignUpPage from "./Pages/AuthPages/SignUpPage.tsx";
import CartPage from "./Pages/CartPage.tsx";
import Product from "./Components/Products/ProductList.tsx";
import ProductDetail from "./Components/Products/ProductDetail.tsx";
import Protected from "./Hooks/Protected.tsx";
import { useEffect } from "react";
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "./Hooks/ecommerceStoreHooks.ts";
import { fetchCartProductByUserId } from "./EcommerceStore/cartOpt/FetchUserCartProducts.ts";
import AdminOnly from "./Hooks/AdminOnly.tsx";
import EditProduct from "./Pages/EditProduct.tsx";
import HomeCarousel from "./Components/Home/HomeCarousel.tsx";
import UserProfEdit from "./Pages/User/UserProfEdit.tsx";
import UserInfoPage from "./Pages/User/UserInfoPage.tsx";
import AddNewProduct from "./Components/Admin/AddNewProduct.tsx";



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      // for now render home page
      element: <HomePage />,
      children: [
        {
          path: "/shopnow/allproduct",
          element: <Protected><Product /></Protected>
        },
        {
          path: "/shopnow/productDetail/:id",
          element: <Protected><ProductDetail /></Protected>
        },
        {
          path: "/shopnow/user-info/:id",
          element: <Protected><UserInfoPage /></Protected>
        },
        {
          path: "/shopnow/edit-user-profile/:id",
          element: <Protected><UserProfEdit /></Protected>
        },
        {
          path: "/shopnow/cart",
          element: <Protected><CartPage /></Protected>,
        },
        {
          path: "/shopnow/admin/add-product",
          element: (
            <Protected>
              <AdminOnly>
                <AddNewProduct />
              </AdminOnly>
            </Protected>
          ),
        },
        {
          path: "/shopnow/admin/edit-product/:id",
          element: (
            <Protected>
              <AdminOnly>
                <EditProduct />
              </AdminOnly>
            </Protected>
          ),
        },
        // {
        //   path: "/shopnow/cart",
        //   element: <CartPage />,
        // },
      ]
    },
    {
      path: "/shopnow/login",
      element: <LoginPage />,
    },
    {
      path: "/shopnow/signup",
      element: <SignUpPage />,
    },



    {
      path:"/caro",
      element:<HomeCarousel />
    }

  ]);

  // const user = useECommerceStoreSelector((state) => state.loginSlice)
  // const dispatch = useECommerceStoreDispatch()

  // useEffect(() => {
  //   if (user && user.loggedInUser?.id) {
  //     dispatch(fetchCartProductByUserId(user.loggedInUser.id))
  //   }
  // }, [user, dispatch])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
