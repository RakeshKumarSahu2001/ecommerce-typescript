import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./ProductApi";
import { ProductDetailsSlice } from "./productsOpt/FetchProductDetailsApi";
import { createNewUserSlice } from "./SignUpApi";
import { authSlice } from "./LoginApi";
import { cartSlice } from "./CartApi";
import { userCartSlice } from "./FetchUserCartProducts";
import { createNewAddProductSlice } from "./productsOpt/AddNewProductApi";
import { AddUserProfInfoSlice } from "./ManageUserProfInfoApi";

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
