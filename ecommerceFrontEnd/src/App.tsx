import "./App.css";
import HomePage from "./Pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.tsx";
import SignUpPage from "./Pages/SignUpPage.tsx";
import CartPage from "./Pages/CartPage.tsx";
import Product from "./Components/ProductList.tsx";
import ProductDetail from "./Components/ProductDetail.tsx";
import Testing from "./Components/Testing.tsx";
import Protected from "./Hooks/Protected.tsx";
import { useEffect } from "react";
import { useECommerceStoreDispatch, useECommerceStoreSelector } from "./Hooks/ecommerceStoreHooks.ts";
import { fetchCartProductByUserId } from "./EcommerceStore/FetchUserCartProducts.ts";
import AddNewProduct from "./Components/AddNewProduct.tsx";
import UserInfoPage from "./Pages/UserInfoPage.tsx";



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
    {
      path:"/shopnow/user-info",
      element:<Protected><UserInfoPage /></Protected>
    },
    {
      path: "/testing",
      element: <Testing />
    },
    {
      path:"/add-product",
      element:<AddNewProduct />
    }
  ]);

  const user=useECommerceStoreSelector((state)=>state.authSlice)
  const dispatch=useECommerceStoreDispatch()
  // console.log("hello from the app.tsx file",user.loggedInUser)
  
  useEffect(()=>{
    if(user &&  user.loggedInUser?.id){
      dispatch(fetchCartProductByUserId(user.loggedInUser.id))
    }
  },[user, dispatch])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
