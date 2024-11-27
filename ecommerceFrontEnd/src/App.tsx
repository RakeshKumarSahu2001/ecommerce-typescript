import "./App.css";
import HomePage from "./Pages/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/AuthPages/LoginPage.tsx";
import SignUpPage from "./Pages/AuthPages/SignUpPage.tsx";
import CartPage from "./Pages/Cart/CartPage.tsx";
import Protected from "./Hooks/Protected.tsx";
import AdminOnly from "./Hooks/AdminOnly.tsx";
import HomeCarousel from "./Components/Home/HomeCarousel.tsx";
import UserProfEdit from "./Pages/User/UserProfEdit.tsx";
import UserInfoPage from "./Pages/User/UserInfoPage.tsx";
import ProductsPage from "./Pages/Products/ProductsPage.tsx";
import ProductDetailsPage from "./Pages/Products/ProductDetailsPage.tsx";
import EditProductPage from "./Pages/Admin/EditProductPage.tsx";
import AddNewProductPage from "./Pages/Admin/AddNewProductPage.tsx";



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      // for now render home page
      element: <HomePage />,
      children: [
        {
          path: "/shopnow/allproduct",
          element: <Protected><ProductsPage /></Protected>
        },
        {
          path: "/shopnow/productDetail/:id",
          element: <Protected><ProductDetailsPage /></Protected>
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
          path: "/shopnow/cart/:id",
          element: <Protected><CartPage /></Protected>,
        },
        {
          path: "/shopnow/admin/add-product",
          element: (
            <Protected>
              <AdminOnly>
                <AddNewProductPage />
              </AdminOnly>
            </Protected>
          ),
        },
        {
          path: "/shopnow/admin/edit-product/:id",
          element: (
            <Protected>
              <AdminOnly>
                <EditProductPage />
              </AdminOnly>
            </Protected>
          ),
        },
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
      path: "/caro",
      element: <HomeCarousel />
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
