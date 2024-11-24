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
import { fetchCartProductByUserId } from "./EcommerceStore/FetchUserCartProducts.ts";
import AddNewProduct from "./Components/AddNewProduct.tsx";
import UserInfoPage from "./Pages/UserInfoPage.tsx";
import AdminOnly from "./Hooks/AdminOnly.tsx";
import EditProduct from "./Pages/EditProduct.tsx";
import HomeCarousel from "./Components/Home/HomeCarousel.tsx";
import UserProfEdit from "./Pages/User/UserProfEdit.tsx";



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
          // element:<Product />
        },
        {
          path: "/shopnow/productDetail/:id",
          element: <Protected><ProductDetail /></Protected>
          // element:<ProductDetail />
        },
        {
          path: "/shopnow/user-info/:id",
          element: <Protected><UserInfoPage /></Protected>
        },
        {
          path: "/shopnow/edit-user-profile/:id",
          element: <Protected><UserProfEdit /></Protected>
        }
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
      path: "/shopnow/cart",
      element: <Protected><CartPage /></Protected>,
      // element:<CartPage />
    },
    // {
    //   path: "/shopnow/user-info/:id",
    //   element: <Protected><UserInfoPage /></Protected>
    // },
    // {
    //   path:"/shopnow/edit-user-profile/:id",
    //   element:<Protected><UserProfEdit /></Protected>
    // },
    
    {
      path: "/add-product",
      element: (
        <Protected>
          <AdminOnly>
            <AddNewProduct />
          </AdminOnly>
        </Protected>
      ),
    },
    {
      path: "/edit-product/:id",
      element: (
        <Protected>
          <AdminOnly>
            <EditProduct />
          </AdminOnly>
        </Protected>
      ),
    },
    {
      path:"/caro",
      element:<HomeCarousel />
    }

  ]);

  const user = useECommerceStoreSelector((state) => state.authSlice)
  const dispatch = useECommerceStoreDispatch()
  // console.log("hello from the app.tsx file",user.loggedInUser)

  useEffect(() => {
    if (user && user.loggedInUser?.id) {
      dispatch(fetchCartProductByUserId(user.loggedInUser.id))
    }
  }, [user, dispatch])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
