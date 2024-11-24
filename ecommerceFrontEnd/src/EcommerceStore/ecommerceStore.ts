import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./productsOpt/ProductApi";
import { ProductDetailsSlice } from "./productsOpt/FetchProductDetailsApi";
import { createNewUserSlice } from "./authOpt/SignUpApi";
import { authSlice } from "./authOpt/LoginApi";
import { cartSlice } from "./cartOpt/CartApi";
import { userCartSlice } from "./FetchUserCartProducts";
import { createNewAddProductSlice } from "./productsOpt/AddNewProductApi";
import { AddUserProfInfoSlice } from "./FetchUserProfInfoApi";

const ecommerceStore = configureStore({
    reducer: {
        products: ProductSlice.reducer,
        productDetails: ProductDetailsSlice.reducer,
        createNewUser: createNewUserSlice.reducer,
        authSlice: authSlice.reducer,
        addProductsToCart: cartSlice.reducer,
        userCartProducts: userCartSlice.reducer,
        addNewProductsInTheWeb: createNewAddProductSlice.reducer,
        AddUserProfInfoSlice:AddUserProfInfoSlice.reducer
    }
});

export type ecommerceStoreState = ReturnType<typeof ecommerceStore.getState>;
export type ecommerceStoreDispatch = typeof ecommerceStore.dispatch;
export default ecommerceStore;
